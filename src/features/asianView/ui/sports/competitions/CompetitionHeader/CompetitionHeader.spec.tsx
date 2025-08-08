import type { ComponentProps } from 'react';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { mockUseAppStateContext } from 'src/ui/common/SubNavigation/tests/test-helper';

import { mockedEventGroupForHeader } from '../test/mocks';

import CompetitionHeader from './CompetitionHeader';

vi.mock('src/appState/AppState', () => {
    return { __esModule: true, useAppStateContext: () => mockUseAppStateContext({}), default: vi.fn() };
});

vi.mock('src/api/icons/queries', () => {
    return {
        useGetCategoryIconsApi: vi.fn().mockImplementation(() => ({
            data: [],
        })),
        useGetCategoriesIconsApi: vi.fn().mockImplementation(() => ({
            data: undefined,
        })),
    };
});

const defaultProps: ComponentProps<typeof CompetitionHeader> = {
    group: mockedEventGroupForHeader,
    isExpanded: true,
};

const renderComponent = (props = defaultProps) =>
    renderWithAppWrapper(
        <table>
            <tbody>
                <tr>
                    <CompetitionHeader {...props} />
                </tr>
            </tbody>
        </table>,
    );

describe('EventHeader', () => {
    it('should render with default props', () => {
        const { container, getByLabelText } = renderComponent();

        expect(getByLabelText(/australia/i)).toBeInTheDocument();
        expect(container).toHaveTextContent(['Australia', 'South Australia NPL', '( 0 )'].join(''));
        expect(getByLabelText('upArrowIcon')).toBeInTheDocument();
    });

    it('should render with arrow down icon when collapsed', () => {
        const { container, getByLabelText } = renderComponent({ ...defaultProps, isExpanded: false });

        expect(getByLabelText(/australia/i)).toBeInTheDocument();
        expect(container).toHaveTextContent(['Australia', 'South Australia NPL', '( 0 )'].join(''));
        expect(getByLabelText('downArrowIcon')).toBeInTheDocument();
    });
});
