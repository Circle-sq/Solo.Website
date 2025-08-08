import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { userDataAtom } from '@solo-account/store/atoms';
import type { PossibleBetApiResponse } from '@solo-betslip/api/types';

import { possibleBetsApi } from '../services/api';
import { formatPossibleBetsPayload } from '../services/utils';
import {
    isPossibleBetsLoadingAtom,
    possibleBetsAtom,
    speedBetBetslipErrorListAtom,
    speedBetSelectedMarketAtom,
    speedBetStakeAtom,
} from '../store/atoms';
import type { PossibleBetPayload } from '../types';

const usePossibleBets = () => {
    const userData = useAtomValue(userDataAtom);
    const speedBetStake = useRecoilValue(speedBetStakeAtom);
    const selectedMarket = useRecoilValue(speedBetSelectedMarketAtom);

    const onMutate = useRecoilCallback(({ set }) => () => {
        set(isPossibleBetsLoadingAtom, true);
    });

    const onSuccess = useRecoilCallback(({ set }) => (data: PossibleBetApiResponse) => {
        if (data) {
            set(possibleBetsAtom, data);

            if (data?.originalResponse?.selectedBetsProblems.length > 0) {
                set(speedBetBetslipErrorListAtom, data?.originalResponse?.selectedBetsProblems);
            } else {
                set(speedBetBetslipErrorListAtom, []);
            }
        }
    });

    const onSettled = useRecoilCallback(({ set }) => () => {
        set(isPossibleBetsLoadingAtom, false);
    });

    const { mutate, data } = useMutation<PossibleBetApiResponse, Error, PossibleBetPayload>({
        mutationFn: possibleBetsApi,
        onMutate,
        onSuccess,
        onSettled,
    });

    useEffect(() => {
        if (selectedMarket !== null) {
            const payload = formatPossibleBetsPayload(selectedMarket, speedBetStake, userData);

            if (payload) {
                mutate(payload);
            }
        }
    }, [mutate, selectedMarket, speedBetStake, userData]);

    return data;
};

export default usePossibleBets;
