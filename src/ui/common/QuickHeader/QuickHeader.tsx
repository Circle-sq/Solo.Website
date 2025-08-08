import { useWindowWidth } from '@solo-hooks';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useRecoilCallback } from 'recoil';

import BalancePopup from '@solo-account/components/BalanceTab/BalancePopup';
import { isAuthenticatedAtom } from '@solo-account/store/atoms';
import { freebetCreditsAtomWithQuery } from '@solo-account/store/queries';
import { currencySelector, playableBalanceSelector } from '@solo-account/store/selectors';
import { openLoginPopupTask } from '@solo-account/store/tasks';
import { useJotaiCallback } from '@solo-utils/jotai';

import { closeMyBetsAndQuickBetTask } from 'src/ui/betting/store/tasks';
import { I18n } from 'src/ui/common/Language/I18n';
import { formatAmountWithCurrency } from 'src/utils/format';
import isLocal from 'src/utils/isLocal';

import {
    S_FreeBetsBadge,
    S_FreeBetsLabelWrapper,
    S_IconUpDown,
    S_LinkName,
    S_UserBalanceLabel,
    S_UserBalanceWrapper,
    S_Wrapper,
} from './styled';

const QuickHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const playableBalance = useAtomValue(playableBalanceSelector);
    const currency = useAtomValue(currencySelector);
    const balance = formatAmountWithCurrency(playableBalance, currency);

    const { data: freebetCredits } = useAtomValue(freebetCreditsAtomWithQuery);

    const { isTablet } = useWindowWidth();

    const openLoginPopup = useJotaiCallback(openLoginPopupTask);
    const closeMyBetsAndQuickBet = useRecoilCallback(closeMyBetsAndQuickBetTask, []);

    const toggleBalance = () => {
        setIsOpen((prevState) => !prevState);
    };

    const onClickHandler = () => {
        if (!isTablet) {
            toggleBalance();
        }
    };

    if (!isAuthenticated) {
        return (
            <S_Wrapper>
                {isLocal() && (
                    <S_LinkName
                        onClick={(e) => {
                            e.preventDefault();

                            openLoginPopup();
                            closeMyBetsAndQuickBet();
                        }}
                        testId='loginLink'
                    >
                        <I18n langKey='account.login' defaultText='Login' />
                    </S_LinkName>
                )}
            </S_Wrapper>
        );
    }

    return (
        <S_Wrapper isAuthenticated>
            <S_LinkName onClick={onClickHandler}>
                <S_UserBalanceWrapper>
                    <S_UserBalanceLabel data-testid='userBalance'>{balance}</S_UserBalanceLabel>
                    {freebetCredits.totalAmount > 0 && (
                        <S_FreeBetsBadge>
                            <S_FreeBetsLabelWrapper>
                                <I18n langKey='betslip.free-bets.freebet-label' defaultText='Free bet!' />
                            </S_FreeBetsLabelWrapper>
                        </S_FreeBetsBadge>
                    )}
                </S_UserBalanceWrapper>

                {!isTablet && <S_IconUpDown name='arrow-down-fill' />}
            </S_LinkName>
            {isOpen && <BalancePopup onClose={toggleBalance} />}
        </S_Wrapper>
    );
};

export default QuickHeader;
