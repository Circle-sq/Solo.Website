import { memo } from 'react';

import { BetStatus } from 'src/common/enums';
import {
    WonIcon,
    HalfWonIcon,
    LostIcon,
    HalfLostIcon,
    VoidIcon,
    CashedOutIcon,
    ResultIcon,
    BetOpenIcon,
} from 'src/assets/icons/betStatusIcon';

interface Props {
    status?: BetStatus;
    isMultiBet?: boolean;
}

const BetStatusIcon = ({ status, isMultiBet = false }: Props) => {
    switch (status) {
        case BetStatus.Won:
            return <WonIcon testId={status} />;

        case BetStatus.HalfWon:
            return <HalfWonIcon testId={status} />;

        case BetStatus.Lost:
            return <LostIcon testId={status} />;

        case BetStatus.HalfLost:
            return <HalfLostIcon testId={status} />;

        case BetStatus.Void:
            return <VoidIcon testId={status} />;

        case BetStatus.Cancelled:
            return <VoidIcon testId={status} />;

        case BetStatus.CashOut:
            return <CashedOutIcon testId={status} />;

        default:
            return isMultiBet ? <ResultIcon /> : <BetOpenIcon />;
    }
};

export default memo(BetStatusIcon);
