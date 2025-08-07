import get from 'lodash/get';
import includes from 'lodash/includes';
import isNull from 'lodash/isNull';

import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';
import { SelectionIdentifier, type OddsFormatLong } from 'src/common/enums';
import { MarketTemplate, MarketType } from 'src/common/enums/market';
import { isHandicap } from 'src/common/helpers/selection';
import { PriceType, type PriceForView } from 'src/common/types/selectionPrice';
import { getOddsFormatPrice } from 'src/utils/common';
import { formatNumber } from 'src/utils/format';
import type { GetTranslationFunc } from 'src/utils/types';

export const getShortSelectionIdentifierLabel = (getTranslation: GetTranslationFunc): Record<string, string> => {
    return Object.freeze({
        O: getTranslation('selection.identifier.over.short', 'O'),
        U: getTranslation('selection.identifier.under.short', 'U'),
    });
};

export const getHandicapLabel = (
    selection: SelectionModel | null,
    isLive: boolean,
    isAsianLineHandicapEnabled: boolean,
) => {
    if (isNull(selection) || !isHandicap(selection)) {
        return null;
    }

    const handicapLineValue = formatNumber(selection.line);
    const handicapAsianLineValue = formatNumber(selection.asianInPlayLine);
    const shouldUseAsianLineValue = handicapAsianLineValue !== '' && isLive && isAsianLineHandicapEnabled;

    return shouldUseAsianLineValue ? handicapAsianLineValue : handicapLineValue;
};

export const isOverUnderSelection = (selection: SelectionModel | null) => {
    if (isNull(selection)) {
        return false;
    }

    const selectionIdentifier = get(selection, 'selectionIdentifiers', '');

    return selectionIdentifier === SelectionIdentifier.Over || selectionIdentifier === SelectionIdentifier.Under;
};

export const getMarketType = (marketTypeGeneric?: string): MarketType | null => {
    if (includes(marketTypeGeneric, MarketType.Winner)) {
        return MarketType.Winner;
    }

    if (includes(marketTypeGeneric, MarketTemplate.Handicap)) {
        return MarketType.Handicap;
    }

    if (includes(marketTypeGeneric, MarketTemplate.OverUnder)) {
        return MarketType.Total;
    }

    return null;
};

export const getDisplayPrice = (price: PriceForView | null, oddsFormat: OddsFormatLong): string | number | null => {
    if (price === null) {
        return '-';
    }

    if (price === PriceType.SP) {
        return 'SP';
    }

    return getOddsFormatPrice(price, oddsFormat);
};
