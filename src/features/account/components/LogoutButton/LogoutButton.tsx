import type { MouseEvent } from 'react';
import { useRecoilCallback } from 'recoil';

import { resetBetslipStateTransaction } from '@solo-betslip/store/transactions/betslip';

import { useAppStateContext } from 'src/appState/AppState';
import { I18n } from 'src/ui/common/Language/I18n';

import { signOut } from '../../actions';

import { S_LogoutBtnWrapper } from './styled';

const LogoutButton = () => {
    const { router } = useAppStateContext();

    const resetBetslipState = useRecoilCallback(({ transact_UNSTABLE: transact }) => () => {
        transact(resetBetslipStateTransaction);
    });

    const onClick = (e: MouseEvent) => {
        e.preventDefault();

        void signOut();
        resetBetslipState();

        router.redirect('homepage', { account: 'login' });
    };

    return (
        <S_LogoutBtnWrapper onClick={onClick} size='xs' testId='balanceTab-logout'>
            <I18n langKey='account.help-box.logout.label' defaultText='Log out' />
        </S_LogoutBtnWrapper>
    );
};

export default LogoutButton;
