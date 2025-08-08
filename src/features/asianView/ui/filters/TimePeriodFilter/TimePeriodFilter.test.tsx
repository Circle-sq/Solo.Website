import { fireEvent } from '@testing-library/react';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { mockUseAppStateContext } from 'src/ui/common/SubNavigation/tests/test-helper';

import TimePeriodFilter from './TimePeriodFilter';

vi.mock('src/appState/AppState', () => {
    return { __esModule: true, useAppStateContext: () => mockUseAppStateContext({}), default: vi.fn() };
});

describe('TimePeriodFilter', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should contain as options All Times, next 5 days with yyyy.mm.dd format and Onwards and should change option on select', async () => {
        const date = new Date(2024, 0, 1);
        vi.setSystemTime(date);

        const { container, getByText } = renderWithAppWrapper(<TimePeriodFilter />);

        expect(container).toHaveTextContent('All Times');

        fireEvent.click(getByText(/all times/i));

        //prettier-ignore
        expect(container).toHaveTextContent(
            [
                'All Times',
                '2024.01.02',
                '2024.01.03',
                '2024.01.04',
                '2024.01.05',
                '2024.01.06',
                'Onwards',
            ].join(''));

        fireEvent.click(getByText(/2024\.01\.03/i));

        expect(container).toHaveTextContent('2024.01.03');
    });
});
