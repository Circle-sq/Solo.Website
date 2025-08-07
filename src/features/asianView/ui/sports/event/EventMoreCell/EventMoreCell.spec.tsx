import { screen, fireEvent } from '@testing-library/react';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import { RouteName } from 'src/common/enums';

import EventMoreCell from './EventMoreCell';

const mockRedirect = vi.fn();

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: (): Record<string, unknown> => ({
        router: {
            redirect: mockRedirect,
        },
    }),
}));

describe('EventMoreCell', () => {
    const eventId = 1;

    it('should not render the more markets button when markets count is 0', () => {
        renderWithAppWrapper(<EventMoreCell eventId={eventId} />);

        expect(screen.queryByText('+ 0')).not.toBeInTheDocument();
    });

    it('should call router.redirect with correct parameters on click', () => {
        renderWithAppWrapper(<EventMoreCell eventId={eventId} />);

        fireEvent.click(screen.getByTestId('eventMoreCell'));

        expect(mockRedirect).toHaveBeenCalledWith(RouteName.Event, { id: eventId, slug: '' });
    });
});
