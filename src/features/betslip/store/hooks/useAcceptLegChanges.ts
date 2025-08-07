import isEmpty from 'lodash/isEmpty';
import { useRecoilCallback } from 'recoil';

import { usePossibleBets } from '../../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../../enums';
import { changedPriceBetIdsAtom } from '../atoms/betslipBets';
import { defineChangedBetsTask, removeBetslipBetsTask, updateUncheckedBetIdsTask } from '../tasks/betslipBet/remove';

export const useAcceptLegChanges = () => {
    const { getPossibleBets } = usePossibleBets();

    const defineChangedBets = useRecoilCallback(defineChangedBetsTask, []);
    const removeBetslipBets = useRecoilCallback(removeBetslipBetsTask, []);
    const updateUncheckedBetIds = useRecoilCallback(updateUncheckedBetIdsTask, []);

    return useRecoilCallback(
        ({ reset }) =>
            () => {
                reset(changedPriceBetIdsAtom);

                const { betIdsToRemove, betIdsToUncheck } = defineChangedBets();

                if (isEmpty(betIdsToRemove) && isEmpty(betIdsToUncheck)) {
                    return;
                }

                updateUncheckedBetIds(betIdsToUncheck);
                removeBetslipBets(betIdsToRemove);
                getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.AcceptBetChanges });
            },
        [defineChangedBets, removeBetslipBets, updateUncheckedBetIds, getPossibleBets],
    );
};
