import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren } from 'react';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import { mockUseAppStateContext } from 'src/ui/common/SubNavigation/tests/test-helper';

import { speedBetMarketsAtom } from '../../../store/atoms';
import { mockedSpeedBetMarketsAtom } from '../__mocks__/mocks';

import SpeedBetCards from './SpeedBetCards';

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => mockUseAppStateContext({}),
        default: vi.fn(),
    };
});

const isDesktop = true;

vi.mock('@sc-hooks', () => ({
    __esModule: true,
    useWindowWidth: () => ({ isDesktop }),
}));

vi.mock('@sc-features/subscription-manager/SubscribeElement', () => ({
    SubscribeElement: ({ children }: PropsWithChildren) => children,
}));

describe('SpeedBetCards', async () => {
    it('should move the first market to the bottom of the stack when pressing next bet', async () => {
        const { container, getByText } = renderWithAppWrapper(<SpeedBetCards />, undefined, undefined, (snap) =>
            snap.set(speedBetMarketsAtom, mockedSpeedBetMarketsAtom),
        );

        // Markets are intertwined to simulate "worst-case"
        // 1 - hidden
        // 2 - displayed
        // 3 - hidden
        // 4 - hidden
        // 5 - displayed
        // 6 - displayed
        // 7 - displayed

        const { markets } = mockedSpeedBetMarketsAtom;

        expect(markets).toHaveLength(7);
        expect(markets[0].active && markets[0].display).toBeFalsy();
        expect(markets[1].active && markets[1].display).toBeTruthy();
        expect(markets[2].active && markets[2].display).toBeFalsy();
        expect(markets[3].active && markets[3].display).toBeFalsy();
        expect(markets[4].active && markets[4].display).toBeTruthy();
        expect(markets[5].active && markets[5].display).toBeTruthy();
        expect(markets[6].active && markets[6].display).toBeTruthy();

        const firstVisibleMarketName =
            'CCM JUST TOOK THEIR FIRST SHOT IN 10 MINUTES! HOW MANY SHOTS WILL THEY TAKE BETWEEN 13:00 AND 22:59? ⚽️ (EXCLUDING BLOCKED SHOTS)';
        const secondVisibleMarketName =
            'NO SHOTS BY EITHER TEAM SO FAR. WHICH TEAM WILL TAKE THE FIRST SHOT AFTER 11:00? ⚽️ (EXCLUDING BLOCKED SHOTS)';
        const thirdVisibleMarketName =
            'NO SHOTS BY EITHER TEAM SO FAR. WHICH TEAM WILL TAKE THE FIRST SHOT AFTER 12:00? ⚽️ (EXCLUDING BLOCKED SHOTS)';
        const forthVisibleMarketName =
            'NO SHOTS BY EITHER TEAM SO FAR. WHICH TEAM WILL TAKE THE FIRST SHOT AFTER 12:20? ⚽️ (EXCLUDING BLOCKED SHOTS)';

        expect(markets[1].name).toBe(firstVisibleMarketName);
        expect(markets[4].name).toBe(secondVisibleMarketName);
        expect(markets[5].name).toBe(thirdVisibleMarketName);
        expect(markets[6].name).toBe(forthVisibleMarketName);

        expect(container).toHaveTextContent(
            [
                firstVisibleMarketName,
                ['2+', '3.05', '', '0-1', '1.33'].join(''),
                '0.9 CCM shots per 10 min',

                secondVisibleMarketName,
                ['CCM', '1.85', '', 'NUJ', '1.85'].join(''),
                '0 shots for NUJ + CCM',

                forthVisibleMarketName,
                ['CCM', '1.95', '', 'NUJ', '1.95'].join(''),
                '0 shots for NUJ + CCM',

                'Previous betNext bet',
            ].join(''),
        );

        await userEvent.click(getByText(/next bet/i));

        await waitFor(() => {
            expect(container).toHaveTextContent(
                [
                    secondVisibleMarketName,
                    ['CCM', '1.85', '', 'NUJ', '1.85'].join(''),
                    '0 shots for NUJ + CCM',

                    thirdVisibleMarketName,
                    ['CCM', '1.85', '', 'NUJ', '1.85'].join(''),
                    '0 shots for NUJ + CCM',

                    firstVisibleMarketName,
                    ['2+', '3.05', '', '0-1', '1.33'].join(''),
                    '0.9 CCM shots per 10 min',

                    'Previous betNext bet',
                ].join(''),
            );
        });
    });

    it('should move the last market to the top of the stack when pressing previous bet', async () => {
        const { container, getByText } = renderWithAppWrapper(<SpeedBetCards />, undefined, undefined, (snap) =>
            snap.set(speedBetMarketsAtom, mockedSpeedBetMarketsAtom),
        );

        // Markets are intertwined to simulate "worst-case"
        // 1 - hidden
        // 2 - displayed
        // 3 - hidden
        // 4 - hidden
        // 5 - displayed
        // 6 - displayed
        // 7 - displayed

        const { markets } = mockedSpeedBetMarketsAtom;

        expect(markets).toHaveLength(7);
        expect(markets[0].active && markets[0].display).toBeFalsy();
        expect(markets[1].active && markets[1].display).toBeTruthy();
        expect(markets[2].active && markets[2].display).toBeFalsy();
        expect(markets[3].active && markets[3].display).toBeFalsy();
        expect(markets[4].active && markets[4].display).toBeTruthy();
        expect(markets[5].active && markets[5].display).toBeTruthy();

        const firstVisibleMarketName =
            'CCM JUST TOOK THEIR FIRST SHOT IN 10 MINUTES! HOW MANY SHOTS WILL THEY TAKE BETWEEN 13:00 AND 22:59? ⚽️ (EXCLUDING BLOCKED SHOTS)';
        const secondVisibleMarketName =
            'NO SHOTS BY EITHER TEAM SO FAR. WHICH TEAM WILL TAKE THE FIRST SHOT AFTER 11:00? ⚽️ (EXCLUDING BLOCKED SHOTS)';
        const thirdVisibleMarketName =
            'NO SHOTS BY EITHER TEAM SO FAR. WHICH TEAM WILL TAKE THE FIRST SHOT AFTER 12:00? ⚽️ (EXCLUDING BLOCKED SHOTS)';
        const forthVisibleMarketName =
            'NO SHOTS BY EITHER TEAM SO FAR. WHICH TEAM WILL TAKE THE FIRST SHOT AFTER 12:20? ⚽️ (EXCLUDING BLOCKED SHOTS)';

        expect(markets[1].name).toBe(firstVisibleMarketName);
        expect(markets[4].name).toBe(secondVisibleMarketName);
        expect(markets[5].name).toBe(thirdVisibleMarketName);
        expect(markets[6].name).toBe(forthVisibleMarketName);

        expect(container).toHaveTextContent(
            [
                firstVisibleMarketName,
                ['2+', '3.05', '', '0-1', '1.33'].join(''),
                '0.9 CCM shots per 10 min',

                secondVisibleMarketName,
                ['CCM', '1.85', '', 'NUJ', '1.85'].join(''),
                '0 shots for NUJ + CCM',

                forthVisibleMarketName,
                ['CCM', '1.95', '', 'NUJ', '1.95'].join(''),
                '0 shots for NUJ + CCM',

                'Previous betNext bet',
            ].join(''),
        );

        await userEvent.click(getByText(/previous bet/i));

        await waitFor(() => {
            expect(container).toHaveTextContent(
                [
                    forthVisibleMarketName,
                    ['CCM', '1.95', '', 'NUJ', '1.95'].join(''),
                    '0 shots for NUJ + CCM',

                    firstVisibleMarketName,
                    ['2+', '3.05', '', '0-1', '1.33'].join(''),
                    '0.9 CCM shots per 10 min',

                    thirdVisibleMarketName,
                    ['CCM', '1.85', '', 'NUJ', '1.85'].join(''),
                    '0 shots for NUJ + CCM',

                    'Previous betNext bet',
                ].join(''),
            );
        });
    });

    it('should disable next bet button when there is only 1 market available', async () => {
        const market = mockedSpeedBetMarketsAtom.markets[1];

        const { getByTestId } = renderWithAppWrapper(<SpeedBetCards />, undefined, undefined, (snap) =>
            snap.set(speedBetMarketsAtom, {
                markets: [market],
                ids: new Set([market.id]),
            }),
        );

        expect(getByTestId('nextBetButton')).toHaveStyleRule('pointer-events', 'none');
    });

    it('should disable previous bet button when there is only 1 market available', async () => {
        const market = mockedSpeedBetMarketsAtom.markets[1];

        const { getByTestId } = renderWithAppWrapper(<SpeedBetCards />, undefined, undefined, (snap) =>
            snap.set(speedBetMarketsAtom, {
                markets: [market],
                ids: new Set([market.id]),
            }),
        );

        expect(getByTestId('previousBetButton')).toHaveStyleRule('pointer-events', 'none');
    });

    it('should display selection odds price with 2 decimals', async () => {
        const market = mockedSpeedBetMarketsAtom.markets[1];

        const { container } = renderWithAppWrapper(<SpeedBetCards />, undefined, undefined, (snap) =>
            snap.set(speedBetMarketsAtom, {
                markets: [
                    {
                        ...market,
                        selections: {
                            ...market.selections,
                            '34746158': {
                                ...market.selections['34746158'],
                                price: {
                                    d: 2,
                                    f: '25/25',
                                },
                            },
                        },
                    },
                ],
                ids: new Set([market.id]),
            }),
        );

        expect(container).toHaveTextContent(
            [
                'CCM JUST TOOK THEIR FIRST SHOT IN 10 MINUTES! HOW MANY SHOTS WILL THEY TAKE BETWEEN 13:00 AND 22:59? ⚽️ (EXCLUDING BLOCKED SHOTS)',
                ['2+', '2.00', '', '0-1', '1.33'].join(''),
                '0.9 CCM shots per 10 min',

                'Previous betNext bet',
            ].join(''),
        );
    });
});
