import { render, screen } from '@testing-library/react';

import MockComponent from '@solo-tests/unit/mocks/MockComponent';

import LiveStream from './LiveStream';

vi.mock('src/ui/events/EventsList/EventsList', () => ({
    default: (props: { collectionId: string }) => {
        return <div>{props.collectionId}</div>;
    },
}));

vi.mock('src/ui/events/EventsList/styled', () => ({
    S_Message: MockComponent,
}));

const streamsCountersMock = [
    { id: 'soccer', displayOrder: 2, name: 'Soccer', count: 3 },
    { id: 'basketball', displayOrder: 1, name: 'Basketball', count: 2 },
    { id: 'tennis', displayOrder: 3, name: 'Tennis', count: 6 },
];

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext() {
            return {
                language: {
                    getTranslation: vi.fn().mockImplementation((_label, defaultText) => {
                        return defaultText;
                    }),
                },
            };
        },
        default: vi.fn(),
    };
});

describe('LiveStream', () => {
    it('renders in descending order based on displayOrder', () => {
        render(<LiveStream liveStreams={streamsCountersMock} />);

        const sortedSports = streamsCountersMock.slice().sort((a, b) => b.displayOrder - a.displayOrder);
        const sportsElements = screen.getAllByText(/^in-play-live-streaming-/);

        sportsElements.forEach((sportElement, index) => {
            expect(sportElement).toHaveTextContent(`in-play-live-streaming-${sortedSports[index].id}`);
        });
    });

    it('renders sorry message when streamsCounters is empty or not provided', () => {
        render(<LiveStream liveStreams={[]} />);

        expect(screen.queryByText(/^in-play-live-streaming-/)).not.toBeInTheDocument();
        expect(
            screen.queryByText(/^There are no live streaming events being traded. Come back later!/),
        ).toBeInTheDocument();
    });
});
