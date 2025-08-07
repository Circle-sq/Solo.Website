import { useMutation } from '@tanstack/react-query';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { batch, useDispatch } from 'react-redux';
import { useRecoilCallback } from 'recoil';

import { BetslipTab } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';
import { bulk as updateCompetitions } from 'src/modules/competitions/actions/update';
import { bulk as updateEvents } from 'src/modules/events/actions/update';
import { bulk as updateSports } from 'src/modules/sports/actions/update';

import { getPossibleBetsApi } from '../../api/possibleBets/services';
import type { MutationError, PossibleBetApiReturn } from '../../api/types';
import { PossibleBetsTriggeredBy } from '../../enums';
import type { PossibleOfferBetsParams } from '../../hooks/types';
import { betslipErrorsAtom } from '../../store/atoms/betslip';
import { betslipActiveTabAtom } from '../../store/atoms/betslipTab';
import { freeBetsAtom } from '../../store/atoms/freeBets';
import { getAppliedFreeBets, getFreeBetsForMultipleTab } from '../../store/helpers/freeBets';
import { multipleCombinationTypeSelector } from '../../store/selectors/combinations';
import { availableFreeBetsSelector } from '../../store/selectors/freeBets';
import { updateBetsTransaction, updateCombinationsTransaction } from '../../store/transactions/possibleBets';

export const usePossibleOfferBets = () => {
    const dispatch = useDispatch();

    const onMutate = useRecoilCallback(
        ({ reset }) =>
            () => {
                reset(betslipErrorsAtom);
            },
        [],
    );

    const onSuccess = useRecoilCallback(
        ({ transact_UNSTABLE: transact }) =>
            (data: PossibleBetApiReturn | null) => {
                if (data === null) {
                    return;
                }

                transact((params) => {
                    updateCombinationsTransaction(data)(params);
                    updateBetsTransaction(data, { triggeredBy: PossibleBetsTriggeredBy.SetOffer })(params);
                });

                batch(() => {
                    dispatch(updateCompetitions(data.competitions));
                    dispatch(updateSports(data.sports));
                    dispatch(updateEvents(data.events));
                });
            },
        [dispatch],
    );

    const onError = useRecoilCallback(
        ({ set }) =>
            (error: MutationError) => {
                const { errors } = error.body ?? error.message ?? {};

                if (isArray(errors)) {
                    set(betslipErrorsAtom, errors);
                }
            },
        [],
    );

    const { mutate } = useMutation({
        mutationFn: getPossibleBetsApi,
        onMutate,
        onSuccess,
        onError,
    });

    const getPossibleOfferBets = useRecoilCallback(
        ({ snapshot }) =>
            ({ legs, triggeredBy }: PossibleOfferBetsParams) => {
                const betslipTab = getValue(snapshot, betslipActiveTabAtom);
                const freeBetsForSingleTab = getValue(snapshot, freeBetsAtom);
                const availableFreeBets = getValue(snapshot, availableFreeBetsSelector);
                const type = getValue(snapshot, multipleCombinationTypeSelector);
                const freeBetsForMultipleTab = getFreeBetsForMultipleTab(availableFreeBets, type);
                const freeBets = betslipTab === BetslipTab.Single ? freeBetsForSingleTab : freeBetsForMultipleTab;
                mutate({
                    combinations: {},
                    legs,
                    isFreeBetTax: !isEmpty(getAppliedFreeBets(freeBets)),
                    snapshot,
                    triggeredBy,
                    id: 'missing-bet-referrals',
                });
            },
        [mutate],
    );

    return { getPossibleOfferBets };
};
