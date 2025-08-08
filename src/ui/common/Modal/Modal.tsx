import classnames from 'classnames';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

import { CloseIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { S_BaseOverlay } from 'src/ui/common/Backdrop/styled';
import CustomScrollbar from 'src/ui/common/CustomScrollbar';

import { S_Content, S_Footer, S_Header, S_IconButton, S_ScrolledContent, S_Title, S_Window } from './styled';
import type { Theme } from './types';

interface Props {
    isFullScreen?: boolean;
    footer?: ReactNode;
    title?: ReactNode;
    theme?: Theme;
    onCloseModal: () => void;
    disabledScroll?: boolean;
    className?: string;
    children: ReactNode;
}

const Modal = ({
    footer,
    title,
    onCloseModal,
    children,
    isFullScreen = false,
    theme = 'dark',
    disabledScroll,
    className,
}: Props) => {
    const Frame = isFullScreen ? Fragment : S_BaseOverlay;

    return (
        <Frame>
            <S_Window isFullScreen={isFullScreen} className={classnames(className)}>
                <S_Header styleTheme={theme}>
                    {title !== undefined ? <S_Title>{title}</S_Title> : null}
                    <S_IconButton onClick={onCloseModal}>
                        <CloseIcon color={cssColor('--icon-generic-color')} />
                    </S_IconButton>
                </S_Header>
                {!disabledScroll ? (
                    <S_Content styleTheme={theme} className={classnames(className)}>
                        <CustomScrollbar>
                            <S_ScrolledContent>{children}</S_ScrolledContent>
                        </CustomScrollbar>
                    </S_Content>
                ) : (
                    children
                )}
                {footer !== undefined ? <S_Footer>{footer}</S_Footer> : null}
            </S_Window>
        </Frame>
    );
};

export default Modal;
