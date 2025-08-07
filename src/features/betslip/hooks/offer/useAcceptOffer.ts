import { useMutation } from '@tanstack/react-query';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import { useRecoilCallback } from 'recoil';

import { MutationStatus } from 'src/common/enums/status';

import { acceptOfferApi } from '../../api/referralBet/services';
import type { MutationError } from '../../api/types';
import type { PlacedBet } from '../../api/types/placedBet';
import { betslipErrorsAtom, placeBetStatusAtom } from '../../store/atoms/betslip';
import { resetStandardBetsPriceWhileOfferTransaction } from '../../store/transactions/offer';

const useAcceptOffer = () => {
    const onMutate = useRecoilCallback(
        ({ set }) =>
            () => {
                set(placeBetStatusAtom, MutationStatus.Loading);
            },
        [],
    );

    const onSuccess = useRecoilCallback(
        ({ set, transact_UNSTABLE: transact }) =>
            (data?: { bets: PlacedBet[] }) => {
                set(placeBetStatusAtom, MutationStatus.Success);

                if (!isUndefined(data)) {
                    transact(resetStandardBetsPriceWhileOfferTransaction(data.bets));
                }
            },
        [],
    );

    const onError = useRecoilCallback(
        ({ set }) =>
            ({ body, message }: MutationError) => {
                const { errors } = body ?? message;

                const acceptErrors = isArray(errors) ? errors : [errors];
                set(betslipErrorsAtom, acceptErrors);
                set(placeBetStatusAtom, MutationStatus.Error);
            },
        [],
    );

    const { mutate: acceptOfferMutation, isPending: isAcceptOfferLoading } = useMutation({
        mutationFn: acceptOfferApi,
        onMutate,
        onSuccess,
        onError,
    });

    return { acceptOfferMutation, isAcceptOfferLoading };
};

export default useAcceptOffer;
