import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import type { ReactNode } from 'react';

import { isAuthenticatedAtom, userDataAtom } from '@solo-account/store/atoms';
import type { UserData } from '@solo-account/types';
import { MockStoreProvider } from '@solo-tests/unit/mocks/jotai/store';
import MockReactQueryProvider from '@solo-tests/unit/mocks/MockReactQueryProvider';
import { server } from '@solo-tests/unit/mocks/server.setup';
import { ThemeSwitchProvider } from '@solo-ui/system';

import { ApiWrapper } from 'src/appState/ApiWrapper';
import { BetslipCashout, BetslipOdds } from 'src/common/enums';

import changeOddsUpdateFixture from './__mocks__/user/change-odds-update.json';
import BettingSettings from './BettingSettings';

vi.mock('src/appState/AppState', async function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                apiWrapper: new ApiWrapper(),
            };
        },
        default: vi.fn(),
    };
});

const userData = {
    id: 1,
    oddsUpdate: BetslipOdds.AcceptHigherOdds,
    cashoutAcceptMode: BetslipCashout.HigherCashout,
} as UserData;

let lastRequestPayload: null | Record<string, unknown> = {};

const handlers = [
    http.post('/api/user/change-odds-update', async ({ request }) => {
        const data = (await request.json()) as { cashoutAcceptMode: string };

        lastRequestPayload = data;

        const newAccountData = {
            ...changeOddsUpdateFixture,
            cashoutAcceptMode: data.cashoutAcceptMode,
        };

        return HttpResponse.json(newAccountData);
    }),
];

server.use(...handlers);

function renderWithProvider(children: ReactNode) {
    return render(
        <MockStoreProvider
            values={[
                [isAuthenticatedAtom, true],
                [userDataAtom, userData],
            ]}
        >
            <MockReactQueryProvider>
                <ThemeSwitchProvider>{children}</ThemeSwitchProvider>
            </MockReactQueryProvider>
        </MockStoreProvider>,
    );
}

afterEach(() => {
    lastRequestPayload = null;
});

describe('BettingSettings', () => {
    it('should change BetslipCashout setting from accept-higher-cashout to accept-any-cashout', async () => {
        const { getByRole } = renderWithProvider(<BettingSettings />);

        const acceptHigherCashoutInput = getByRole('radio', { name: 'Accept higher cashout' });
        expect(acceptHigherCashoutInput).toBeChecked();

        const acceptAnyCashoutInput = getByRole('radio', { name: 'Accept any cashout' });
        expect(acceptAnyCashoutInput).not.toBeChecked();

        await userEvent.click(acceptAnyCashoutInput);

        await waitFor(() => {
            expect(lastRequestPayload).toHaveProperty('cashoutAcceptMode', BetslipCashout.AnyCashout);
        });

        expect(acceptHigherCashoutInput).not.toBeChecked();
        expect(acceptAnyCashoutInput).toBeChecked();
    });
});
