import type { PropsWithChildren } from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Map } from 'immutable';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import MockComponent from '@solo-tests/unit/mocks/MockComponent';

import GroupingNavigation from '../GroupingNavigation';
const eventId = 111;

const initState = {
    sports: Map().setIn(['all', 'items'], Map()),
};
const routerMock = vi.fn();

vi.mock('src/ui/common/Carousel/Carousel', () => ({ default: MockComponent }));

vi.mock('src/utils/Router/Link', () => ({
    default: ({
        children,
        className,
        params,
        onClick,
    }: PropsWithChildren<{
        className: string;
        params: Record<string, unknown>;
        onClick: () => void;
    }>) => {
        return (
            <a data-testid={`market-${params.market}`} className={className} onClick={onClick}>
                {children}
            </a>
        );
    },
}));

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => {
            return {
                router: routerMock(),
                language: {
                    getTranslation: vi.fn().mockImplementation((_, param2) => param2),
                },
                models: {
                    getEvent: vi.fn().mockImplementation(() => ({
                        id: eventId,
                        sport: 'tennis',
                        display: true,
                    })),
                },
            };
        },
        default: vi.fn(),
    };
});

describe('GroupingNavigation', () => {
    const marketProps = {
        main: {
            visible: true,
            position: 0,
        },
        group1: {
            visible: true,
            position: 1,
        },
        group2: {
            visible: true,
            position: 2,
        },
        group3: {
            visible: false,
            position: 2,
        },
    };

    const marketGroups = ['main', 'group1', 'group2'];
    const defaultProps = { eventId, marketGroups: marketProps };

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should render first market as selected (if none provided)', () => {
        routerMock.mockReturnValue({ route: { name: 'event', params: {} } });

        const { container } = renderWithAppWrapper(<GroupingNavigation {...defaultProps} />, initState);
        const activeLinks = container.querySelectorAll('a.active');

        expect(activeLinks.length).toEqual(1);
        expect(activeLinks[0]).toHaveTextContent(marketGroups[0]);
    });

    it('should render a market as selected (if provided)', () => {
        const givenIndex = 1;
        routerMock.mockReturnValue({ route: { name: 'event', params: { market: givenIndex } } });

        const { container } = renderWithAppWrapper(<GroupingNavigation {...defaultProps} />, initState);
        const activeLinks = container.querySelectorAll('a.active');

        expect(activeLinks.length).toEqual(1);
        expect(activeLinks[0]).toHaveTextContent(marketGroups[givenIndex]);
    });

    it('should make one active if clicked/selected', async () => {
        routerMock.mockReturnValue({ route: { name: 'event', params: { market: 0 } } });

        const { container } = renderWithAppWrapper(<GroupingNavigation {...defaultProps} />, initState);
        const marketMain = screen.getByTestId('market-0');
        expect(marketMain).toHaveTextContent(/main/i);
        await userEvent.click(marketMain);

        expect(marketMain).toHaveClass('active');
        expect(container.querySelectorAll('a.active').length).toEqual(1);
    });
});
