import styled from '@emotion/styled';

import { cssColor, fontWeight, GenericColors } from '@solo-ui/system';

export const S_AcceptOddsNotification = styled.div`
    padding: 15px 9px;
    font-size: 12px;
    line-height: 1.2;
    display: flex;
    align-items: center;
    border-radius: 5px;
    font-weight: ${fontWeight.bold};
    background: linear-gradient(90deg, ${cssColor('--box-tertiary-bg')} 0%, ${cssColor('--box-tertiary-pale-bg')} 100%);
`;

export const S_FastTimeIcon = styled.div`
    margin-right: 7px;
    color: ${GenericColors.white};
`;

export const S_NotificationText = styled.span`
    display: block;
    font-size: 12px;
    color: ${cssColor('--text-primary-pale')};
`;

export const S_NotificationHeader = styled.span`
    display: block;
    font-size: 15px;
`;

export const S_NotificationTextContent = styled.div`
    flex: 1;
    color: ${GenericColors.white};
`;
