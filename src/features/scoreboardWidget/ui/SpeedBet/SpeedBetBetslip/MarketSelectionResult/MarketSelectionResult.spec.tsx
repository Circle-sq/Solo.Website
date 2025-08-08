import { render, screen } from '@testing-library/react';
import { useRecoilValue } from 'recoil';
import { vi } from 'vitest';

import usePriceChange from 'src/utils/hooks/usePriceChange';

import MarketSelectionResult from './MarketSelectionResult';
vi.mock('recoil', async (importOriginal) => {
    const actual: object = await importOriginal();

    return {
        ...actual,
        useRecoilValue: vi.fn(),
        useRecoilCallback: vi.fn().mockImplementation(() => vi.fn()),
    };
});
vi.mock('src/appState/AppState', () => ({
    useAppStateContext: () => {
        return {
            language: { getTranslation: (_key: string, defaultMessage: string) => defaultMessage },
        };
    },
}));
vi.mock('src/utils/hooks/usePriceChange', () => ({
    default: vi.fn(),
}));
vi.mock('@solo-features/subscription-manager/SubscribeElement', () => ({
    SubscribeElement: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
describe('MarketSelectionResult', () => {
    const selectedMarketMock = {
        market: {
            id: 18012,
            name: '1 FC MISSED A SHOT! WILL THE NEXT SHOT AFTER 4:00 MISS THE TARGET AS WELL?',
        },
        selection: {
            id: 56186,
            name: '예',
            price: {
                d: 1.79,
            },
        },
    };
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('renders MarketSelectionResult', () => {
        vi.mocked(useRecoilValue).mockReturnValue(selectedMarketMock);
        vi.mocked(usePriceChange).mockReturnValue({
            priceDirection: null,
        });
        render(<MarketSelectionResult />);
        expect(
            screen.getByText('1 FC MISSED A SHOT! WILL THE NEXT SHOT AFTER 4:00 MISS THE TARGET AS WELL?'),
        ).toBeInTheDocument();
        expect(screen.getByTestId('speedBetBetslipSelection')).toHaveTextContent('예');
        expect(screen.getByTestId('speedBetBetslipSelectionPrice')).toHaveTextContent('1.79');
    });
});
