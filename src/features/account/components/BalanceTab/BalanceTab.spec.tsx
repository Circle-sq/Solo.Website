import userEvent from '@testing-library/user-event';
import { add } from 'date-fns';
import { http, HttpResponse } from 'msw';

import { MockStoreProvider } from '@solo-tests/unit/mocks/jotai/store';
import { languagesMock } from '@solo-tests/unit/mocks/languagesMock';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { server } from '@solo-tests/unit/mocks/server.setup';

import { Currency, OddsFormatLong } from 'src/common/enums';

import { isAuthenticatedAtom, userDataAtom } from '../../store/atoms';
import type { UserData } from '../../types';

import { userCurrenciesMock } from './__mocks__/mocks';
import BalanceTab from './BalanceTab';

const userData = {
    id: 1,
    oddsFormat: OddsFormatLong.Decimal,
    wallet: {
        playableBalance: 20000000000,
    },
} as UserData;

const render = () =>
    renderWithAppWrapper(
        <MockStoreProvider
            values={[
                [isAuthenticatedAtom, true],
                [userDataAtom, userData],
            ]}
        >
            <BalanceTab />
        </MockStoreProvider>,
    );

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: (): Record<string, unknown> => ({
            language: {
                currency: Currency.KRW,
                getLanguages: () => languagesMock,
                setUserLang: vi.fn().mockImplementation((id: string) => console.info(id)),
                userLang: 'ko-KR',
            },
        }),
        default: vi.fn(),
    };
});

const handlers = [
    http.get('/api/user/freebet/1/credits', async () => {
        return HttpResponse.json({
            totalAmount: 5000,
            bonusCredits: [
                {
                    id: 1,
                    amount: 2500,
                    description: 'Freebet 1',
                    koreanDescription: '무료 베팅 1',
                    expiryDate: add(new Date(), { days: 1 }).toISOString(),
                },
                {
                    id: 2,
                    amount: 2500,
                    description: 'Freebet 2',
                    koreanDescription: '무료 베팅 2',
                    expiryDate: add(new Date(), { days: 2 }).toISOString(),
                },
            ],
        });
    }),
    http.get('/api/wallets/101/currencies', async () => {
        return HttpResponse.json(userCurrenciesMock);
    }),
];

server.use(...handlers);

describe('BalanceTab', () => {
    it('should render without errors', () => {
        const { getByTestId } = render();

        expect(getByTestId('balanceTabContainer')).toBeInTheDocument();
    });

    it('freebet label section should show the counter value of available freebets', async () => {
        const { findByTestId } = render();
        const freeBetCount = await findByTestId('freeBetCount');

        expect(freeBetCount).toHaveTextContent('2');
    });

    it('should render 2 freebet items on freebet dropdown toggle icon click', async () => {
        Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
            value: vi.fn(),
            writable: true,
        });

        const currentAvailableFreeBets = 2;
        const { findByTestId, findAllByTestId } = render();

        const freeBetDropdownToggle = await findByTestId('freeBetDropdownToggle');
        await userEvent.click(freeBetDropdownToggle);
        const freeBetItemsCount = (await findAllByTestId('freeBetItem')).length;

        expect(freeBetItemsCount).toEqual(currentAvailableFreeBets);
    });

    it('balance label section should show current available balance value', async () => {
        const currentBalance = '₩ 20,000,000,000';
        const { findByTestId } = render();
        const totalBalanceValue = await findByTestId('balanceTab-totalBalanceValue');

        expect(totalBalanceValue).toHaveTextContent(currentBalance);
    });
});
