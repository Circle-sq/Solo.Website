import { useAtomValue, useSetAtom } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import { useRecoilCallback } from 'recoil';

import { LHNTab } from '@solo-asianView/enums';
import { lhnTabAtom } from '@solo-asianView/store/lhn';
import type { GtmSelection } from '@solo-betslip/api/types/placedBet';
import { betslipSelectionsAtom } from '@solo-betslip/store/atoms/selections';
import { useToggleStandardSelection } from '@solo-betslip/store/hooks/useToggleStandardSelection';
import { showBetReceiptSelector } from '@solo-betslip/store/selectors/betReceipt';
import { hasOfferSelector } from '@solo-betslip/store/selectors/offer';
import { isPlaceBetLoadingSelector } from '@solo-betslip/store/selectors/placeBet';
import { resetBetslipStateTransaction } from '@solo-betslip/store/transactions/betslip';
import { store } from '@solo-utils/jotai';

import { getValue } from 'src/common/recoil/snapshot';
import { PriceType } from 'src/common/types/selectionPrice';
import { generateGtmSelection } from 'src/features/gtm/gtm-utils';
import { selectionItemAtomFamily } from 'src/store/events/entities';
import { eventRevisionSelectorFamily, eventStartedSelectorFamily } from 'src/store/events/selectors/event';
import {
    marketRevisionSelectorFamily,
    marketSelectionIdsSelectorFamily,
    marketTypeGenericSelectorFamily,
} from 'src/store/events/selectors/market';

import Selection from './Selection/Selection';
import { getMarketType } from './utils';

interface Props {
    eventId: number;
    marketId: number;
}

const MarketSelections = ({ eventId, marketId }: Props) => {
    const selectionIds = useAtomValue(marketSelectionIdsSelectorFamily(marketId));
    const marketRevision = useAtomValue(marketRevisionSelectorFamily(marketId));
    const marketTypeGeneric = useAtomValue(marketTypeGenericSelectorFamily(marketId));

    const toggleStandardSelection = useToggleStandardSelection();
    const setLhnTab = useSetAtom(lhnTabAtom);

    const toggleSelection = useRecoilCallback(
        ({ snapshot, transact_UNSTABLE: transact }) =>
            (selectionId: number) => {
                const hasOffer = getValue(snapshot, hasOfferSelector);
                const isPlaceBetLoading = getValue(snapshot, isPlaceBetLoadingSelector);
                const selection = store.get(selectionItemAtomFamily(selectionId));

                if (selection == null || isPlaceBetLoading || hasOffer) {
                    return;
                }

                const showBetReceipt = getValue(snapshot, showBetReceiptSelector);
                const selections = getValue(snapshot, betslipSelectionsAtom);

                if (showBetReceipt && !isEmpty(selections)) {
                    transact(resetBetslipStateTransaction);
                }

                setLhnTab(LHNTab.Betslip);
                const isLive = store.get(eventStartedSelectorFamily(eventId));
                const eventRevision = store.get(eventRevisionSelectorFamily(eventId));
                const gtmSelection: GtmSelection = generateGtmSelection(isLive);

                toggleStandardSelection({
                    price: selection.price,
                    eventId,
                    eventRevision,
                    marketId,
                    marketRevision,
                    selectionId: selection.id,
                    priceType: PriceType.FP,
                    marketType: getMarketType(marketTypeGeneric),
                    gtmSelection,
                });
            },
        [eventId, marketId, marketTypeGeneric, setLhnTab, toggleStandardSelection],
    );

    return (
        <>
            {selectionIds.map((selectionId, index) => {
                return (
                    <Selection
                        key={selectionId}
                        selectionId={selectionId}
                        firstItem={index === 0}
                        eventId={eventId}
                        marketTypeGeneric={marketTypeGeneric}
                        toggleSelection={toggleSelection}
                    />
                );
            })}
        </>
    );
};

export default MarketSelections;
