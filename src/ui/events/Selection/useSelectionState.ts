import { useAsianInPlayHandicapLineFlag } from '@solo-feature-flags';
import { useAtomValue } from 'jotai';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import type { MouseEvent } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { oddsFormatSelector } from '@solo-account/store/selectors';
import { selectionView } from '@solo-betslip/helpers/selectionView';
import { betslipSelectionsAtom } from '@solo-betslip/store/atoms/selections';
import { showBetReceiptSelector } from '@solo-betslip/store/selectors/betReceipt';
import { hasOfferSelector } from '@solo-betslip/store/selectors/offer';
import { isPlaceBetLoadingSelector } from '@solo-betslip/store/selectors/placeBet';
import { isSelectedSelectorFamily } from '@solo-betslip/store/selectors/selections';
import { resetBetslipStateTransaction } from '@solo-betslip/store/transactions/betslip';
import type { SelectionPayload } from '@solo-betslip/store/types';

import { useAppStateContext } from 'src/appState/AppState';
import { BettingTab } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';
import { PriceType } from 'src/common/types/selectionPrice';
import { generateGtmSelection } from 'src/features/gtm/gtm-utils';
import { setBettingTabTask } from 'src/ui/betting/store/tasks';
import { getDisplayPrice, getHandicapLabel, getMarketType, isOverUnderSelection } from 'src/ui/events/Selection/utils';
import { selectionSelectorFamily } from 'src/ui/events/store/selectors/selection';

interface Params {
    selectionId: number;
    isSP?: boolean;
}

const MISSING_REVISION = -9;

const useSelectionState = ({ selectionId, isSP }: Params) => {
    const { models } = useAppStateContext();

    const oddsFormat = useAtomValue(oddsFormatSelector);
    const selection = models.getSelection(selectionId);
    const modelView = selectionView(models, selectionId, isSP);

    const { event, market, price: priceForView = null, suspended = false } = modelView ?? {};

    const { id: eventId, sport: sportId = '', revision: eventRevision = MISSING_REVISION } = event ?? {};
    const { id: marketId, template, revision: marketRevision = MISSING_REVISION } = market ?? {};
    const { name: selectionName = '', identifier = '', display: isDisplay = false } = selection ?? {};

    const displayPrice = getDisplayPrice(priceForView, oddsFormat);
    const isSelected = useRecoilValue(isSelectedSelectorFamily(selectionId));
    const isLive = get(event, 'timeSettings.started', false);
    const asianInPlayHandicapLineFlag = useAsianInPlayHandicapLineFlag();

    const handicapLabel = getHandicapLabel(selection, isLive, asianInPlayHandicapLineFlag);
    const isOverUnder = isOverUnderSelection(selection);

    const priceType = priceForView === PriceType.SP ? PriceType.SP : PriceType.FP;
    const marketType = getMarketType(template?.marketTypeGeneric);
    const price = get(selection, 'price', null);

    const hasModelView = !isNull(modelView);
    const hasSelection = !isNull(selection);
    const isPriceEmpty = isNull(price);
    const isSuspended = suspended || isPriceEmpty;
    const isDisabled = isSuspended || !hasModelView;

    const setBettingTab = useRecoilCallback(setBettingTabTask, []);

    const toggleSelection = useRecoilCallback(
        ({ snapshot, transact_UNSTABLE: transact }) =>
            (e: MouseEvent, toggle: (partialSelection: SelectionPayload) => void) => {
                e.preventDefault();
                const hasOffer = getValue(snapshot, hasOfferSelector);
                const isPlaceBetLoading = getValue(snapshot, isPlaceBetLoadingSelector);

                if (!hasModelView || isPlaceBetLoading || hasOffer) {
                    return;
                }

                setBettingTab(BettingTab.Betslip);
                const gtmSelection = generateGtmSelection(isLive, e.currentTarget);

                const showBetReceipt = getValue(snapshot, showBetReceiptSelector);
                const selections = getValue(snapshot, betslipSelectionsAtom);

                if (showBetReceipt && !isEmpty(selections)) {
                    transact(resetBetslipStateTransaction);
                }

                const selection = getValue(snapshot, selectionSelectorFamily({ eventId, marketId, selectionId }));
                toggle({
                    eventId: eventId as number,
                    eventRevision,
                    marketId: marketId as number,
                    marketRevision,
                    selectionId,
                    marketType,
                    priceType,
                    gtmSelection,
                    price: selection?.get('price', null)?.toJS(),
                });
            },
        [hasModelView, setBettingTab, isLive, eventId, marketId, selectionId, marketType, priceType],
    );

    return {
        eventId,
        marketId,
        marketType,
        priceType,
        price,
        selectionName,
        handicapLabel,
        displayPrice,
        isDisplay,
        isDisabled,
        isOverUnder,
        isSelected,
        isLive,
        isSuspended,
        suspended,
        hasSelection,
        identifier,
        sportId,
        toggleSelection,
    };
};

export default useSelectionState;
