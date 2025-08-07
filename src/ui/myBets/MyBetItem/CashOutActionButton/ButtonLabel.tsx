import type { MyBet } from 'src/common/types/myBet';
import { I18n } from 'src/ui/common/Language/I18n';
import useMyBetState from 'src/ui/myBets/hooks/useMyBetState';

const ButtonLabel = ({ bet, isConfirmed, isSuccess }: { bet: MyBet; isConfirmed: boolean; isSuccess: boolean }) => {
    const { isCancelableBet, isCashOutLocked, isCashOutInProgress, isCashOutFulfilled } = useMyBetState(bet, isSuccess);

    const isCancelingBetConfirmed = isCancelableBet && isConfirmed;
    const isCancelingBetInProgress = isCancelableBet && isCashOutInProgress;
    const isCancelingBetCompleted = isCancelableBet && isCashOutFulfilled;
    const isSettledSuccessful = !isCancelableBet && isCashOutFulfilled;

    switch (true) {
        case isCancelingBetCompleted:
            return <I18n langKey='bets.selection.cancel-bet-successful.label' defaultText='Cancel bet completed' />;

        case isSettledSuccessful:
            return <I18n langKey='bets.selection.cash-out-successful.label' defaultText='Cash Out Successful!' />;

        case isCancelingBetConfirmed:
            return <I18n langKey='bets.selection.button.canceling-confirm' defaultText='Confirm canceling bet' />;

        case isConfirmed:
            return <I18n langKey='bets.selection.button.cash-out-confirm' defaultText='Confirm cash out' />;

        case isCashOutLocked:
            return <I18n langKey='bets.selection.button.cash-out-locked' defaultText='Cash out locked' />;

        case isCancelingBetInProgress:
            return <I18n langKey='bets.selection.button.cancel-bet.inprogress' defaultText='Processing cancel bet' />;

        case isCashOutInProgress:
            return <I18n langKey='bets.selection.button.cash-out.inprogress' defaultText='Processing cashout' />;

        case isCancelableBet:
            return <I18n langKey='bets.selection.button.cash-out.cancel-bet' defaultText='Cancel bet' />;

        default:
            return <I18n langKey='bets.selection.button.cash-out' defaultText='Cash out' />;
    }
};

export default ButtonLabel;
