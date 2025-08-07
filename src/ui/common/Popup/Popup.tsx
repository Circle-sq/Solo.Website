import { type ReactNode, type MouseEvent, useEffect, useState } from 'react';

import { CloseIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { S_PopupContent, S_PopupBody, S_PopupTitle, S_PopupClose, S_PopupOverlay } from './styled';

interface Props {
    className?: string;
    active: boolean;
    onClose?: () => void;
    icon?: ReactNode;
    title: string;
    closeButton?: boolean;
    maxWidth?: string;
    priority: number;
    overlayClose: boolean;
    children: ReactNode;
}

const ignoreClick = (e: MouseEvent) => {
    e.stopPropagation();
};

const Popup = (props: Props) => {
    const {
        className,
        active = true,
        onClose,
        icon,
        title,
        closeButton = true,
        maxWidth,
        priority = 0,
        overlayClose = false,
        children,
    } = props;
    const [isPopupActive, setIsPopupActive] = useState(active);

    // Use useEffect to handle prop changes and update state
    useEffect(() => {
        setIsPopupActive(active);
    }, [active]);

    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (onClose) {
            onClose();
        }

        setIsPopupActive(false);
    };

    const zIndex = 10000 + priority;

    const onOverlayClick = overlayClose ? handleClose : undefined;

    let titleEl;

    if (title) {
        let closeButtonEl;

        if (closeButton) {
            closeButtonEl = (
                <S_PopupClose onClick={handleClose} className='popup-close'>
                    <CloseIcon color={cssColor('--icon-generic-color')} />
                </S_PopupClose>
            );
        }

        titleEl = (
            <S_PopupTitle>
                {icon}
                {title}
                {closeButtonEl}
            </S_PopupTitle>
        );
    }

    return (
        <S_PopupOverlay active={isPopupActive} className={className} style={{ zIndex }} onClick={onOverlayClick}>
            <S_PopupContent data-testid='popupContent' onClick={ignoreClick} maxWidth={maxWidth}>
                {titleEl}
                <S_PopupBody>{children}</S_PopupBody>
            </S_PopupContent>
        </S_PopupOverlay>
    );
};

export default Popup;
