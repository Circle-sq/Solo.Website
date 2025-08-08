import { eventMediaAtom } from '@solo-media/store/atoms';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { SportType } from 'src/common/enums';
import type { EventMediaItem } from 'src/common/types/event';

import MediaWidget from './MediaWidget';

const eventIdOnEventPage = '1';
const eventIdInState = '2';

const modelsEvents: EventMediaItem[] = [
    {
        id: eventIdOnEventPage,
        sport: SportType.Football,
        media: {
            liveTrackers: [
                {
                    id: eventIdOnEventPage,
                    provider: 'betradar',
                },
            ],
            streams: [
                {
                    id: eventIdOnEventPage,
                    provider: 'betradar',
                },
            ],
            statistics: [],
        },
    },
    {
        id: eventIdInState,
        sport: SportType.Basketball,
        media: {
            liveTrackers: [
                {
                    id: eventIdInState,
                    provider: 'betradar',
                },
            ],
            streams: [
                {
                    id: eventIdInState,
                    provider: 'betradar',
                },
            ],
            statistics: [],
        },
    },
];

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: (): Record<string, unknown> => ({
        language: {
            userLang: 'en',
        },
    }),
}));

describe('MediaWidget', () => {
    it('should render MediaWidget from current event on event page', () => {
        const { container } = renderWithAppWrapper(<MediaWidget mediaName='video' />, {}, {}, (snap) =>
            snap.set(eventMediaAtom, modelsEvents[0]),
        );

        const sr_widget = container.getElementsByClassName('sr-widget')[0];
        expect(sr_widget.getAttribute('data-sr-match-id')).toEqual(eventIdOnEventPage.toString());
    });

    it('should render MediaWidget by eventId from redux state NOT on event page', () => {
        const { container } = renderWithAppWrapper(<MediaWidget mediaName='video' />, {}, {}, (snap) =>
            snap.set(eventMediaAtom, modelsEvents[1]),
        );

        const sr_widget = container.getElementsByClassName('sr-widget')[0];
        expect(sr_widget.getAttribute('data-sr-match-id')).toEqual(eventIdInState.toString());
    });
});
