import { BetslipErrorCode } from 'src/common/enums/error';

import type { OfferErrors } from '../../api/types/error';

export const offerErrors: OfferErrors = {
    [BetslipErrorCode.OfferRejectedByCustomer]: {
        key: BetslipErrorCode.OfferRejectedByCustomer,
        type: 'error',
        langKey: 'betslip.offer.user-rejected',
        defaultText: "You rejected the trader's offer.",
    },
    [BetslipErrorCode.OfferRejectedByTrader]: {
        key: BetslipErrorCode.OfferRejectedByTrader,
        type: 'error',
        langKey: 'betslip.offer.trader-rejected',
        defaultText: 'Your bet has been rejected by the trader.',
    },
    [BetslipErrorCode.OfferReferredToTrader]: {
        key: BetslipErrorCode.OfferReferredToTrader,
        type: 'warning',
        langKey: 'betslip.referred-to-trader-message',
        defaultText: 'Your bet has been referred to a trader. Please wait as we review it.',
    },
};
