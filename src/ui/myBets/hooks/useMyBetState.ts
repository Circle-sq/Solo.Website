import get from 'lodash/get';
import has from 'lodash/has';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import { BetStatus, RequestStatus } from 'src/common/enums';
import type { MyBet } from 'src/common/types/myBet';
import { hasCashoutEnabled } from 'src/config/features_flags';

const useMyBetState = (bet: MyBet, isSuccess: boolean) => {
    const { active, cashout, cashOut: isCashedOut, totalStake, transaction, status: betStatus, errors } = bet;

    const cashOutAmount = get(cashout, 'value');
    const isCashOutEnabled = get(cashout, 'enabled', false);
    const isPanicModeEnabled = has(errors, 'errors.cashoutPanicMode');
    const isSettledBet = betStatus === BetStatus.Settled;
    const isCancelledBet = betStatus === BetStatus.Cancelled;

    const hasErrors = !isEmpty(errors);
    const hasFreeBetCredits = !isEmpty(transaction?.tags.freebetCredits);
    const hasCashOut = !isNil(cashout) && isCashedOut;

    const isCancelableBet = totalStake === cashOutAmount;
    const isCashOutLocked = !hasCashoutEnabled() || active === false || !isCashOutEnabled || isPanicModeEnabled;
    const isCashOutInProgress = bet._state === RequestStatus.InProgress;
    const isCashOutFulfilled = hasCashOut && isCashedOut && isSuccess;

    const isDisabled = isCashOutLocked || isCashOutInProgress || isCashedOut || cashOutAmount === 0;

    return {
        cashOutAmount,
        isDisabled,
        isCancelledBet,
        isSettledBet,
        isCancelableBet,
        isCashOutLocked,
        isCashOutInProgress,
        isCashOutFulfilled,
        hasFreeBetCredits,
        hasCashOut,
        hasErrors,
    };
};

export default useMyBetState;
