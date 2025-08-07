import { memo } from 'react';

import { BetStatus } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';

import { S_CancelledBetStatus, S_CashOutBetStatus, S_LostBetStatus, S_WonBetStatus } from './styled';

const SelectionStatus = ({ status }: { status: BetStatus }) => {
    switch (status) {
        case BetStatus.Cancelled:
        // falls through

        case BetStatus.Push:
        // falls through

        case BetStatus.Void:
            return (
                <S_CancelledBetStatus data-testid={`${status}BetStatus`}>
                    <I18n langKey={`bets.selection.${status}.label`} defaultText={status} />
                </S_CancelledBetStatus>
            );

        case BetStatus.Won:
            return (
                <S_WonBetStatus data-testid='wonBetStatus'>
                    <I18n langKey='bets.selection.won.label' defaultText='won' />
                </S_WonBetStatus>
            );

        case BetStatus.HalfWon:
            return (
                <S_WonBetStatus data-testid='halfWonBetStatus'>
                    <I18n langKey='bets.selection.halfwon.label' defaultText='half won' />
                </S_WonBetStatus>
            );

        case BetStatus.CashOut:
            return (
                <S_CashOutBetStatus data-testid='cashedOut'>
                    <I18n langKey='bets.selection.cashedout.label' defaultText='cashed out' />
                </S_CashOutBetStatus>
            );

        case BetStatus.Lost:
            return (
                <S_LostBetStatus data-testid='lostBetStatus'>
                    <I18n langKey='bets.selection.lost.label' defaultText='lost' />
                </S_LostBetStatus>
            );

        case BetStatus.HalfLost:
            return (
                <S_LostBetStatus data-testid='halfLostBetStatus' isHalfLost>
                    <I18n langKey='bets.selection.halflost.label' defaultText='half lost' />
                </S_LostBetStatus>
            );

        default:
            return null;
    }
};

export default memo(SelectionStatus);
