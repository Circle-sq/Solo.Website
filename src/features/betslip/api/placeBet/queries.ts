import { useWindowWidth } from '@solo-hooks';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import filter from 'lodash/filter';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import reject from 'lodash/reject';
import { useRecoilCallback } from 'recoil';

import { isAuthenticatedAtom, userDataAtom } from '@solo-account/store/atoms';
import { updateUserData } from '@solo-account/store/helpers';
import { freebetCreditsAtomWithQuery, lastDepositAtomWithMutation } from '@solo-account/store/queries';
import { store } from '@solo-utils/jotai';

import { MutationStatus } from 'src/common/enums/status';
import { getValue } from 'src/common/recoil/snapshot';
import { sendPurchaseToGtm } from 'src/features/gtm/gtm-utils';
import { openQuickBetTask } from 'src/ui/betting/store/tasks';

import type { PlacedBet } from '../../api/types/placedBet';
import { getChannel } from '../../helpers/helpers';
import { betReceiptAtom } from '../../store/atoms/betReceipt';
import { betslipErrorsAtom, betslipProblemsAtom, placeBetStatusAtom } from '../../store/atoms/betslip';
import { changedPriceBetIdsAtom } from '../../store/atoms/betslipBets';
import { betslipActiveTabAtom } from '../../store/atoms/betslipTab';
import { setBetReceipt } from '../../store/helpers/betReceipt';
import { formatPlaceBetProblems, hasStakeProblem } from '../../store/helpers/problems';
import { hasChangedLegSelector } from '../../store/selectors/betslipBets';
import { hasAppliedFreeBetsSelector } from '../../store/selectors/freeBets';
import { isPlaceBetDisabledSelector, isPlaceBetLoadingSelector } from '../../store/selectors/placeBet';
import { checkedSelectionsSelector } from '../../store/selectors/selections';
import { syncCastBetsTask } from '../../store/tasks/castBets';
import type { MutationError } from '../types';

import type { PlaceBetParams } from './services';
import placeBetApi from './services';

const usePlaceBet = () => {
    const { isDesktop } = useWindowWidth();

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const openQuickBet = useRecoilCallback(openQuickBetTask, []);
    const onMutate = useRecoilCallback(
        ({ set }) =>
            () => {
                set(placeBetStatusAtom, MutationStatus.Loading);
            },
        [],
    );

    const onError = useRecoilCallback(
        ({ set, snapshot }) =>
            ({ body }: MutationError, { castBets }: PlaceBetParams) => {
                const problems = get(body, 'problems', []);
                const stakeProblems = filter(problems, (problem) => hasStakeProblem(problem));

                if (!isEmpty(stakeProblems)) {
                    const activeTab = getValue(snapshot, betslipActiveTabAtom);
                    const bets = filter(castBets, 'stakePerLine');
                    const problemsWithSelectionIds = formatPlaceBetProblems(stakeProblems, bets, activeTab);

                    set(betslipProblemsAtom, (prevProblems) => [...prevProblems, ...problemsWithSelectionIds]);
                }

                const errors = reject(problems, (problem) => hasStakeProblem(problem));

                set(betslipErrorsAtom, errors);
                set(placeBetStatusAtom, MutationStatus.Error);
            },
        [],
    );

    const onSuccess = useRecoilCallback(
        ({ set, snapshot }) =>
            (bets: PlacedBet[] | null) => {
                const { mutate: getLastDeposit } = store.get(lastDepositAtomWithMutation);

                getLastDeposit(undefined, {
                    onSuccess: (data) => {
                        store.set(userDataAtom, updateUserData(data));
                    },
                });

                if (bets !== null) {
                    const hasAppliedFreeBets = getValue(snapshot, hasAppliedFreeBetsSelector);

                    set(betReceiptAtom, setBetReceipt(bets, hasAppliedFreeBets));
                    set(placeBetStatusAtom, MutationStatus.Success);

                    if (hasAppliedFreeBets) {
                        const { refetch: refetchFreebetCredits } = store.get(freebetCreditsAtomWithQuery);

                        void refetchFreebetCredits();
                    }

                    const checkedSelections = getValue(snapshot, checkedSelectionsSelector);
                    sendPurchaseToGtm(bets, checkedSelections);
                }

                if (!isDesktop) {
                    openQuickBet();
                }
            },
        [isDesktop, openQuickBet],
    );

    const { mutate: placeBetMutate, isPending } = useMutation({
        mutationFn: placeBetApi,
        onMutate,
        onSuccess,
        onError,
    });

    const syncCastBets = useRecoilCallback(syncCastBetsTask, []);

    return useRecoilCallback(
        ({ reset, snapshot }) =>
            () => {
                const hasChangedLeg = getValue(snapshot, hasChangedLegSelector);
                const isPlaceBetLoading = getValue(snapshot, isPlaceBetLoadingSelector);

                if (hasChangedLeg && !isPlaceBetLoading) {
                    reset(changedPriceBetIdsAtom);
                }

                const isPlaceBetDisabled = getValue(snapshot, isPlaceBetDisabledSelector({ isAuthenticated }));

                if (isPlaceBetDisabled || isPending) {
                    return;
                }

                const castBets = syncCastBets();

                if (castBets !== undefined) {
                    const channel = getChannel();

                    placeBetMutate({ castBets, channel });
                }
            },
        [isAuthenticated, isPending, placeBetMutate, syncCastBets],
    );
};

export default usePlaceBet;
