import styled from '@emotion/styled';
import { Modal } from '@mui/base/Modal';
import type { MouseEvent, Ref } from 'react';
import { forwardRef } from 'react';

import { cssColor } from '@sc-ui/system';

interface BackdropProps {
    'aria-hidden': boolean;
    className: string;
    open: boolean;
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
    ownerState: unknown;
}

const Backdrop = forwardRef((props: Partial<BackdropProps>, ref: Ref<HTMLDivElement>) => {
    const { open, className, ownerState, ...other } = props;

    return <div className={`${open ? 'MuiBackdrop-open' : ''} ${className}`} ref={ref} {...other} />;
});
Backdrop.displayName = 'Backdrop';

export const S_ModalContainer = styled('div')``;

export const S_Modal = styled(Modal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const S_ModalContent = styled('div')`
    max-width: 500px;
    max-height: 500px;
    box-shadow: 0 0 27px 9px #ffffff26;
    display: flex;
    position: relative;
    margin: 0 30px;
`;

export const S_ModalAnchor = styled('a')`
    cursor: pointer;
    display: flex;
`;

export const S_Backdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: ${cssColor('--overlay-bg')};
    -webkit-tap-highlight-color: transparent;
`;

export const S_ModalClose = styled('button')`
    position: absolute;
    padding: 0;
    margin: 0;
    outline: none;
    border: none;
    display: flex;
    cursor: pointer;
    top: 6px;
    right: 8px;
    background: transparent;
`;

export const S_Image = styled('img')`
    max-width: 100%;
`;
