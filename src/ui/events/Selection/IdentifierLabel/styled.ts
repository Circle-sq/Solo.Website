import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@solo-ui/system';

export const S_IdentifierLabel = styled.span`
    position: absolute;
    top: -9px;
    left: 0;
    text-align: center;
    z-index: 2;
    width: 100%;
    font-size: 11px;
    font-weight: ${fontWeight.medium};
`;

export const S_Label = styled.span`
    max-width: 35px;
    min-width: fit-content;
    text-align: center;
    height: 16px;
    width: 16px;
    line-height: 10px;
    display: inline-block;
    position: relative;
    border-radius: 3px;
    padding: 2px 4px;
    font-size: 8px;
    background-color: ${cssColor('--badge-default-bg')};
    border: 1px solid ${cssColor('--badge-default-border')};
`;
