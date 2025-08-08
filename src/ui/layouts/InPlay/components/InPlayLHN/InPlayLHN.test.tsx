import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';

import { buildSubUnsubWrapper, renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { server } from '@solo-tests/unit/mocks/server.setup';

import * as sports from '../../hooks/useLHNSports';

import InPlayLHN from './InPlayLHN';

const handlers = [
    http.get('/api/uniforms/esoccer/player/home', () => {
        return HttpResponse.json([]);
    }),
    http.post('/api/streams/blacklist/brands/providers', () => {
        return HttpResponse.json([]);
    }),
];

const sportIds = ['football', 'tennis', 'basketball', 'volleyball'];

const events = sportIds.map((sport, i) => ({
    id: i,
    sport,
    displayOrder: 0,
    display: true,
    name: `Event ${i}`,
    competitionId: `competition-${i}`,
    markets: [],
    timeSettingsStarted: true,
    translations: {
        competition: `Competition [${sport}]`,
    },
    homeParticipantUniform: '/esoccer/player/1231865/home',
    awayParticipantUniform: '/esoccer/player/1231869/home',
    getTag: vi.fn().mockReturnValue([]),
}));

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: () => {
        return {
            apiWrapper: {
                api: {
                    get: vi.fn().mockResolvedValue({}),
                },
            },
            language: { getTranslation: (_key: string, defaultMessage: string) => defaultMessage },
            models: {
                getEvent: vi.fn().mockReturnValue(events[0]),
            },
            eventsCollection: {
                getEventsCollectionList: (id: string) => {
                    const [, , sport] = id.split('-');
                    const filteredEvents = events.filter((event) => event.sport === sport);

                    return {
                        events: filteredEvents,
                        total: filteredEvents.length,
                        isInitialLoading: false,
                        isLoading: false,
                        loadMore: vi.fn(),
                    };
                },
            },
            translationsStore: { translateStatisticsPeriodName: (name: string) => name },
            router: {
                route: {
                    params: { id: 1 },
                },
                buildUrl: vi.fn().mockReturnValue('#'),
            },
        };
    },
}));

server.use(...handlers);

describe('InPlayLHN', () => {
    it('should display a loading spinner while sports data is being fetched', () => {
        vi.spyOn(sports, 'useLHNSports').mockReturnValue({
            sports: [],
            isLoading: true,
        });

        const { getByTestId } = renderWithAppWrapper(<InPlayLHN />, {}, { wrapper: buildSubUnsubWrapper() });

        expect(getByTestId('in-play-lhn-loader')).toBeInTheDocument();
    });

    it('should render a list of sports with their names and counts once data is loaded', () => {
        vi.spyOn(sports, 'useLHNSports').mockReturnValue({
            sports: sportIds.map((sport, i) => ({
                id: sport,
                displayOrder: i,
                name: sport,
                count: Math.floor(Math.random() * 10),
            })),
            isLoading: false,
        });

        const { getByText } = renderWithAppWrapper(<InPlayLHN />, {}, { wrapper: buildSubUnsubWrapper() });

        sportIds.forEach((sport) => {
            expect(getByText(sport)).toBeInTheDocument();
        });
    });

    it('should automatically expand the first sport and show its competitions by default', () => {
        vi.spyOn(sports, 'useLHNSports').mockReturnValue({
            sports: [
                { id: 'football', displayOrder: 0, name: 'Football', count: 1 },
                { id: 'tennis', displayOrder: 0, name: 'Tennis', count: 1 },
            ],
            isLoading: false,
        });

        const { getByText, queryByText } = renderWithAppWrapper(<InPlayLHN />, {}, { wrapper: buildSubUnsubWrapper() });

        sportIds.forEach((sport, i) => {
            if (i === 0) {
                expect(getByText(`Competition [${sport}]`)).toBeInTheDocument();
            } else {
                expect(queryByText(`Competition [${sport}]`)).not.toBeInTheDocument();
            }
        });
    });

    it('should allow the user to toggle a sport to show or hide its competitions', async () => {
        vi.spyOn(sports, 'useLHNSports').mockReturnValue({
            sports: [{ id: 'tennis', displayOrder: 0, name: 'Tennis', count: 1 }],
            isLoading: false,
        });

        const { getByTestId, getByText, queryByText } = renderWithAppWrapper(
            <InPlayLHN />,
            {},
            { wrapper: buildSubUnsubWrapper() },
        );

        expect(queryByText('Competition [tennis]')).not.toBeInTheDocument();

        await act(async () => {
            await userEvent.click(getByTestId('in-play-lhn-sport'));
        });

        expect(getByText('Competition [tennis]')).toBeInTheDocument();
    });
});
