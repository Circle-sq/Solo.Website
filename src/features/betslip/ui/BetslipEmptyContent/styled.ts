import styled from '@emotion/styled';

import { DarkBluePalette, GreyPalette, LightBluePalette } from '@solo-ui/system';

import Link from 'src/utils/Router/Link';

export const S_InfoMessage = styled.div`
    display: flex;
    position: relative;
    font-size: 14px;
    line-height: 1.4;
    animation: 400ms fadeInReceipt 1;
    border-radius: 6px;
    overflow: hidden;
    flex-direction: column;
    padding: 16px;
    color: ${LightBluePalette.lightBlue10};

    > div {
        padding: 0;
    }
`;

export const S_NavigationLabel = styled.span`
    margin-left: 8px;
    font-size: 14px;
`;

export const S_NavigationLink = styled(Link)`
    position: relative;
    overflow: hidden;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    padding: 10px;
    display: flex;
    line-height: 1.3;
    align-items: center;
    background-color: ${DarkBluePalette.darkBlue3};
    color: ${GreyPalette.grey7};
    border-bottom: 1px solid ${DarkBluePalette.darkBlue4};
`;

export const S_IconWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    right: 10px;
`;
