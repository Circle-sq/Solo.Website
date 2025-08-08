import { useRecoilCallback } from 'recoil';

import { openLoginPopupTask } from '@solo-account/store/tasks';
import { useJotaiCallback } from '@solo-utils/jotai';

import { isStandalone } from 'src/infra.client';
import { closeMyBetsAndQuickBetTask } from 'src/ui/betting/store/tasks';
import { I18n } from 'src/ui/common/Language/I18n';
import { relogin } from 'src/utils/portal-commands';

import { S_LoginButton } from '../styled';

export const LoginButton = () => {
    const openLoginPopup = useJotaiCallback(openLoginPopupTask);
    const closeMyBetsAndQuickBet = useRecoilCallback(closeMyBetsAndQuickBetTask, []);

    if (isStandalone()) {
        return (
            <S_LoginButton size='large' onClick={relogin}>
                <I18n langKey='betslip.login-button' defaultText='Login to bet' />
            </S_LoginButton>
        );
    }

    return (
        <S_LoginButton
            size='large'
            onClick={(e) => {
                e.preventDefault();

                openLoginPopup();
                closeMyBetsAndQuickBet();
            }}
        >
            <I18n langKey='betslip.login-button' defaultText='Login to bet (dev)' />
        </S_LoginButton>
    );
};

export default LoginButton;
