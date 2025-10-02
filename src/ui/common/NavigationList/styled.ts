import styled from '@emotion/styled';

import { cssColor, fontWeight, GreyPalette } from '@solo-ui/system';

import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';
import Link from 'src/utils/Router/NewLink';

import { LHNRowColors } from '../CountryListItem/styled';

import type { ContentIconStyle } from './types';

export const S_Icon = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 8px;
    width: 16px;
    color: ${GreyPalette.grey7};
`;

export const S_Wrapper = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 14px;
    border-top: 1px solid ${cssColor('--list-lhn-border')};
`;

export const S_LinkLabel = styled(TooltipTruncatedText)`
    white-space: nowrap;
    display: inline-block;
    z-index: 3;
`;

export const NavigationLink = styled(Link)`
    display: flex;
    justify-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    align-items: center;
    padding: 8px 12px;

    ${LHNRowColors};

    &:last-of-type {
        border-bottom: none;
    }
`;

export const S_Counter = styled.span`
    margin-left: auto;
    font-size: 12px;
    color: ${GreyPalette.grey7};
    font-weight: ${fontWeight.semibold};
`;

export const S_ContentIcon = styled.img<ContentIconStyle>`
    ${(props): string => {
        const { isLoaded = false } = props;

        return `
            width: 16px;
            height: 16px;
            background-size: 16px 16px;
            margin-right: 8px;
            display: ${isLoaded ? 'inline-block' : 'none'}
        `;
    }}
`;

export const S_CompetitionLocationItemIcon = styled.img<ContentIconStyle>`
    ${(props): string => {
        const { isLoaded = false } = props;

        return `
            display: ${isLoaded ? 'inline-block' : 'none'} !important;
            background-size: cover;
            background-position: center;
            position: relative;
            margin-right: 8px;
            top: 0;
            width: 16px;
            height: 16px;
            background-size: 16px 16px;
        `;
    }}
`;

export const S_SwiperCompetitionLocationItemIcon = styled(S_CompetitionLocationItemIcon)`
    top: 3px;
`;
