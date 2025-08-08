import styled from '@emotion/styled';

import { fontWeight, GenericColors, GreyPalette, DarkBluePalette } from '@solo-ui/system';

import { S_BaseOverlay } from 'src/ui/common/Backdrop/styled';

export const S_PopupOverlay = styled(S_BaseOverlay)<{ active: boolean }>`
    display: ${({ active }) => (active ? 'flex' : 'none')};
    justify-content: center;
    height: 100%;
    padding: 0 20px;
    width: 100%;
    align-items: center;
`;

export const S_PopupTitle = styled.header`
    font-size: 14px;
    padding: 10px 15px;
    position: relative;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    color: ${GreyPalette.grey7};
    font-weight: ${fontWeight.bold};
`;

export const S_PopupContent = styled.div<{ maxWidth?: string }>`
    border-radius: 3px;
    max-height: 100%;
    position: relative;
    width: 100%;
    max-width: ${({ maxWidth = '100%' }) => maxWidth};
    color: ${GreyPalette.grey7};
    background-color: ${DarkBluePalette.darkBlue2};
`;

export const S_PopupBody = styled.div`
    padding: 0 15px 15px;
    position: relative;
    text-align: left;
`;

export const S_PopupClose = styled.span`
    cursor: pointer;
    font-size: 15px;
    height: 20px;
    line-height: 1;
    width: 20px;
    position: absolute;
    right: 10px;
    color: ${GreyPalette.grey7};

    &:hover {
        color: ${GenericColors.white};
        text-decoration: none;
    }
`;
