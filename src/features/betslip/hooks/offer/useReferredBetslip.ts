import { useMutation } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import { useRecoilCallback } from 'recoil';

import { BetslipTab, OfferStatus } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';

import type { ReferredBetslipResponse } from '../../api/referralBet/services';
import { getReferredBetslipApi } from '../../api/referralBet/services';
import { convertRefBetsToSelections, defineOfferActiveTab, getSingleBetStakes } from '../../helpers/offer';
import { betslipActiveTabAtom, isTabSelectedByUserAtom } from '../../store/atoms/betslipTab';
import { systemBetTypeAtom } from '../../store/atoms/combinations';
import { betslipSelectionsAtom } from '../../store/atoms/selections';
import { multipleBetStakesWhileOfferAtomFamily } from '../../store/atoms/stake';
import { isOfferExist } from '../../store/helpers/offer';
import { getMultipleBetStakes } from '../../store/helpers/stake/common';
import { updateCombinationStakeTask, updateSingleBetStakesTask } from '../../store/tasks/stake';
import { resetBetslipErrorsTransaction } from '../../store/transactions/betslip';
import { setStandardBetsPriceWhileOfferTransaction } from '../../store/transactions/offer';

import useClearOffer from './useClearOffer';
import { useSetOffer } from './useSetOffer';

const useReferredBetslip = () => {
    const { clearOffer } = useClearOffer();

    const setOffer = useSetOffer();

    const setBetslipTab = useRecoilCallback(
        ({ set }) =>
            async (tab: BetslipTab) =>
                set(betslipActiveTabAtom, tab),
    );

    const updateSingleBetStakes = useRecoilCallback(updateSingleBetStakesTask, []);
    const updateCombinationStake = useRecoilCallback(updateCombinationStakeTask, []);

    const onSuccess = useRecoilCallback(
        ({ set, snapshot, transact_UNSTABLE: transact }) =>
            async (data: ReferredBetslipResponse | null) => {
                if (!isNull(data) && isOfferExist(data.expiresAt)) {
                    const { bets, expiresAt, offeredAt, status } = data;
                    let shouldTriggerPossibleBets = false;

                    if (isEmpty(getValue(snapshot, betslipSelectionsAtom))) {
                        const selections = convertRefBetsToSelections(bets);
                        set(betslipSelectionsAtom, selections);
                        shouldTriggerPossibleBets = true;
                    }

                    const [{ type: offerBetType }] = bets;
                    const betslipActiveTab = defineOfferActiveTab(offerBetType);
                    await setBetslipTab(betslipActiveTab);
                    set(isTabSelectedByUserAtom, true);

                    if (betslipActiveTab === BetslipTab.Single) {
                        updateSingleBetStakes(getSingleBetStakes(bets), {});
                    } else {
                        updateCombinationStake(bets[0].stakePerLine);
                        set(multipleBetStakesWhileOfferAtomFamily(betslipActiveTab), getMultipleBetStakes(bets));
                    }

                    if (betslipActiveTab === BetslipTab.System) {
                        set(systemBetTypeAtom, offerBetType);
                    }

                    transact(resetBetslipErrorsTransaction);
                    transact(setStandardBetsPriceWhileOfferTransaction(bets));
                    setOffer({ bets, expiresAt, offeredAt, status, user: null, shouldTriggerPossibleBets });

                    if (status === OfferStatus.Reject) {
                        clearOffer(bets);
                    }
                }
            },
        [clearOffer, setOffer, setBetslipTab, updateCombinationStake, updateSingleBetStakes],
    );

    const { mutate: getExistingOffer } = useMutation({
        mutationFn: getReferredBetslipApi,
        onSuccess,
    });

    return { getExistingOffer };
};

export default useReferredBetslip;
