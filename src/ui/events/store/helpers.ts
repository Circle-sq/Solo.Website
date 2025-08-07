import isNumber from 'lodash/isNumber';
import padStart from 'lodash/padStart';

import { PriceChange } from 'src/common/enums';
import { MIN_DIGIT, SECS_IN_MIN, TWO_HOURS_IN_SECS } from 'src/ui/events/EventPeriod/configs';
import { SORT_VALUE } from 'src/ui/events/EventsList/config';

export const padStartTime = (value: number) => padStart(String(value), MIN_DIGIT, '0');

export const getMinutesDuration = (totalSeconds: number) => {
    const seconds = Math.floor(totalSeconds / SECS_IN_MIN);

    return padStartTime(seconds);
};

export const getSecondsDuration = (totalSeconds: number) => {
    const seconds = Math.floor(totalSeconds % SECS_IN_MIN);

    return padStartTime(seconds);
};

export const getTime = (totalSeconds: number) => {
    const limitedTotalSeconds = Math.min(totalSeconds, TWO_HOURS_IN_SECS);

    const minutes = getMinutesDuration(limitedTotalSeconds);
    const seconds = getSecondsDuration(limitedTotalSeconds);

    return `${minutes}:${seconds}`;
};

export const getSortCriteria = (collectionId: string): string => {
    const isCompetitionSort = ['in-play-highlights', 'in-play-home'].some((type) => collectionId.startsWith(type));

    return isCompetitionSort ? SORT_VALUE.competitions : SORT_VALUE.time;
};

export const definePriceChangeDirection = (
    newPrice: number | undefined,
    oldPrice: number | undefined,
): PriceChange | null => {
    if (!isNumber(oldPrice) || !isNumber(newPrice)) {
        return null;
    }

    if (newPrice > oldPrice) {
        return PriceChange.Up;
    }

    if (newPrice < oldPrice) {
        return PriceChange.Down;
    }

    return null;
};
