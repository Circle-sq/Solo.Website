import { MinMaxErrorCode } from 'src/common/enums/error';

import type { BetError, MinMaxErrors } from '../../api/types/error';
import { isMaxStakePerLineErrorDetails, isMinStakeExceededErrorDetails } from '../../typeGuards/error';

export const minMaxErrors: MinMaxErrors = {
    [MinMaxErrorCode.BelowMinimum]: {
        key: MinMaxErrorCode.BelowMinimum,
        langKey: `${MinMaxErrorCode.BelowMinimum}.description`,
        defaultText: 'Minimum stake {minTotalStake} {currency}',
        getParams: ({ code, details, value }: BetError, currency: string) => {
            if (code === MinMaxErrorCode.BelowMinimum && isMinStakeExceededErrorDetails(details)) {
                const minTotalStake = details.minLineStake ?? details.minTotalStake;

                return { minTotalStake, currency: value ?? currency };
            }
        },
    },
    [MinMaxErrorCode.TooHigh]: {
        key: MinMaxErrorCode.TooHigh,
        langKey: `${MinMaxErrorCode.TooHigh}.description`,
        defaultText: 'Bet stake is above the max stake of {maxStakePerLine} {currency}',
        getParams: ({ code, details, value }: BetError, currency: string) => {
            if (code === MinMaxErrorCode.TooHigh && isMaxStakePerLineErrorDetails(details)) {
                const maxStakePerLine = details.maxStakePerLine;

                return { maxStakePerLine, currency: value ?? currency };
            }
        },
    },
    [MinMaxErrorCode.MaxPayout]: {
        key: MinMaxErrorCode.MaxPayout,
        langKey: `${MinMaxErrorCode.MaxPayout}.description`,
        defaultText: 'Bet exceeds max payout',
    },
};
