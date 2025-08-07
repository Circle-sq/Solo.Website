import { screen, fireEvent, waitFor } from '@testing-library/react';
import { format, parseISO } from 'date-fns';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import DatePicker from './DatePicker';

const mockHandleDateChange = vi.fn();

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

const renderDatePicker = () => {
    return renderWithAppWrapper(
        <DatePicker
            label='Start Date'
            name='from'
            defaultValue={new Date('2023-05-22')}
            handleDateChange={mockHandleDateChange}
        />,
    );
};

describe('DatePicker', () => {
    test('Renders DatePicker with the correct data', () => {
        renderDatePicker();

        expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue('2023-05-22')).toBeInTheDocument();
    });

    test('Calls handleDateChange on date change', async () => {
        renderDatePicker();

        const dateInput = screen.getByLabelText(/Start Date/i);

        fireEvent.change(dateInput, { target: { value: '2023-05-23' } });

        await waitFor(() => {
            const expectedDate = format(parseISO('2023-05-23'), 'yyyy-MM-dd');
            const calledDate = format(mockHandleDateChange.mock.calls[0][0], 'yyyy-MM-dd');
            expect(calledDate).toBe(expectedDate);
            expect(mockHandleDateChange.mock.calls[0][1]).toBe('from');
        });
    });
});
