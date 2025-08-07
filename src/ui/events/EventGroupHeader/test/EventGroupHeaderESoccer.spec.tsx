import { fireEvent } from '@testing-library/react';
import type { ComponentProps } from 'react';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import { SPORT_TYPE } from 'src/utils/constants';

import EventGroupHeaderESoccer from '../EventGroupHeaderESoccer';

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                router: {},
                language: {
                    getTranslation: (str: string) => str,
                },
            };
        },
        default: vi.fn(),
    };
});

const defaultProps: ComponentProps<typeof EventGroupHeaderESoccer> = {
    sportId: SPORT_TYPE.football,
    showSelections: false,
    columnLabelsGroups: [
        ['H', 'D', 'A'],
        ['', 'H', 'A'],
        ['G', 'O', 'U'],
    ],
    label: ['GT Sports League', 'GT Nations League'],
    selectionsSizes: [3, 3, 3],
};

const renderComponent = (props = defaultProps) => renderWithAppWrapper(<EventGroupHeaderESoccer {...props} />);

describe('EventGroupHeaderESoccer', () => {
    it('should render with minimum props', () => {
        const { getByText, getByLabelText } = renderComponent();
        expect(getByText(/esoccer/i)).toBeInTheDocument();
        expect(getByText(/gt nations league/i)).toBeInTheDocument();
        expect(getByLabelText(/cupIcon/i)).toBeInTheDocument();
    });

    it('should render events counter when defined', () => {
        const { getByText } = renderComponent({ ...defaultProps, eventsCount: 23 });
        expect(getByText(/esoccer/i)).toBeInTheDocument();
        expect(getByText(/gt nations league/i)).toBeInTheDocument();
        expect(getByText(/\( 23 \)/i)).toBeInTheDocument();
    });

    it('should render arrow icon and call onToggle on click when onToggle is defined', () => {
        const onToggle = vi.fn();
        const { getByTestId } = renderComponent({ ...defaultProps, onToggle, isOpen: false });
        const arrowIndication = getByTestId('downArrowIcon');
        expect(arrowIndication).toBeInTheDocument();
        fireEvent.click(arrowIndication);
        expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('should render arrow icon up when open is true', () => {
        const onToggle = vi.fn();
        const { getByTestId } = renderComponent({ ...defaultProps, onToggle, isOpen: true });
        const arrowIndication = getByTestId('upArrowIcon');
        expect(arrowIndication).toBeInTheDocument();
    });
});
