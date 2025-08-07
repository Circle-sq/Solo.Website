import type { Getter } from 'jotai';
import findIndex from 'lodash/findIndex';
import forEach from 'lodash/forEach';
import lodashGet from 'lodash/get';

import { Lines } from '@sc-asianView/enums';
import { linesFilterAtom } from '@sc-asianView/store/filters';
import { primaryMainLineMarketIdsAtomFamily, secondaryMainLineMarketIdsAtomFamily } from '@sc-asianView/store/mainLine';
import { selectorFamily } from '@sc-utils/jotai';

import { LiveTrackerProviders, type SportType } from 'src/common/enums';
import type { TimeSettings } from 'src/common/types/event';
import type { MarketIndex } from 'src/common/types/market';
import type { Media, MediaItem } from 'src/common/types/media';
import type { Statistics } from 'src/common/types/statistics';
import {
    marketTemplateIdSelectorFamily,
    visibleMarketIdsSelectorFamily,
    marketActiveSelectorFamily,
} from 'src/store/events/selectors/market';

import { eventItemAtomFamily } from '../entities';
import type { ParticipantItem } from '../types';

export const eventActiveSelectorFamily = selectorFamily<boolean, number>({
    key: 'eventActiveSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const event = get(eventItemAtomFamily(eventId));

            return event?.active === true;
        },
});

const hasActiveMarkets = (get: Getter, eventId: number, mainLineMarketIds: number[]): boolean => {
    const event = get(eventItemAtomFamily(eventId));

    if (!event || event?.active !== true) {
        return false;
    }

    const linesFilter = get(linesFilterAtom);
    const marketIds = get(visibleMarketIdsSelectorFamily(eventId));

    const allMarketsIds = mainLineMarketIds.filter((marketId) => Boolean(marketId) && marketId > 0);

    if (allMarketsIds.some((marketId) => get(marketActiveSelectorFamily(marketId)) === true)) {
        return true;
    }

    if (linesFilter !== Lines.One) {
        forEach(mainLineMarketIds, (mainLineMarketId) => {
            const marketTemplateId = get(marketTemplateIdSelectorFamily(mainLineMarketId));

            const currentIndex = findIndex(marketIds, (id) => id === mainLineMarketId);

            const secondaryMarketIndexes =
                linesFilter === Lines.Three
                    ? [currentIndex - 1, currentIndex + 1]
                    : [currentIndex - 2, currentIndex - 1, currentIndex + 1, currentIndex + 2];

            const secondaryMarketIds = secondaryMarketIndexes
                .map((index) => lodashGet(marketIds, [index]))
                .filter((marketId) => Boolean(marketId) && marketId > 0);

            secondaryMarketIds.forEach((marketId) => {
                if (get(marketTemplateIdSelectorFamily(marketId)) === marketTemplateId) {
                    allMarketsIds.push(marketId);
                }
            });
        });
    }

    return allMarketsIds.some((marketId) => get(marketActiveSelectorFamily(marketId)) === true);
};

export const eventPrimaryMarketsActiveSelectorFamily = selectorFamily<boolean, number>({
    key: 'eventPrimaryMarketsActiveSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const mainLineMarketIds = get(primaryMainLineMarketIdsAtomFamily(eventId));

            return hasActiveMarkets(get, eventId, mainLineMarketIds);
        },
});

export const eventSecondaryMarketsActiveSelectorFamily = selectorFamily<boolean, number>({
    key: 'eventSecondaryMarketsActiveSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const mainLineMarketIds = get(secondaryMainLineMarketIdsAtomFamily(eventId));

            return hasActiveMarkets(get, eventId, mainLineMarketIds);
        },
});

export const eventMarketIdsSelectorFamily = selectorFamily<number[], number>({
    key: 'eventMarketIdsSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const event = get(eventItemAtomFamily(eventId));

            return event?.markets ?? [];
        },
});

export const eventMarketIndexSelectorFamily = selectorFamily<MarketIndex[], number>({
    key: 'eventMarketIndexesSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const event = get(eventItemAtomFamily(eventId));

            return event?.marketIndex ?? [];
        },
});

export const eventMediaSelectorFamily = selectorFamily<Media | undefined, number>({
    key: 'eventMediaSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const event = get(eventItemAtomFamily(eventId));

            return event?.media;
        },
});

export const eventMediaLiveTrackerSelectorFamily = selectorFamily<MediaItem | undefined, number>({
    key: 'eventMediaLiveTrackerSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const media = get(eventMediaSelectorFamily(eventId));

            return media?.liveTrackers.find(
                ({ provider }) => provider === LiveTrackerProviders.BetRadar || provider === LiveTrackerProviders.Bayes,
            );
        },
});

export const eventMediaStreamSelectorFamily = selectorFamily<MediaItem | undefined, number>({
    key: 'eventMediaStreamSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const media = get(eventMediaSelectorFamily(eventId));

            return media?.streams[0];
        },
});

export const eventParticipantsSelectorFamily = selectorFamily<ParticipantItem[], number>({
    key: 'eventParticipantsSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const event = get(eventItemAtomFamily(eventId));

            return event?.participants ?? [];
        },
});

export const eventStatisticsSelectorFamily = selectorFamily<Statistics | undefined, number>({
    key: 'eventStatisticsSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const event = get(eventItemAtomFamily(eventId));

            return event?.statistics;
        },
});

export const eventPeriodSelectorFamily = selectorFamily<string | undefined, number>({
    key: 'eventPeriodSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const statistics = get(eventStatisticsSelectorFamily(eventId));

            return statistics?.period?.value;
        },
});

export const eventTimeSettingsSelectorFamily = selectorFamily<TimeSettings | undefined, number>({
    key: 'eventTimeSettingsSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const event = get(eventItemAtomFamily(eventId));

            return event?.timeSettings;
        },
});

export const eventStartTimeSelectorFamily = selectorFamily<string | undefined, number>({
    key: 'eventStartTimeSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const timeSettings = get(eventTimeSettingsSelectorFamily(eventId));

            return timeSettings?.startTime;
        },
});

export const eventStartedSelectorFamily = selectorFamily<boolean, number>({
    key: 'eventStartedSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const timeSettings = get(eventTimeSettingsSelectorFamily(eventId));

            return timeSettings?.started === true;
        },
});

export const eventTradedInPlaySelectorFamily = selectorFamily<boolean, number>({
    key: 'eventTradedInPlaySelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const timeSettings = get(eventTimeSettingsSelectorFamily(eventId));

            return timeSettings?.tradedInPlay === true;
        },
});

export const eventInPlaySelectorFamily = selectorFamily<boolean, number>({
    key: 'eventInPlaySelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const started = get(eventStartedSelectorFamily(eventId));
            const tradedInPlay = get(eventTradedInPlaySelectorFamily(eventId));

            return started && tradedInPlay;
        },
});

export const eventSportSelectorFamily = selectorFamily<SportType | undefined, number>({
    key: 'eventSportSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const event = get(eventItemAtomFamily(eventId));

            return event?.sport.id;
        },
});

const MISSING_VERSION = -10;
export const eventRevisionSelectorFamily = selectorFamily<number, number>({
    key: 'eventRevisionSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const event = get(eventItemAtomFamily(eventId));

            return event?.revision ?? MISSING_VERSION;
        },
});
