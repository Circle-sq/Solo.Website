import { CloseIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';
import { useJotaiCallback } from '@sc-utils/jotai';

import { I18n } from 'src/ui/common/Language/I18n';

import { closeLoginPopupTask } from '../../../store/tasks';
import { CloseIconWrapperLink, S_LoginPopupHeader, S_LoginPopupTitle } from '../styled';

const LoginPopupHeader = () => {
    const closeLoginPopup = useJotaiCallback(closeLoginPopupTask);

    return (
        <S_LoginPopupHeader>
            <S_LoginPopupTitle>
                <I18n langKey='account.tabs.login.title' defaultText='Login' />
            </S_LoginPopupTitle>

            <CloseIconWrapperLink onClick={closeLoginPopup}>
                <CloseIcon color={cssColor('--icon-generic-color')} key='close-icon' />
            </CloseIconWrapperLink>
        </S_LoginPopupHeader>
    );
};

export default LoginPopupHeader;
