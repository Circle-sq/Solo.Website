import styled from '@emotion/styled';

import { GreyPalette, cssColor } from '@sc-ui/system';

import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const LHNRowColors = `
    color: ${cssColor('--body-text')};
    background-color: ${cssColor('--list-lhn-item-bg')};
    border-bottom: 1px solid ${cssColor('--list-lhn-item-border')};

    line-height: 19px;
    height: 35px;

    &.active {
        background-color: ${cssColor('--list-lhn-item-active-bg')};
    }

    &:hover {
        background-color: ${cssColor('--list-lhn-item-hover-bg')};
        border-color: ${cssColor('--list-lhn-item-hover-border')};
    }
`;

export const S_SportIcon = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 8px;
    width: 16px;
    color: ${GreyPalette.grey7};
`;

export const S_LinkLabel = styled(TooltipTruncatedText)`
    white-space: nowrap;
    display: inline-block;
    font-size: 14px;
    z-index: 3;
`;

export const S_Wrapper = styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    padding: 8px 12px;
    cursor: pointer;

    ${LHNRowColors};

    &:last-of-type {
        border-bottom: none;
    }
`;
