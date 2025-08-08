import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { Homepage } from 'src/ui/layouts/Homepage/Homepage';

vi.mock('src/ui/events/EventsHighlightCarousel', () => ({
    default: () => <div data-testid='EventsHighlightCarousel' />,
}));
vi.mock('src/ui/events/containers/EventsInPlay/EventsInPlay', () => ({
    default: () => <div data-testid='EventsOnLater' />,
}));
vi.mock('src/ui/events/containers/EventsOnLater', () => ({ default: () => <div data-testid='EventsOnLater' /> }));
vi.mock('src/ui/containers/NavigationSidebar/NavigationSidebar', () => ({
    default: () => <div data-testid='NavigationSidebar' />,
}));
vi.mock('src/ui/common/Panel/Panel', () => ({ default: () => <div data-testid='Panel' /> }));
vi.mock('src/ui/content/Banners/BannersContainer', () => ({ default: () => <div data-testid='BannersContainer' /> }));
vi.mock('src/appState/AppState', () => ({
    useAppStateContext: () => ({
        router: {
            route: { params: null },
        },
        language: { getTranslation: vi.fn() },
    }),
}));

describe('Homepage', () => {
    it('should hide banners for mobile devices', () => {
        act(() => {
            (window as any).innerWidth = 500;
            fireEvent(window, new Event('resize'));
        });

        renderWithAppWrapper(<Homepage />);
        const bannersContainer = screen.getByTestId('BannersContainer');
        expect(bannersContainer).toBeInTheDocument();

        act(() => {
            (window as any).innerWidth = 499;
            fireEvent(window, new Event('resize'));
        });
        expect(bannersContainer).not.toBeInTheDocument();
    });
});
