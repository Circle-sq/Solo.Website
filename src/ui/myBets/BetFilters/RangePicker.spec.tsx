import { screen, fireEvent, waitFor } from '@testing-library/react';
import { format, parseISO } from 'date-fns';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import RangePicker from './RangePicker';

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => ({
            language: {
                userLang: 'en-US',
                getTranslation(_key: string, defaultValue: string) {
                    return defaultValue;
                },
            },
        }),

        default: vi.fn(),
    };
});

const mockHandleDateChange = vi.fn();

const initialRange = {
    from: '2023-05-22',
    to: '2023-06-22',
    isValid: true,
};

const renderRangePicker = (range = initialRange) => {
    return renderWithAppWrapper(<RangePicker range={range} handleDateChange={mockHandleDateChange} />);
};

describe('RangePicker', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('Renders RangePicker with the correct data', () => {
        renderRangePicker();

        expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue('2023-05-22')).toBeInTheDocument();
        expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue('2023-06-22')).toBeInTheDocument();
    });

    it('Calls handleDateChange on date change for the start date', async () => {
        renderRangePicker();

        const startDateInput = screen.getByLabelText(/Start Date/i);
        fireEvent.change(startDateInput, { target: { value: '2023-05-23' } });

        await waitFor(() => {
            const expectedDate = format(parseISO('2023-05-23'), 'yyyy-MM-dd');
            const calledDate = format(mockHandleDateChange.mock.calls[0][0], 'yyyy-MM-dd');
            expect(calledDate).toBe(expectedDate);
            expect(mockHandleDateChange.mock.calls[0][1]).toBe('from');
        });
    });

    it('Calls handleDateChange on date change for the end date', async () => {
        renderRangePicker();

        const endDateInput = screen.getByLabelText(/End Date/i);
        fireEvent.change(endDateInput, { target: { value: '2023-06-23' } });

        await waitFor(() => {
            const expectedDate = format(parseISO('2023-06-23'), 'yyyy-MM-dd');
            const calledDate = format(mockHandleDateChange.mock.calls[0][0], 'yyyy-MM-dd');
            expect(calledDate).toBe(expectedDate);
            expect(mockHandleDateChange.mock.calls[0][1]).toBe('to');
        });
    });

    it('Displays validation message when the date range is invalid', () => {
        const invalidRange = {
            from: '2023-05-22',
            to: '2023-06-22',
            isValid: false,
        };

        renderRangePicker(invalidRange);

        expect(
            screen.getByText(/Maximum date range is 90 days. Your date range has been updated/i),
        ).toBeInTheDocument();
    });
});
