import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { ErrorResource, MinMaxErrorCode } from 'src/common/enums/error';

import type { BetError } from '../../api/types/error';
import MinMaxStakeError from '../MinMaxStakeError/MinMaxStakeError';

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
            };
        },
        default: vi.fn(),
    };
});

describe('MinMaxStakeError', () => {
    it('should render "BelowMinimum" error message from MinMaxStakeError', () => {
        const error: BetError = {
            resource: ErrorResource.Bet,
            code: MinMaxErrorCode.BelowMinimum,
            field: 'minLineStake',
            debugDetails: null,
            details: {
                minLineStake: 10000,
                minTotalStake: 0,
                minStakePerLine: 0,
            },
            pointer: '/selectedBets/0/bets/0',
            ignorePointer: null,
        };

        const expectedErrorMessages = 'Minimum stake {minTotalStake} {currency}';

        const { getByTestId } = renderWithAppWrapper(<MinMaxStakeError error={error} />);

        expect(getByTestId('validationMessage')).toHaveTextContent(expectedErrorMessages);
    });

    it('should render "TooHigh" error message from MinMaxStakeError', () => {
        const error: BetError = {
            resource: ErrorResource.Bet,
            code: MinMaxErrorCode.TooHigh,
            field: 'stakePerLine',
            debugDetails: null,
            details: {
                maxStakePerLine: 156250000,
                id: '11737',
            },
            pointer: '/selectedBets/0/valid-for-referral/11737',
            ignorePointer: null,
        };

        const expectedErrorMessages = 'Bet stake is above the max stake of {maxStakePerLine} {currency}';

        const { getByTestId } = renderWithAppWrapper(<MinMaxStakeError error={error} />);

        expect(getByTestId('validationMessage')).toHaveTextContent(expectedErrorMessages);
    });

    it('should render "MaxPayout" error message from MinMaxStakeError', () => {
        const error: BetError = {
            resource: ErrorResource.Bet,
            code: MinMaxErrorCode.MaxPayout,
            field: 'potentialPayout',
            debugDetails: null,
            details: {
                maxPayout: 1000000,
                id: '11737',
            },
            pointer: '/selectedBets/0/selection/11737',
            ignorePointer: null,
        };

        const expectedErrorMessages = 'Bet exceeds max payout';

        const { getByTestId } = renderWithAppWrapper(<MinMaxStakeError error={error} />);

        expect(getByTestId('validationMessage')).toHaveTextContent(expectedErrorMessages);
    });

    it('should not render any errors', () => {
        const error = undefined;

        const { queryByTestId } = renderWithAppWrapper(<MinMaxStakeError error={error} />);

        expect(queryByTestId('validationMessage')).not.toBeInTheDocument();
    });
});
