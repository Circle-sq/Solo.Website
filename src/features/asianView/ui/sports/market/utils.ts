import { MarketTypeGeneric } from '@solo-asianView/constants';

import { SelectionIdentifier, SportType } from 'src/common/enums';
import { MarketType } from 'src/common/enums/market';
import { EMPTY_STRING } from 'src/utils/constants';

export const getMarketType = (marketTypeGeneric?: string) => {
    if (marketTypeGeneric === MarketTypeGeneric.OverUnder) {
        return MarketType.Total;
    }

    if (marketTypeGeneric === MarketTypeGeneric.TwoWayHandicap) {
        return MarketType.Handicap;
    }

    return MarketType.Winner;
};

const overUnderHandicapMarketDecimals = 1;

export const formatMarketLine = (line: string): string => {
    if (line === EMPTY_STRING) {
        return line;
    }

    const lineValue = +line;

    const mod = lineValue % 0.5;

    const lowerBound = lineValue - mod;
    const upperBound = lineValue + mod;

    if (mod !== 0) {
        return `${lowerBound}-${upperBound}`;
    }

    return formatDecimals(lineValue, overUnderHandicapMarketDecimals);
};

export const DIGITS_COUNT = 2;

export const formatDecimals = (value: number, decimalsCount = DIGITS_COUNT): string => {
    if (!value) {
        return '';
    }

    if (Math.floor(value) === value) {
        return `${value}.${'0'.repeat(decimalsCount)}`;
    }

    const decimalsPart = value.toString().split('.')[1];

    if (decimalsPart.length > decimalsCount - 1) {
        return value.toString();
    }

    return `${value}${'0'.repeat(decimalsCount - 1)}`;
};

export const formatHandicapLine = (line: string, identifier?: SelectionIdentifier, sport?: string): string => {
    const isZero = +line === 0;

    const displayHandicapLine = line.startsWith('-') || (isZero && identifier === SelectionIdentifier.Home);

    if (!displayHandicapLine) {
        return EMPTY_STRING;
    }

    if (isZero) {
        return line;
    }

    const normalizedLine = line.replace('-', '');

    if (sport === SportType.Football || sport === SportType.ESoccer) {
        return formatMarketLine(normalizedLine);
    }

    return normalizedLine;
};
