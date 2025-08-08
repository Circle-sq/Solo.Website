import { screen } from '@testing-library/react';
import { Map as ImmutableMap } from 'immutable';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';

import '@solo-tests/unit/mocks/matchMedia.mock';
import MockComponent from '@solo-tests/unit/mocks/MockComponent';
import { buildSubUnsubWrapper, renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { server } from '@solo-tests/unit/mocks/server.setup';

import type { LanguageStore } from 'src/appState/LanguageStore';
import { buildTranslateStatisticsPeriodNameHelper } from 'src/appState/translation-helper';

import EventsHighlightCarousel from './EventsHighlightCarousel';
import rawData from './tests/marqueeCardEvent.json';

vi.mock('src/appState/AppState', () => {
    const language: LanguageStore = { getTranslation: (_key: string, defaultText) => defaultText };

    return {
        __esModule: true,
        useAppStateContext: () => ({
            translationsStore: { translateStatisticsPeriodName: buildTranslateStatisticsPeriodNameHelper(language) },
            language,
            apiWrapper: {
                getUniformsList: vi.fn().mockReturnValue([]),
            },
            eventsCollection: {
                getEventsCollectionList() {
                    return {
                        events: rawData,
                    };
                },
            },
            reduxState: {
                competitionIcons: ImmutableMap().set('02_sr:simple_tournament:101786', {
                    id: 26761,
                    label: null,
                    url: 'https://blablabla.com',
                    width: 33,
                    height: 33,
                    caption: null,
                    sha1: 'qweasdzxc',
                    altText: null,
                }),
            },
        }),
        default: vi.fn(),
    };
});

vi.mock('src/utils/Router/NewLink', () => ({
    default: ({ children, testId }: PropsWithChildren<{ testId: string }>) => {
        return (
            <a href='tests#' data-testid={testId}>
                {children}
            </a>
        );
    },
}));

vi.mock('src/ui/events/EventsHighlightCarousel/SelectionHighlightCarousel/SelectionHighlightCarousel', () => ({
    default: ({ children }: PropsWithChildren) => {
        return <div data-testid='selection'>{children}</div>;
    },
}));

vi.mock('src/ui/events/EventPeriod/EventPeriod', () => ({ default: MockComponent }));

const handlers = [
    http.get('/api/uniforms/football/player/home', () => {
        return HttpResponse.json([]);
    }),
];

server.use(...handlers);

describe('EventsHighlightCarousel', () => {
    it('should render marquee card', () => {
        renderWithAppWrapper(<EventsHighlightCarousel />, {}, { wrapper: buildSubUnsubWrapper() });
        const marqueeCard = screen.getByTestId(`eventCard-${rawData[0].id}`);
        expect(marqueeCard).toBeInTheDocument();
    });

    it.skip('should render marquee card', () => {
        const normalize = (row: string[]) => row.join('').replace(/\s+/g, ' ').trim();
        const { container } = renderWithAppWrapper(
            <EventsHighlightCarousel />,
            {},
            { wrapper: buildSubUnsubWrapper() },
        );

        expect(container).toHaveTextContent(
            normalize([
                // prettier-ignore
                'FIBA Asia Cup Qualifiers      LIVE 17:00',
                '         Qatar 🇶🇦   vs    🇮🇳 India      ', // mock icon/flags to return emoji flags
                '--------- Winner (incl. overtime)-------', // mock separator style
                '      [1]                     [2]       ',
                ' [   1.01   ]            [   19.00   ]  ',
            ]),
        );
    });
});
