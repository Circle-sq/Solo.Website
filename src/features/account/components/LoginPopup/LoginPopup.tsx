import Fade from '@mui/material/Fade';
import { useWindowWidth } from '@sc-hooks';
import { useAtomValue } from 'jotai';

import { useJotaiCallback } from '@sc-utils/jotai';

import { showLoginPopupAtom } from '../../store/atoms';
import { closeLoginPopupTask } from '../../store/tasks';
import LoginForm from '../LoginForm/LoginForm';

import LoginPopupHeader from './LoginPopupHeader/LoginPopupHeader';
import { BaseModal, S_Backdrop, S_LoginPopupContent } from './styled';

const LoginPopup = () => {
    const { isTabletSmall } = useWindowWidth();

    const showLoginPopup = useAtomValue(showLoginPopupAtom);
    const closeLoginPopup = useJotaiCallback(closeLoginPopupTask);

    return (
        <BaseModal
            open={showLoginPopup}
            onClose={closeLoginPopup}
            slots={{ backdrop: S_Backdrop }}
            closeAfterTransition
        >
            <Fade in={showLoginPopup}>
                <S_LoginPopupContent>
                    {!isTabletSmall && <LoginPopupHeader />}
                    <LoginForm />
                </S_LoginPopupContent>
            </Fade>
        </BaseModal>
    );
};

export default LoginPopup;
