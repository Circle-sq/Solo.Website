import { fromJS } from 'immutable';
import type { PropsWithChildren } from 'react';

import { buildSubUnsubWrapper, renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { RequestStatus, RouteName } from 'src/common/enums';
import type { EventItem } from 'src/common/types/event';

import EventCard from './EventCard';

vi.mock('@solo-features/subscription-manager/SubscribeElement', () => ({
    SubscribeElement: ({ children }: PropsWithChildren) => children,
}));

declare global {
    interface Document {
        pictureInPictureElement: HTMLElement;
        exitPictureInPicture(): Promise<void>;
    }
}

const _route = {
    name: RouteName.Event,
    params: {},
};

const eventIdInProps = 1;
const eventIdInState = 2;

const modelsEvents = [
    {
        id: eventIdInProps,
        sport: 'tennis',
        display: true,
        media: {
            liveTrackers: [
                {
                    id: eventIdInProps,
                    provider: 'img',
                },
            ],
            streams: [
                {
                    id: eventIdInProps,
                },
            ],
            statistics: [],
        },
    },
    {
        id: eventIdInState,
        sport: 'tennis',
        display: true,
        media: {
            liveTrackers: [
                {
                    id: eventIdInState,
                    provider: 'img',
                },
            ],
            streams: [
                {
                    id: eventIdInState,
                },
            ],
            statistics: [],
        },
    },
];

const initState = {
    media: fromJS({
        eventId: eventIdInState,
        activeTab: 'video',
        isPlayingVideo: false,
        isMediaWidgetExpanded: false,
        isMediaDropdownListSelected: false,
        streams: {
            items: [
                {
                    name: 'Paul, Tommy vs Rodionov, Jurij',
                    provider: 'img',
                    sportEventId: '1',
                    sportId: 'tennis',
                    streamId: '384689',
                },
                {
                    name: 'Ofner, Sebastian vs Barrios Vera, Marcelo Tomas',
                    provider: 'img',
                    sportEventId: '2',
                    sportId: 'tennis',
                    streamId: '384684',
                },
            ],
        },
    }),
    stream: fromJS({
        streamId: '1234',
        provider: 'betradar',
    }),
};

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: (): Record<string, unknown> => ({
        router: {
            route: _route,
        },
        language: {
            userLang: 'en',
        },
        models: {
            getEvent: vi.fn().mockImplementation((eventId: number) => {
                return modelsEvents.find((event) => event.id === eventId);
            }),
        },
        env: { img_api_url: '' },
    }),
}));

vi.mock('src/ui/events/MatchCard/MatchCard', () => ({
    default: () => {
        return <div className='match-card'></div>;
    },
}));

vi.mock('src/modules/media/actions/media', () => {
    return {
        setMediaEventId: (eventId: number) => {
            const newElement = document.createElement('div');
            newElement.innerHTML = eventId.toString();
            newElement.setAttribute('data-testid', 'event-id');
            document.body.appendChild(newElement);

            return {
                type: 'SET_MEDIA_EVENT',
                eventId,
            };
        },
        setMediaActiveTab: vi.fn(),
        setMediaWidgetState: vi.fn(),
        setMediaIsPlayingVideo: vi.fn(),
    };
});

const props = {
    eventId: eventIdInProps,
    status: RequestStatus.Ready,
    event: {
        id: 171474,
    } as EventItem,
    retrieved: true,
    onLoadRequest: vi.fn(),
};

describe('EventCard', () => {
    it('should set right eventId in state on event page', async () => {
        const { findByTestId } = renderWithAppWrapper(<EventCard {...props} />, initState, {
            wrapper: buildSubUnsubWrapper(),
        });

        const eventId = await findByTestId('event-id');
        expect(eventId).toHaveTextContent(eventIdInProps.toString());
    });
});
