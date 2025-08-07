import isNil from 'lodash/isNil';
import type { MouseEvent } from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { BetStatus } from 'src/common/enums';
import { formatToFullDate } from 'src/common/helpers/date';
import type { TimeOut } from 'src/common/types/main';
import type { MyBet } from 'src/common/types/myBet';
import { I18n } from 'src/ui/common/Language/I18n';

import useMyBetState from '../hooks/useMyBetState';
import { recentlySettledBetIdAtom } from '../store/atoms';
import { isSettledTabSelector } from '../store/selectors';

import BetId from './BetId/BetId';
import BetItemContent from './BetItemContent/BetItemContent';
import BottomDetails from './BottomDetails/BottomDetails';
import { S_BetBottomRow } from './BottomDetails/styled';
import CashOutButton from './CashOutActionButton/CashOutActionButton';
import CashOutErrors from './CashOutErrors/CashOutErrors';
import { S_MyBetItem, S_SettledBetTime } from './styled';

const CONFIRM_TIMEOUT = 3000;
const REMOVE_TIMEOUT = 4000;
const REMOVE_ERRORS_TIMEOUT = 6000;

interface Props {
    bet: MyBet;
    queryStatus?: BetStatus | BetStatus[];
    clearCashOutedBet: (betId: string, errorOnly?: boolean) => void;
    retrieveBetCashOut: (bet: MyBet, value: number) => void;
    isFetching: boolean;
    isSuccess: boolean;
}

const MyBetItem = ({ bet, queryStatus, clearCashOutedBet, retrieveBetCashOut, isFetching, isSuccess }: Props) => {
    const { betId, cashout, cashOut: isCashedOut, placedAt, settledAt, errors, displayDate = true } = bet;

    const timeout = useRef<TimeOut | null>(null);
    const isSettledTab = useRecoilValue(isSettledTabSelector);

    const resetSettledBetId = useResetRecoilState(recentlySettledBetIdAtom);

    const [isConfirmed, setIsConfirmed] = useState(false);

    const {
        cashOutAmount,
        isCashOutFulfilled,
        isCancelledBet,
        isSettledBet,
        hasCashOut,
        hasErrors,
        hasFreeBetCredits,
    } = useMyBetState(bet, isSuccess);

    const isSettledOrCancelledBet = isSettledBet || isCancelledBet;

    const showErrors = hasErrors && !isCashOutFulfilled;
    const showCashOutButton =
        isCashOutFulfilled || (!isSettledTab && !isNil(cashout) && !isCashedOut && !hasFreeBetCredits);

    useEffect(() => {
        if (hasCashOut) {
            timeout.current = setTimeout(() => {
                clearCashOutedBet(betId);
                resetSettledBetId();
            }, REMOVE_TIMEOUT);
        }
    }, [betId, hasCashOut]);

    useEffect(() => {
        if (hasErrors) {
            timeout.current = setTimeout(() => {
                clearCashOutedBet(betId, true);
            }, REMOVE_ERRORS_TIMEOUT);
        }
    }, [errors, hasErrors]);

    useEffect(() => {
        return () => {
            if (timeout.current !== null) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    const onCashOutBet = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (isConfirmed && !isFetching && !isCashedOut) {
            setIsConfirmed(false);

            if (hasErrors) {
                clearCashOutedBet(betId, true);
            }

            retrieveBetCashOut(bet, cashOutAmount);
        } else {
            setIsConfirmed(true);

            timeout.current = setTimeout(() => {
                setIsConfirmed(false);
            }, CONFIRM_TIMEOUT);
        }
    };

    return (
        <S_MyBetItem data-testid={`betId-${betId}`}>
            {isSettledOrCancelledBet && displayDate && (
                <S_SettledBetTime>{formatToFullDate(settledAt)}</S_SettledBetTime>
            )}

            <BetItemContent bet={bet} />

            <BottomDetails
                bet={bet}
                isSettledOrCancelledBet={isSettledOrCancelledBet}
                hasFreeBetCredits={hasFreeBetCredits}
            />

            {showCashOutButton && (
                <CashOutButton bet={bet} onCashOutBet={onCashOutBet} isConfirmed={isConfirmed} isSuccess={isSuccess} />
            )}

            {showErrors && <CashOutErrors errors={errors} />}

            <BetId id={betId} updatedAt={isSettledTab ? settledAt : placedAt} />

            {queryStatus === BetStatus.Settled && isCashedOut && (
                <S_BetBottomRow>
                    <span className='cashed-out'>
                        <I18n langKey='bets.selection.cashed-out-already.label' defaultText='Cashed out' />
                    </span>
                </S_BetBottomRow>
            )}
        </S_MyBetItem>
    );
};

export default memo(MyBetItem);
