import type { ReactNode } from 'react';

import type { BetError } from '@solo-betslip/api/types/error';

import { moneyAccountSymbolBeforeValue } from 'src/utils/format';

import { ErrorSecondaryIcon, InfoIcon, SuccessIcon } from '../../../../assets/icons';
import { AlertType, MinMaxErrorCode, AlertVariant } from '../../../../enums';

interface AlertMessage {
    variant: AlertVariant;
    label: {
        langKey: string;
        defaultText: string;
    };
    message: {
        langKey: string;
        defaultText: string;
    };
    icon: ReactNode;
    getParams?: (problem: BetError, currency?: string) => Record<string, string | number> | undefined;
}

type AlertMessages = {
    [key in AlertType]: AlertMessage;
};

export const alertMessages: AlertMessages = {
    [AlertType.BetSuccess]: {
        variant: AlertVariant.Success,
        label: {
            langKey: 'speedBet.alert.done',
            defaultText: 'Done!',
        },
        message: {
            langKey: 'speedBet.alert.successfullyPlaced',
            defaultText: 'Your bet has been successfully placed',
        },
        icon: <SuccessIcon />,
    },
    [AlertType.BetError]: {
        variant: AlertVariant.Error,
        label: {
            langKey: 'speedBet.alert.cantAccept',
            defaultText: 'Sorry, we can’t accept your bet at this time',
        },
        message: {
            langKey: 'speedBet.alert.tryAgain',
            defaultText: 'Please review our other exciting markets and try again!',
        },
        icon: <ErrorSecondaryIcon />,
    },
    [AlertType.BetInfo]: {
        variant: AlertVariant.Info,
        label: {
            langKey: 'speedBet.alert.betNotAvailable',
            defaultText: 'The bet is no longer available',
        },
        message: {
            langKey: 'speedBet.alert.betExpired',
            defaultText: 'The bet you were placing has expired. Please choose another one to proceed.',
        },
        icon: <InfoIcon />,
    },
    [AlertType.MarketSuspension]: {
        variant: AlertVariant.Error,
        label: {
            langKey: 'speedBet.alert.marketSuspension.label',
            defaultText: 'The market is no longer available',
        },
        message: {
            langKey: 'speedBet.alert.marketSuspension.message',
            defaultText: 'Please review our other exciting markets and try again!',
        },
        icon: <ErrorSecondaryIcon />,
    },
    [AlertType.BetUpdated]: {
        variant: AlertVariant.Info,
        label: {
            langKey: 'speedBet.alert.betUpdated.label',
            defaultText: 'Your bet has been updated',
        },
        message: {
            langKey: 'speedBet.alert.betUpdated.message',
            defaultText: 'Please review the changes and confirm if you want to proceed',
        },
        icon: <InfoIcon />,
    },
    [AlertType.BalanceWarning]: {
        variant: AlertVariant.Error,
        label: {
            langKey: 'speedBet.alert.insufficientFunds',
            defaultText: 'Insufficient funds',
        },
        message: {
            langKey: 'betslip.balance-warning.description',
            defaultText: 'To place your bet you need {amount} {Currency} more',
        },
        icon: <ErrorSecondaryIcon />,
        getParams: (problem: BetError, currency?: string) => {
            if (problem.details && 'requiredAmount' in problem.details && 'currentAmount' in problem.details) {
                const { requiredAmount, currentAmount } = problem.details;

                const insufficientAmount = requiredAmount - currentAmount;

                const formatedAmount = moneyAccountSymbolBeforeValue(insufficientAmount, currency || '', ',');

                return { amount: formatedAmount };
            }

            return undefined;
        },
    },
    [AlertType.Default]: {
        variant: AlertVariant.Info,
        label: {
            langKey: 'speedBet.alert.default',
            defaultText: 'Default label',
        },
        message: {
            langKey: 'speedBet.alert.defaultText',
            defaultText: 'Default text.',
        },
        icon: <InfoIcon />,
    },
};

export const minMaxErrors = {
    [MinMaxErrorCode.BelowMinimum]: {
        variant: AlertVariant.Error,
        label: {
            langKey: 'speedBet.alert.cantAccept',
            defaultText: 'Sorry, we can’t accept your bet at this time',
        },
        message: {
            langKey: `${MinMaxErrorCode.BelowMinimum}.description`,
            defaultText: 'Minimum stake {minStake} {currency}',
        },
        getParams: (problem: BetError, currency?: string) => {
            if (problem.details && 'minLineStake' in problem.details) {
                const { minLineStake } = problem.details;

                return { minStake: minLineStake ?? 0, currency: currency || 'GBP' };
            }

            return undefined;
        },
    },
    [MinMaxErrorCode.TooHigh]: {
        variant: AlertVariant.Error,
        label: {
            langKey: 'speedBet.alert.cantAccept',
            defaultText: 'Sorry, we can’t accept your bet at this time',
        },
        message: {
            langKey: `${MinMaxErrorCode.TooHigh}.description`,
            defaultText: 'Bet stake is above the max stake of {maxStake} {currency}',
        },
        getParams: (problem: BetError, currency?: string) => {
            if (problem.details && 'maxStakePerLine' in problem.details) {
                const { maxStakePerLine } = problem.details;

                return { maxStake: maxStakePerLine ?? 0, currency: currency || 'GBP' };
            }

            return undefined;
        },
    },
    [MinMaxErrorCode.MaxPayout]: {
        variant: AlertVariant.Error,
        label: {
            langKey: 'speedBet.alert.cantAccept',
            defaultText: 'Sorry, we can’t accept your bet at this time',
        },
        message: {
            langKey: `${MinMaxErrorCode.MaxPayout}.description`,
            defaultText: 'Bet exceeds max payout',
        },
        getParams: () => undefined,
    },
};
