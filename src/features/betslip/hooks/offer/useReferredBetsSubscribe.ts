import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

import { freebetCreditsAtomWithQuery } from '@sc-account/store/queries';
import { userIdSelector } from '@sc-account/store/selectors';
import { store } from '@sc-utils/jotai';

import { BetslipTab, OfferStatus } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';
import { sendPurchaseToGtm } from 'src/features/gtm/gtm-utils';
import { buildRefBetChannel } from 'src/utils/socket-io/buildChannel';
import useGeneralSocket from 'src/utils/socket-io/hooks/useGeneralSocket';
import type { WsReferredBetPayload } from 'src/utils/socket-io/types';

import { placeBetStatusAtom } from '../../store/atoms/betslip';
import { betslipActiveTabAtom } from '../../store/atoms/betslipTab';
import { multipleBetStakesWhileOfferAtomFamily } from '../../store/atoms/stake';
import { getMultipleBetStakes } from '../../store/helpers/stake/common';
import { hasAppliedFreeBetsSelector } from '../../store/selectors/freeBets';
import { checkedSelectionsSelector } from '../../store/selectors/selections';
import { acceptOfferTransaction, setStandardBetsPriceWhileOfferTransaction } from '../../store/transactions/offer';

import useClearOffer from './useClearOffer';
import { useSetOffer } from './useSetOffer';

const useReferredBetsSubscribe = (isAvailable: boolean) => {
    const socket = useGeneralSocket<WsReferredBetPayload>();

    const userId = useAtomValue(userIdSelector);
    const referredBetChannel = buildRefBetChannel(userId ?? -1);

    const { clearOffer } = useClearOffer();
    const setOffer = useSetOffer();

    const handleIncomingOffer = useRecoilCallback(
        ({ reset, set, snapshot, transact_UNSTABLE: transact }) =>
            ({
                body: { bets: betsToPlace, referredBetslip },
                header: { type: status, who, when: offeredAt },
            }: WsReferredBetPayload) => {
                const { bets, expiresAt } = referredBetslip;
                const betslipTab = getValue(snapshot, betslipActiveTabAtom);

                switch (status) {
                    case OfferStatus.Request: {
                        if (betslipTab !== BetslipTab.Single) {
                            set(multipleBetStakesWhileOfferAtomFamily(betslipTab), getMultipleBetStakes(bets));
                        }

                        transact(setStandardBetsPriceWhileOfferTransaction(bets));
                        setOffer({ bets, expiresAt: null, offeredAt: null, status, user: who.type });
                        reset(placeBetStatusAtom);

                        break;
                    }

                    case OfferStatus.Offered: {
                        if (betslipTab !== BetslipTab.Single) {
                            set(multipleBetStakesWhileOfferAtomFamily(betslipTab), getMultipleBetStakes(bets));
                        }

                        transact(setStandardBetsPriceWhileOfferTransaction(bets));
                        setOffer({ bets, expiresAt, offeredAt, status, user: who.type });

                        break;
                    }

                    case OfferStatus.Reject: {
                        setOffer({ bets, expiresAt: null, offeredAt: null, status, user: who.type });
                        clearOffer(bets);

                        break;
                    }

                    case OfferStatus.Accept: {
                        transact(acceptOfferTransaction(betsToPlace));

                        const hasAppliedFreeBets = getValue(snapshot, hasAppliedFreeBetsSelector);

                        if (hasAppliedFreeBets) {
                            const { refetch: refetchFreebetCredits } = store.get(freebetCreditsAtomWithQuery);

                            void refetchFreebetCredits();
                        }

                        const checkedSelections = getValue(snapshot, checkedSelectionsSelector);
                        sendPurchaseToGtm(betsToPlace, checkedSelections);

                        break;
                    }

                    case OfferStatus.Timeout: {
                        setOffer({ bets, expiresAt: null, offeredAt: null, status, user: who.type });
                        clearOffer(bets);

                        break;
                    }

                    default:
                        break;
                }
            },
        [clearOffer, setOffer],
    );

    useEffect(() => {
        if (isAvailable && socket !== null) {
            socket.subscribe(referredBetChannel, handleIncomingOffer);
        }
    }, [socket, isAvailable]);

    useEffect(() => {
        return () => {
            if (socket !== null && socket.hasListeners(referredBetChannel)) {
                socket.unsubscribe(referredBetChannel);
            }
        };
    }, []);
};

export default useReferredBetsSubscribe;
