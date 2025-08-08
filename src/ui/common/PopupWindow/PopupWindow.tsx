import type { MouseEvent, PropsWithChildren, ReactNode, LegacyRef } from 'react';
import { createRef } from 'react';

import { CloseIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { useOnClickOutside } from 'src/appState/customHooks';

import { IconButton, S_Overlay, S_Header, Title, Window } from './styled';

interface Props {
    transparent?: boolean;
    title: ReactNode;
    onCloseModal: (e?: MouseEvent) => void;
    className?: string;
}

const PopupWindow = (props: PropsWithChildren<Props>) => {
    const { title, onCloseModal, children, transparent = false, className } = props;
    const containerRef: LegacyRef<HTMLDivElement> = createRef();

    useOnClickOutside(containerRef, () => {
        onCloseModal();
    });

    return (
        <S_Overlay transparent={transparent}>
            <Window data-testid='popup' className={className} ref={containerRef}>
                <S_Header data-testid='popupHeader' className={className}>
                    <Title className={className}>{title}</Title>
                    <IconButton className={className} onClick={onCloseModal} data-testid='closePopup'>
                        <CloseIcon color={cssColor('--popup-header-close-color')} />
                    </IconButton>
                </S_Header>
                {children}
            </Window>
        </S_Overlay>
    );
};

export default PopupWindow;
