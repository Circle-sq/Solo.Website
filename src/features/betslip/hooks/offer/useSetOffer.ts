import values from 'lodash/values';
import { useRecoilCallback } from 'recoil';

import { getValue } from 'src/common/recoil/snapshot';

import type { ReferredBet } from '../../api/types/referredBet';
import { PossibleBetsTriggeredBy } from '../../enums';
import { parseOfferBets } from '../../helpers/offer';
import { betsAtom } from '../../store/atoms/betslipBets';
import { offerAtom } from '../../store/atoms/offer';
import { isOfferExist } from '../../store/helpers/offer';
import type { Offer } from '../../store/types';

import { usePossibleOfferBets } from './usePossibleOfferBets';

interface OfferPayload extends Omit<Offer, 'legs'> {
    bets: ReferredBet[];
    shouldTriggerPossibleBets?: boolean;
}

export const useSetOffer = () => {
    const { getPossibleOfferBets } = usePossibleOfferBets();

    return useRecoilCallback(
        ({ set, snapshot }) =>
            ({
                bets: referredBets,
                expiresAt,
                offeredAt,
                status,
                user,
                shouldTriggerPossibleBets = false,
            }: OfferPayload) => {
                if (isOfferExist(expiresAt)) {
                    const bets = getValue(snapshot, betsAtom);
                    const legs = parseOfferBets(referredBets, bets);

                    set(offerAtom, { legs, expiresAt, offeredAt, status, user });

                    if (shouldTriggerPossibleBets) {
                        getPossibleOfferBets({ legs: values(legs), triggeredBy: PossibleBetsTriggeredBy.SetOffer });
                    }
                }
            },
        [getPossibleOfferBets],
    );
};
