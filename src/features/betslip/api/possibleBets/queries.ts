import { useMutation } from '@tanstack/react-query';
import filter from 'lodash/filter';
import getIn from 'lodash/get';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import reduce from 'lodash/reduce';
import { batch, useDispatch } from 'react-redux';
import { useRecoilCallback, useRecoilTransaction_UNSTABLE as useRecoilTransaction } from 'recoil';

import { store, useJotaiCallback } from '@sc-utils/jotai';

import { BetslipTab, RouteName } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';
import type { SelectionPriceErrorDetails } from 'src/common/types/error';
import type { Selections } from 'src/common/types/selection';
import { bulk as updateCompetitions } from 'src/modules/competitions/actions/update';
import { bulk as updateEvents } from 'src/modules/events/actions/update';
import { bulk as updateSports } from 'src/modules/sports/actions/update';
import { routeNameAtom } from 'src/store/common/atoms';
import { syncEntitiesStatesWithPossibleBetsTask } from 'src/store/events/tasks/entities';

import { PossibleBetsTriggeredBy } from '../../enums';
import { createCombinationRecord } from '../../helpers/combinations';
import type { PossibleBetsParams } from '../../hooks/types';
import { animationRecordsAtom } from '../../store/atoms/animation';
import { betReceiptAtom } from '../../store/atoms/betReceipt';
import { betslipErrorsAtom, placeBetStatusAtom, possibleBetsTriggersAtom } from '../../store/atoms/betslip';
import { betsAtom } from '../../store/atoms/betslipBets';
import { betslipActiveTabAtom } from '../../store/atoms/betslipTab';
import { multipleCombinationAtom, systemCombinationAtom } from '../../store/atoms/combinations';
import { freeBetsAtom } from '../../store/atoms/freeBets';
import { betslipSelectionsAtom } from '../../store/atoms/selections';
import { singleBetStakesAtom } from '../../store/atoms/stake';
import { syncAnimationRecords } from '../../store/helpers/betslipBet/animation';
import { sortBetsByTimestamp } from '../../store/helpers/betslipBet/sort';
import { getAppliedFreeBets, getFreeBetsForMultipleTab } from '../../store/helpers/freeBets';
import {
    removeAbortedPossibleBetsTriggers,
    removeLastPossibleBetsTrigger,
    syncPossibleLegs,
} from '../../store/helpers/possibleBets';
import { syncBetslipSelectionsOnPossibleBetsError } from '../../store/helpers/selection/sync';
import { multipleCombinationTypeSelector } from '../../store/selectors/combinations';
import { availableFreeBetsSelector } from '../../store/selectors/freeBets';
import { stopMultiBetAnimationTask } from '../../store/tasks/betslipBet/animation';
import { takeLatestTask } from '../../store/tasks/possibleBets';
import { syncBetslipPricesTransaction } from '../../store/transactions/betslip';
import {
    updateBetsTransaction,
    updateCombinationsTransaction,
    updateProblemsTransaction,
} from '../../store/transactions/possibleBets';
import { isMultiBetType } from '../../typeGuards/bet';
import { isStakePriceChangedErrorType } from '../../typeGuards/error';
import type { MutationError, PossibleBetApiReturn, PossibleBetsApiParams } from '../types';
import type { BetError } from '../types/error';
import type { Legs } from '../types/leg';

import { getPossibleBetsApi } from './services';

export const usePossibleBets = () => {
    const dispatch = useDispatch();

    const syncEntitiesStates = useJotaiCallback(syncEntitiesStatesWithPossibleBetsTask, []);

    const stopAnimation = useRecoilCallback(stopMultiBetAnimationTask, []);
    const takeLatest = useRecoilCallback(takeLatestTask, []);
    const syncBetslipPrices = useRecoilTransaction(syncBetslipPricesTransaction, []);

    const onMutate = useRecoilCallback(
        ({ set, reset }) =>
            ({ triggeredBy }: PossibleBetsApiParams) => {
                set(possibleBetsTriggersAtom, removeAbortedPossibleBetsTriggers(triggeredBy));
                reset(betslipErrorsAtom);
            },
        [],
    );

    const onSuccess = useRecoilCallback(
        ({ reset, transact_UNSTABLE: transact, snapshot }) =>
            (data: PossibleBetApiReturn | null, { triggeredBy, prevBuildABetId }: PossibleBetsApiParams) => {
                const betslipSelections = getValue(snapshot, betslipSelectionsAtom);
                const multiBets = pickBy(getValue(snapshot, betsAtom), isMultiBetType);
                const legs = { ...betslipSelections, ...multiBets } as Legs;

                if (data === null || isEmpty(legs)) {
                    return;
                }

                transact((params) => {
                    updateCombinationsTransaction(data)(params);
                    updateProblemsTransaction(data)(params);
                    updateBetsTransaction(data, { triggeredBy, prevBuildABetId })(params);
                });

                const stakePriceChangedProblems = filter(data.selectedBetsProblems, (problem) =>
                    isStakePriceChangedErrorType(problem),
                ) as BetError<SelectionPriceErrorDetails>[];

                if (!isEmpty(stakePriceChangedProblems)) {
                    const selectionPrices = reduce(
                        stakePriceChangedProblems,
                        (acc, { details }) => {
                            const price = getIn(details, 'newValue', null);

                            return { ...acc, [details.selectionId]: { price } };
                        },
                        {},
                    );

                    syncBetslipPrices(selectionPrices as Selections);
                    getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.SyncBetslipPrices });
                }

                const routeName = store.get(routeNameAtom);

                if (routeName === RouteName.AsianView) {
                    syncEntitiesStates(data.events);
                }

                batch(() => {
                    dispatch(updateCompetitions(data.competitions));
                    dispatch(updateSports(data.sports));
                    dispatch(updateEvents(data.events));
                });

                if (triggeredBy === PossibleBetsTriggeredBy.AddBuildABetSelection && prevBuildABetId !== undefined) {
                    getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.SyncBuildABetStake, prevBuildABetId });
                }

                if (triggeredBy === PossibleBetsTriggeredBy.KeepPlacedBets) {
                    reset(placeBetStatusAtom);
                    reset(betReceiptAtom);
                }
            },
        [dispatch, syncBetslipPrices, syncEntitiesStates],
    );

    const onError = useRecoilCallback(
        ({ set, snapshot }) =>
            (error: MutationError, { signal }: PossibleBetsApiParams) => {
                if (signal?.aborted === false) {
                    const { errors } = error.body ?? error.message ?? {};

                    if (isArray(errors)) {
                        set(betslipErrorsAtom, errors);
                    }

                    const bets = getValue(snapshot, betsAtom);
                    set(betslipSelectionsAtom, syncBetslipSelectionsOnPossibleBetsError(bets));
                }
            },
        [],
    );

    const onSettled = useRecoilCallback(
        ({ snapshot, set }) =>
            (_, _error: MutationError | null, { signal, triggeredBy, animationKey }: PossibleBetsApiParams) => {
                if (signal?.aborted === false) {
                    set(possibleBetsTriggersAtom, removeLastPossibleBetsTrigger(triggeredBy));
                    stopAnimation(animationKey);
                } else {
                    const selections = getValue(snapshot, betslipSelectionsAtom);
                    set(animationRecordsAtom, syncAnimationRecords(selections));
                }
            },
        [stopAnimation],
    );

    const { mutate } = useMutation({
        mutationFn: getPossibleBetsApi,
        onMutate,
        onSuccess,
        onError,
        onSettled,
    });

    const getPossibleBets = useRecoilCallback(
        ({ snapshot }) =>
            ({ combinations = {}, triggeredBy, animationKey, prevBuildABetId }: PossibleBetsParams) => {
                const controller = new AbortController();

                const betslipSelections = getValue(snapshot, betslipSelectionsAtom);
                const multiBets = pickBy(getValue(snapshot, betsAtom), isMultiBetType);
                const legs = { ...betslipSelections, ...multiBets } as Legs;

                if (isEmpty(legs)) {
                    return;
                }

                takeLatest({ triggeredBy, controller });

                const betslipTab = getValue(snapshot, betslipActiveTabAtom);
                const freeBetsForSingleTab = getValue(snapshot, freeBetsAtom);
                const availableFreeBets = getValue(snapshot, availableFreeBetsSelector);
                const type = getValue(snapshot, multipleCombinationTypeSelector);
                const freeBetsForMultipleTab = getFreeBetsForMultipleTab(availableFreeBets, type);
                const freeBets = betslipTab === BetslipTab.Single ? freeBetsForSingleTab : freeBetsForMultipleTab;
                const singleBetStakes = getValue(snapshot, singleBetStakesAtom);

                const syncedLegs = syncPossibleLegs(legs, freeBetsForSingleTab, singleBetStakes, betslipTab);
                const sortedLegs = sortBetsByTimestamp(syncedLegs, betslipSelections);

                mutate({
                    combinations,
                    legs: sortedLegs,
                    isFreeBetTax: !isEmpty(getAppliedFreeBets(freeBets)),
                    signal: controller.signal,
                    snapshot,
                    triggeredBy,
                    animationKey,
                    prevBuildABetId,
                    id: 'possible-bets',
                });
            },
        [mutate, takeLatest],
    );

    const getPossibleBetsWithCombination = useRecoilCallback(
        ({ snapshot }) =>
            (params: PossibleBetsParams) => {
                const betslipTab = getValue(snapshot, betslipActiveTabAtom);
                const combination =
                    betslipTab === BetslipTab.System
                        ? getValue(snapshot, systemCombinationAtom)
                        : getValue(snapshot, multipleCombinationAtom);

                getPossibleBets({ ...params, combinations: createCombinationRecord(combination) });
            },
        [getPossibleBets],
    );

    return { getPossibleBets, getPossibleBetsWithCombination };
};
