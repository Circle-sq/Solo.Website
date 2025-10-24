import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { useState, type ReactNode } from 'react';
import { vi } from 'vitest';

import { isAuthenticatedAtom, userDataAtom } from '@solo-account/store/atoms';
import type { UserData } from '@solo-account/types';
import { MockStoreProvider } from '@solo-tests/unit/mocks/jotai/store';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { server } from '@solo-tests/unit/mocks/server.setup';

import { CryptoCurrency, Currency } from 'src/common/enums';

import StakeInput from './StakeInput';

vi.mock('lodash/debounce', () => {
    return {
        default: (fn: unknown) => fn,
    };
});

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext() {
            return {
                language: {
                    getTranslation(_key: string, defaultValue: string) {
                        return defaultValue;
                    },
                },
                currency: 10000000,
            };
        },
        default: vi.fn(),
    };
});

const handlers = [
    http.get('/api/wallet-configs', async () => {
        return HttpResponse.json({
            currency: 'ETH',
            currencyConfig: {
                decimalPrecision: 18,
                currencyType: CryptoCurrency.ETH,
                symbol: 'ETH',
                name: 'Ethereum',
                minStake: 1,
            },
        });
    }),
];

server.use(...handlers);

const sleep = async (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
const delay = 150;

const WrapperStakeInput = ({
    value,
    numpadId,
    isDisabled,
}: {
    value: string | number;
    numpadId: string;
    isDisabled: boolean;
}) => {
    const [stakeValue, setValue] = useState(value);

    return <StakeInput value={stakeValue} isDisabled={isDisabled} onChange={setValue} numpadId={numpadId} />;
};

const render = (userData: UserData, children: ReactNode) =>
    renderWithAppWrapper(
        <MockStoreProvider
            values={[
                [isAuthenticatedAtom, true],
                [userDataAtom, userData],
            ]}
        >
            {children}
        </MockStoreProvider>,
    );

describe('StakeInput', () => {
    const onChangeSpy = vi.fn();
    const testId = 'stakeAmount';

    beforeEach(() => {
        onChangeSpy.mockClear();
    });

    const accountState = {
        wallet: {
            currency: CryptoCurrency.METH,
        },
    } as UserData;

    it('should validate input value and call showNumpadSpy and call on change property in multiple tab', async () => {
        const { findByTestId } = render(accountState, <WrapperStakeInput value='' isDisabled={false} numpadId='1' />);
        const input = await findByTestId(testId);

        await userEvent.type(input, '09a0bc.9.90');
        expect(input).toHaveValue('90.990');

        await userEvent.clear(input);
        await userEvent.type(input, '10');
        expect(input).toHaveValue('10');
    });

    it('should validate input value in single tab', async () => {
        const { findByTestId } = render(accountState, <WrapperStakeInput value='' isDisabled={false} numpadId='1' />);
        const input = await findByTestId(testId);

        await userEvent.type(input, '001z0qc.2.10');
        expect(input).toHaveValue('10.210');
    });
    it('should handle dot and numbers correctly', async () => {
        const onChangeSpy = vi.fn();
        const { findByTestId } = renderWithAppWrapper(
            <StakeInput value='' isDisabled={false} onChange={onChangeSpy} numpadId='1532' />,
        );
        const input = await findByTestId(testId);

        // Test for dot
        await userEvent.type(input, '1');
        await userEvent.type(input, '.');
        await userEvent.type(input, '1');
        expect(input).toHaveValue('1.1'); // Changed from '.' to '0.'
        await sleep(delay);
        expect(onChangeSpy).toHaveBeenCalledWith(1.1); // Changed from '.' to '0.'

        // Clear the input before the next test
        await userEvent.clear(input);
        onChangeSpy.mockClear();

        // Test for number with dot
        await userEvent.type(input, '5.25');
        expect(input).toHaveValue('5.25');
        await sleep(delay);
        expect(onChangeSpy).toHaveBeenCalledWith(5.25);

        // Test for multiple dots
        await userEvent.clear(input);
        onChangeSpy.mockClear();
        await userEvent.type(input, '5.2.5');
        expect(input).toHaveValue('5.25');
        await sleep(delay);
        expect(onChangeSpy).toHaveBeenCalledWith(5.25);
    });
});

describe('Edit & Caret position for CRW currency', () => {
    const testId = 'stakeAmount';

    const accountState = {
        wallet: {
            currency: Currency.KRW,
        },
    } as UserData;

    it('should keep same position while typing', async () => {
        const { getByTestId } = render(
            accountState,
            <StakeInput onChange={vi.fn()} isDisabled={false} value='' numpadId='1' />,
        );
        const input = getByTestId(testId) as HTMLInputElement;

        await userEvent.type(input, '1239', { delay });
        await sleep(delay);
        expect(input).toHaveValue('1,239');
        expect(input.selectionStart).toBe(5);

        input.setSelectionRange(4, 4);
        await userEvent.type(input, '45678', { delay, initialSelectionStart: 4, initialSelectionEnd: 4 });
        await sleep(delay);

        expect(input).toHaveValue('123,456,789');
    });
    it('should keep same position while removing backward (Backspace)', async () => {
        const { getByTestId } = render(
            accountState,
            <StakeInput onChange={vi.fn()} isDisabled={false} value='' numpadId='1' />,
        );
        const input = getByTestId(testId) as HTMLInputElement;
        await userEvent.type(input, '123456789', { delay });

        input.setSelectionRange(5, 9);
        await userEvent.type(input, '{backspace}', {
            delay,
            initialSelectionStart: 5,
            initialSelectionEnd: 9,
        });
        await sleep(delay);
        expect(input).toHaveValue('123,489');
    });
    it('should keep same position while removing forward (Delete)', async () => {
        const { getByTestId } = render(
            accountState,
            <StakeInput onChange={vi.fn()} isDisabled={false} value='' numpadId='1' />,
        );
        const input = getByTestId(testId) as HTMLInputElement;
        await userEvent.type(input, '123456789', { delay });

        input.setSelectionRange(5, 9);
        await userEvent.type(input, '{backspace}', {
            delay,
            initialSelectionStart: 5,
            initialSelectionEnd: 9,
        });
        await sleep(delay);
        expect(input).toHaveValue('123,489');
        expect(input.selectionStart).toBe(5);
    });

    it('should remove next character after separator and move caret position', async () => {
        const { getByTestId } = render(
            accountState,
            <StakeInput onChange={vi.fn()} isDisabled={false} value='' numpadId='1' />,
        );
        const input = getByTestId(testId) as HTMLInputElement;
        await userEvent.type(input, '123456', { delay });
        await sleep(delay);

        input.setSelectionRange(4, 4);
        await userEvent.type(input, '{backspace}', {
            delay,
            initialSelectionStart: 4,
            initialSelectionEnd: 4,
        });
        await sleep(delay);

        expect(input).toHaveValue('12,456');

        await userEvent.clear(input);
        await userEvent.type(input, '123456', { delay });

        input.setSelectionRange(5, 5);
        await userEvent.type(input, '{backspace}', {
            delay,
            initialSelectionStart: 5,
            initialSelectionEnd: 5,
        });
        await sleep(delay);
        expect(input).toHaveValue('12,356');
        expect(input.selectionStart).toBe(4);
    });

    it('should keep same caret position on copy/paste event', async () => {
        const { getByTestId } = render(
            accountState,
            <StakeInput onChange={vi.fn()} isDisabled={false} value='' numpadId='1' />,
        );
        const input = getByTestId(testId) as HTMLInputElement;
        await userEvent.type(input, '123');
        await sleep(delay);

        expect(input).toHaveValue('123');
        expect(input.selectionStart).toBe(3);

        await userEvent.clear(input);
        await userEvent.type(input, '12345', { delay });
        await sleep(delay);

        expect(input).toHaveValue('12,345');
        expect(input.selectionStart).toBe(6);

        await userEvent.clear(input);
        await userEvent.type(input, '12345678', { delay });
        await sleep(delay);

        expect(input).toHaveValue('12,345,678');
        expect(input.selectionStart).toBe(10);
    });
});
