import styled from '@emotion/styled';

import { breakpoints, fontWeight, LightBluePalette } from '@solo-ui/system';

export const S_Notification = styled.div`
    display: flex;
    padding: 6px 15px;
    font-size: 11px;
    line-height: 16px;
    align-items: center;
    margin: 0 0 12px;
    font-weight: ${fontWeight.regular};
    color: ${LightBluePalette.lightBlue6};
    background-color: ${LightBluePalette.lightBlue1};
    border-radius: 5px;

    @media (max-width: ${breakpoints.bp500}) {
        margin: 8px 0;
    }
`;

export const S_TextWrapper = styled.p`
    padding: 0 5px 0 8px;
    margin: 0;
`;

export const S_NotificationInfo = styled.span`
    color: ${LightBluePalette.lightBlue9};
`;

export const S_NotificationLink = styled.a`
    color: ${LightBluePalette.lightBlue9};
`;

export const S_MarginBox = styled.div`
    margin-left: auto;
    cursor: pointer;
`;
