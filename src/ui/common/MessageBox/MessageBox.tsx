import type { SyntheticEvent } from 'react';

import { I18n } from 'src/ui/common/Language/I18n';
import Popup from 'src/ui/common/Popup/Popup';

import { S_AcceptButton } from './styled';

interface Props {
    title: string;
    message: string;
    onClose: () => void;
}

const MessageBox = (props: Props) => {
    const { title, message, onClose } = props;

    const close = (e?: SyntheticEvent) => {
        if (e) {
            e.preventDefault();
        }

        if (onClose) {
            onClose();
        }
    };

    return (
        <Popup
            title={title}
            className='message-box'
            priority={10100}
            overlayClose
            active
            onClose={close}
            maxWidth='300px'
        >
            {message}
            <S_AcceptButton type='button' onClick={close} size='medium'>
                <I18n langKey='common.message-box.ok.label' defaultText='OK' />
            </S_AcceptButton>
        </Popup>
    );
};

export default MessageBox;
