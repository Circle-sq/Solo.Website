import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { useJotaiCallback } from '@sc-utils/jotai';

import {
    cashoutAcceptModeSelector,
    crossInfoDismissSelector,
    oddsFormatSelector,
    oddsUpdateSelector,
} from '../store/selectors';
import { updateAccountUserTask } from '../store/tasks';

import { UserService } from './services';

export const useChangeBetslipSettings = () => {
    const oddsUpdate = useAtomValue(oddsUpdateSelector);
    const cashoutAcceptMode = useAtomValue(cashoutAcceptModeSelector);
    const updateAccountUser = useJotaiCallback(updateAccountUserTask);

    return useMutation({
        mutationFn: UserService.changeBetslipSettings,
        onMutate: (variables) => {
            const previousCashoutAcceptMode = cashoutAcceptMode;
            const previousOddsUpdate = oddsUpdate;

            updateAccountUser(variables);

            return { previousCashoutAcceptMode, previousOddsUpdate };
        },
        onError: (_, __, context) => {
            if (context !== undefined) {
                updateAccountUser({
                    cashoutAcceptMode: context.previousCashoutAcceptMode,
                    oddsUpdate: context.previousOddsUpdate,
                });
            }
        },
    });
};

export const useChangeCrossInfoDismiss = () => {
    const crossInfoDismiss = useAtomValue(crossInfoDismissSelector);
    const updateAccountUser = useJotaiCallback(updateAccountUserTask);

    return useMutation({
        mutationFn: UserService.changeCrossInfoDismiss,
        onMutate: (variables) => {
            const previousCrossInfoDismiss = crossInfoDismiss;

            updateAccountUser({ crossInfoDismiss: variables });

            return { previousCrossInfoDismiss };
        },
        onError: (_, __, context) => {
            if (context !== undefined) {
                updateAccountUser({ crossInfoDismiss: context.previousCrossInfoDismiss });
            }
        },
    });
};

export const useChangeOddsFormat = () => {
    const oddsFormat = useAtomValue(oddsFormatSelector);
    const updateAccountUser = useJotaiCallback(updateAccountUserTask);

    return useMutation({
        mutationFn: UserService.changeOddsFormat,
        onMutate: (variables) => {
            const previousOddsFormat = oddsFormat;

            updateAccountUser({ oddsFormat: variables });

            return { previousOddsFormat };
        },
        onError: (_, __, context) => {
            if (context !== undefined) {
                updateAccountUser({ oddsFormat: context.previousOddsFormat });
            }
        },
    });
};
