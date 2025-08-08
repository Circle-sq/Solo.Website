import { useWindowResize, useWindowWidth } from '@solo-hooks';
import classnames from 'classnames';
import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';

import { isAuthenticatedAtom } from '@solo-account/store/atoms';

import { IconPositionTypes } from 'src/common/enums';
import type { PopUpProps } from 'src/common/types/popup';
import { isStandalone } from 'src/infra.client';
import InfoAlert from 'src/ui/common/InfoAlert/InfoAlert';
import { I18n } from 'src/ui/common/Language/I18n';
import Modal from 'src/ui/common/Modal';
import MyBets from 'src/ui/myBets/MyBets';

import { Container } from './styled';

const MyBetsModal = ({ onClose }: PopUpProps) => {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const standalone = isStandalone();
    const { isDesktop } = useWindowWidth();

    useWindowResize(() => {
        if (isDesktop) {
            onClose();
        }
    });

    let modalContent = (
        <InfoAlert
            type='info'
            iconPosition={IconPositionTypes.TOP}
            header={<I18n langKey='betslip.login.title' defaultText='Please log in' />}
        >
            <I18n
                langKey='betslip.login.instruction'
                defaultText='To view your bets, you need to log in to your account.'
            />
        </InfoAlert>
    );

    if (isAuthenticated) {
        modalContent = <MyBets />;
    }

    return (
        <Modal
            isFullScreen
            className={classnames({ navigationStandalone: standalone, mybets: true })}
            onCloseModal={onClose}
            title={<I18n langKey='modal.mybets.header.label' defaultText='MY BETS' />}
            theme='grey'
        >
            <Container>{modalContent}</Container>
        </Modal>
    );
};

export default observer(MyBetsModal);
