import { screen } from '@testing-library/react';
import { Map as ImmutableMap } from 'immutable';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { store } from '@solo-utils/jotai';

import { SportType } from 'src/common/enums';
import { isSportModalOpenAtom } from 'src/store/common/atoms';
import { MODAL_ROUTE_NAME } from 'src/utils/constants';

import { getSportDetails } from './helpers';
import SportsModal from './SportsModal';
import { allCountData, liveGroupedSportsData } from './test/mocks';

const mockPopup: string = MODAL_ROUTE_NAME.groupedSports;

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => {
            return {
                router: {
                    route: {
                        params: { popup: mockPopup },
                    },
                    buildUrl: (route: string, params: { id: string }) => {
                        if (params === undefined || params.id === undefined) {
                            return `/${route}`;
                        }

                        return `/${route}/${params.id}`;
                    },
                },
                reduxState: {
                    sportsItems: ImmutableMap()
                        .set('boxing', { id: 'boxing', name: 'Boxing/MMA', displayOrder: 45, translations: {} })
                        .set('football', { id: 'football', name: 'Football', displayOrder: 100, translations: {} }),
                },
                language: {
                    userLang: 'en-GB',
                    getTranslation: (_key: string, defaultText: string) => {
                        return defaultText;
                    },
                },
                eventsCounter: {
                    getEventsCounterList: (collectionId: string, _params: unknown) => {
                        if (collectionId === 'home-count-live-highlights') {
                            return { counters: liveGroupedSportsData };
                        }

                        if (collectionId === 'all-count') {
                            return { counters: allCountData };
                        }
                    },
                },
                default: vi.fn(),
            };
        },
    };
});

describe('SportModal', () => {
    store.set(isSportModalOpenAtom, true);

    it('should render sport with events count on desktop', () => {
        renderWithAppWrapper(<SportsModal />);
        const footballCounts = allCountData[0].count.toString();
        const footballLink = screen.getAllByText('Football')[0].parentElement;

        expect(footballLink).toHaveTextContent(footballCounts);
        expect(footballLink).toHaveTextContent('LIVE');

        const boxingCounts = allCountData[1].count.toString();
        const boxingLink = screen.getAllByText('Boxing/MMA')[0].parentElement;

        expect(boxingLink).toHaveTextContent(boxingCounts);
        expect(boxingLink).not.toHaveTextContent('LIVE');
    });

    it('should return correct sport details', () => {
        const sport = {
            id: SportType.Baseball,
            name: 'Baseball',
        };
        const isLivePage = true;
        const sportIcons = {
            [SportType.Baseball]: {
                id: 31,
                label: null,
                url: 'https://s3.eu-central-1.amazonaws.com/solohub-qa-cms/icons/sports/9d9227ae-9581-4300-9720-430b11f4a9b4.svg',
                width: 20,
                height: 20,
                caption: null,
                sha1: 'da667c8a03a9482c6d88473bff7b5992abcd323b',
                altText: null,
            },
        };
        const countEvents = (_id: string) => ({ count: 5, hasLive: true });

        const result = getSportDetails({
            sport,
            isLivePage,
            sportIcons,
            countEvents,
        });

        expect(result).toEqual({
            sportId: SportType.Baseball,
            count: 5,
            hasLive: true,
            route: 'inplay',
            params: { id: 'baseball' },
            sportIcon: {
                id: 31,
                label: null,
                url: 'https://s3.eu-central-1.amazonaws.com/solohub-qa-cms/icons/sports/9d9227ae-9581-4300-9720-430b11f4a9b4.svg',
                width: 20,
                height: 20,
                caption: null,
                sha1: 'da667c8a03a9482c6d88473bff7b5992abcd323b',
                altText: null,
            },
            sportName: 'Baseball',
        });
    });

    it('should return null when count is 0', () => {
        const sport = {
            id: SportType.Baseball,
            name: 'Baseball',
        };
        const isLivePage = true;
        const sportIcons = {
            [SportType.Baseball]: {
                id: 31,
                label: null,
                url: 'https://s3.eu-central-1.amazonaws.com/solohub-qa-cms/icons/sports/9d9227ae-9581-4300-9720-430b11f4a9b4.svg',
                width: 20,
                height: 20,
                caption: null,
                sha1: 'da667c8a03a9482c6d88473bff7b5992abcd323b',
                altText: null,
            },
        };
        const countEvents = (_id: string) => ({ count: 0, hasLive: true });

        const result = getSportDetails({
            sport,
            isLivePage,
            sportIcons,
            countEvents,
        });

        expect(result).toBeNull();
    });
});
