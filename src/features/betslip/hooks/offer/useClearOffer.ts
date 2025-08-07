import isNil from 'lodash/isNil';
import ms from 'ms';
import { useRecoilCallback } from 'recoil';

import { BetslipTab } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';
import useTimer from 'src/utils/hooks/useTimer';

import { usePossibleBets } from '../../api/possibleBets/queries';
import type { BaseLeg } from '../../api/types/leg';
import { PossibleBetsTriggeredBy } from '../../enums';
import { placeBetStatusAtom } from '../../store/atoms/betslip';
import { betslipActiveTabAtom } from '../../store/atoms/betslipTab';
import { offerAtom } from '../../store/atoms/offer';
import { multipleBetStakesWhileOfferAtomFamily } from '../../store/atoms/stake';
import { resetBetslipErrorsTransaction } from '../../store/transactions/betslip';
import { resetStandardBetsPriceWhileOfferTransaction } from '../../store/transactions/offer';

const MS_IN_ONE_SEC = ms('1s');
const KEEP_OFFER_FOR = ms('3s');

const useClearOffer = () => {
    const { getPossibleBets } = usePossibleBets();

    const onTimeOver = useRecoilCallback(
        ({ reset, snapshot, transact_UNSTABLE: transact }) =>
            (bets?: { legs?: BaseLeg[] }[]) => {
                const betslipTab = getValue(snapshot, betslipActiveTabAtom);

                reset(offerAtom);

                transact(resetBetslipErrorsTransaction);
                getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.ClearOffer });
                reset(placeBetStatusAtom);

                if (betslipTab !== BetslipTab.Single) {
                    reset(multipleBetStakesWhileOfferAtomFamily(betslipTab));
                }

                if (!isNil(bets)) {
                    transact(resetStandardBetsPriceWhileOfferTransaction(bets));
                }
            },
        [getPossibleBets],
    );

    const { start: clearOffer } = useTimer<{ legs?: BaseLeg[] }[]>({
        endTime: KEEP_OFFER_FOR / MS_IN_ONE_SEC,
        interval: KEEP_OFFER_FOR,
        onTimeOver,
    });

    return { clearOffer };
};

export default useClearOffer;
