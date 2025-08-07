import { format } from 'date-fns';
import { useState } from 'react';

import BellIcon from 'src/assets/icons/BellIcon';
import { I18n } from 'src/ui/common/Language/I18n';
import { DATE_FORMAT } from 'src/utils/constants';
import useTimer, { TimerStatus } from 'src/utils/hooks/useTimer';

import BetIdCopy from './BetIdCopy';
import {
    S_BetIdContainer,
    S_BetIdContent,
    S_BetIdContentContainer,
    S_BetIdContentLabel,
    S_BetTime,
    S_CopiedBox,
} from './styled';

const BetId = ({ id, updatedAt }: { id: string; updatedAt: string }) => {
    const copyTextTimeout = 3000;

    const [isCopied, setIsCopied] = useState(false);

    const { start, status } = useTimer({
        endTime: copyTextTimeout,
        interval: copyTextTimeout,
        step: copyTextTimeout,
        onTimeOver: () => {
            setIsCopied(false);
        },
    });

    const setCopiedLabelActive = () => {
        setIsCopied(true);

        if (status === TimerStatus.Stopped) {
            start();
        }
    };

    return (
        <S_BetIdContainer>
            <S_BetIdContent>
                <S_BetIdContentContainer>
                    <S_BetIdContentLabel data-testid='betId'>
                        <BetIdCopy setCopiedLabelActive={setCopiedLabelActive} betId={id} />
                        <I18n langKey='bets.selection.betslipid.label' defaultText='Betslip ID:' />
                        &nbsp;
                        {isCopied ? (
                            <S_CopiedBox data-testid='copiedIdMessage'>
                                <BellIcon />
                                <span>
                                    <I18n langKey='bets.selection.clipboard-copy' defaultText='Betslip ID Copied!' />
                                </span>
                            </S_CopiedBox>
                        ) : (
                            id
                        )}
                    </S_BetIdContentLabel>
                </S_BetIdContentContainer>
                <S_BetTime data-testid='betTime'>
                    {format(new Date(updatedAt), DATE_FORMAT.NUMERIC_FULL_DATE_TIME_W_SEPARATOR)}
                </S_BetTime>
            </S_BetIdContent>
        </S_BetIdContainer>
    );
};

export default BetId;
