import styled from '@emotion/styled';
import { Modal } from '@mui/base/Modal';
import { styled as muiStyled } from '@mui/system';

import { DarkBluePalette, GreyPalette, Opacities } from '@solo-ui/system';

import Backdrop from 'src/ui/common/Backdrop/Backdrop';
import Link from 'src/utils/Router/NewLink';

export const BaseModal = muiStyled(Modal)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1300;
    inset: 0;
`;

export const S_Backdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: ${DarkBluePalette.darkBlue1 + Opacities.opacity92};
    -webkit-tap-highlight-color: transparent;
`;

export const S_LoginPopupContent = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: ${DarkBluePalette.darkBlue2};
    width: 360px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const S_LoginPopupTitle = styled.h3`
    flex: 1;
    margin: 0;
    padding: 0;
    font-size: 20px;
    font-weight: 400;
    color: ${GreyPalette.grey7};
`;

export const S_LoginPopupHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 15px;
    line-height: 1.7;
    text-align: center;
    background-color: ${DarkBluePalette.darkBlue4};
    color: ${GreyPalette.grey7};
`;

export const CloseIconWrapperLink = styled(Link)`
    display: flex;
`;
