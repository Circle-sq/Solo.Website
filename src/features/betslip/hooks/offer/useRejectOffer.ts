import { useMutation } from '@tanstack/react-query';

import { rejectOfferApi } from '../../api/referralBet/services';

import useClearOffer from './useClearOffer';

const useRejectOffer = () => {
    const { clearOffer } = useClearOffer();

    const { mutate: rejectOfferMutation } = useMutation({
        mutationFn: rejectOfferApi,
        onSuccess: clearOffer,
    });

    return { rejectOfferMutation };
};

export default useRejectOffer;
