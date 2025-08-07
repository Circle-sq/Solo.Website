import type { RecursivePartial } from 'src/common/types/main';
import { AppState } from 'src/appState/AppState';
import { buildTranslateStatisticsPeriodNameHelper } from 'src/appState/translation-helper';

import { languagesMock } from '../languagesMock';

const language = {
    userLang: languagesMock[0].id,
    getLanguages: () => languagesMock,
    setUserLang: vi.fn().mockImplementation((id: string) => console.info(id)),
    getTranslation: (_langKey: string, defaultText: string) => defaultText,
};
const translateStatisticsPeriodName = buildTranslateStatisticsPeriodNameHelper(language);

export const appStateContextMock: RecursivePartial<AppState> = {
    models: {
        getEvent: vi.fn().mockReturnValue({
            media: {
                statistics: [
                    {
                        id: '1234',
                        provider: 'betradar',
                        score: {
                            home: 0,
                            away: 1,
                        },
                        'red-cards': {
                            home: 0,
                            away: 0,
                        },
                        'yellow-cards': {
                            home: 0,
                            away: 0,
                        },
                        substitution: {
                            home: 0,
                            away: 0,
                        },
                        timer: {
                            value: '81:58',
                        },
                        period: {
                            value: '2nd half',
                        },
                    },
                ],
            },
            homeParticipantUniform: '/americanfootball/player/2510/home',
            awayParticipantUniform: '/americanfootball/player/2588/home',
        }),
        getMarket: vi.fn(),
        getCompetitionModel: vi.fn(),
    },
    language,
    translationsStore: { translateStatisticsPeriodName },
    reduxState: {
        getCompetitionLocationIconUrl: vi.fn(),
    },
    eventsCounter: {
        getEventsCounterList: vi.fn().mockReturnValue({
            counters: [
                {
                    id: 'football',
                    name: '축구',
                    displayOrder: 100,
                    translations: {},
                    count: 16,
                },
                {
                    id: 'americanfootball',
                    name: '미식 축구',
                    displayOrder: 85,
                    translations: {},
                    count: 2,
                },
                {
                    id: 'baseball',
                    name: '야구',
                    displayOrder: 90,
                    translations: {},
                    count: 2,
                },
                {
                    id: 'basketball',
                    name: '농구',
                    displayOrder: 95,
                    translations: {},
                    count: 2,
                },
                {
                    id: 'icehockey',
                    name: '아이스 하키',
                    displayOrder: 70,
                    translations: {},
                    count: 2,
                },
            ],
        }),
    },
    router: {
        redirect: vi.fn(),
        url: '/crossbetting?sport=all&day=1&countryId=ENG',
        route: {
            name: 'crossbetting',
            params: {
                sport: 'all',
                day: '1',
                countryId: 'ENG',
            },
        },
        routes: [
            {
                url: '/',
                matcher: {},
                params: [],
                name: 'homepage',
            },
            {
                url: '/crossbetting',
                matcher: {},
                params: [],
                name: 'crossbetting',
            },
            {
                url: '/crossbetting/:sport',
                matcher: {},
                params: ['sport'],
                name: 'crossbetting',
            },
            {
                url: '/crossbetting/:sport/:day',
                matcher: {},
                params: ['sport', 'day'],
                name: 'crossbetting',
            },
        ],
        buildUrl: vi.fn(),
    },
};
