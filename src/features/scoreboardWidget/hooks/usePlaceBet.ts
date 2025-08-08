import { useMutationState, useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRecoilValue, useRecoilCallback, useSetRecoilState } from 'recoil';

import { userDataAtom } from '@solo-account/store/atoms';

import { MutationStatus } from 'src/common/enums/status';

import { AlertType } from '../enums';
import { placeBetApi } from '../services/api';
import { formatPlaceBetPayload } from '../services/utils';
import { speedBetStakeAtom, speedBetSelectedMarketAtom, previousSpeedBetStakeAtom } from '../store/atoms';
import {
    openSpeedBetAlertTask,
    moveFirstToLastSpeedMarketTask,
    setIsDisabledNumpadTask,
    resetSpeedBetMarketSelectionTask,
} from '../store/tasks';

const mutationKey = ['place-bet'];

const usePlaceBet = () => {
    const userData = useAtomValue(userDataAtom);
    const speedBetStake = useRecoilValue(speedBetStakeAtom);
    const selectedMarket = useRecoilValue(speedBetSelectedMarketAtom);

    const openSpeedBetAlert = useRecoilCallback(openSpeedBetAlertTask, []);
    const moveFirstToLastTask = useRecoilCallback(moveFirstToLastSpeedMarketTask, []);
    const setIsDisabledNumpad = useRecoilCallback(setIsDisabledNumpadTask, []);
    const resetSpeedBetMarketSelection = useRecoilCallback(resetSpeedBetMarketSelectionTask, []);

    const setPreviousSpeedBetStake = useSetRecoilState(previousSpeedBetStakeAtom);

    const onSuccess = useRecoilCallback(() => () => {
        setPreviousSpeedBetStake(speedBetStake);
        resetSpeedBetMarketSelection();
        openSpeedBetAlert(AlertType.BetSuccess);
        moveFirstToLastTask();
    });

    const onError = useRecoilCallback(() => () => {
        resetSpeedBetMarketSelection();
        openSpeedBetAlert(AlertType.BetError);
    });

    const onSettled = useRecoilCallback(() => () => {
        setIsDisabledNumpad(false);
    });

    const { mutate } = useMutation({
        mutationFn: placeBetApi,
        mutationKey,
        onSuccess,
        onError,
        onSettled,
    });

    const placeBetHandler = () => {
        if (selectedMarket !== null) {
            const payload = formatPlaceBetPayload(selectedMarket, speedBetStake, userData);

            if (payload) {
                mutate(payload);
            }
        }
    };

    const status = useMutationState({
        filters: { mutationKey },
        select: (mutation) => mutation.state.status,
    });

    const isPending = status[status.length - 1] === MutationStatus.Pending;

    return { placeBetHandler, isPending };
};

export default usePlaceBet;
