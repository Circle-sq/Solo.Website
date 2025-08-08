import styled from '@emotion/styled';

import { fontWeight, breakpoints, GenericColors, GreyPalette } from '@solo-ui/system';

import type { ContentIconStyle } from 'src/ui/common/NavigationList/types';
import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';
import { LHNRowColors } from 'src/ui/crossbetting/TopSportsNavigationSidebar/SportItem/styled';
import Link from 'src/utils/Router/NewLink';

export const S_ToggleButton = styled.button<{ isOpen: boolean }>`
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    background-color: ${GenericColors.transparent};

    > span {
        font-weight: ${fontWeight.bold};
        color: ${GreyPalette.grey7};
        font-size: 8px;
    }
`;

export const NavigationLink = styled(Link)`
    display: flex;
    justify-items: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    padding: 8px 12px 8px 20px;
    width: 100%;

    ${LHNRowColors};
`;

export const S_CrossBetNavigationLink = styled(NavigationLink)`
    padding: 8px 12px 8px 20px;
    align-items: center;
`;

export const S_Label = styled(TooltipTruncatedText)`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${GreyPalette.grey7};

    @media (max-width: ${breakpoints.bp420}) {
        width: 320px;
    }
`;

export const S_ChildLabel = styled(S_Label)`
    margin-left: 4px;
`;

export const S_RightSide = styled.div`
    margin-left: auto;
    font-size: 12px;
    display: flex;
    align-items: center;
    color: ${GreyPalette.grey7};
`;

export const S_Counter = styled.span`
    margin: 0 5px 0 6px;
    color: ${GreyPalette.grey7};
    font-weight: ${fontWeight.semibold};
`;

export const CompetitionLink = styled(Link)`
    display: flex;
    justify-items: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    padding: 5px 10px 5px 28px;
    width: 100%;

    ${LHNRowColors};
`;

export const S_CrossBetCompetitionLink = styled(CompetitionLink)`
    padding-left: 28px;
`;

export const S_CompetitionIcon = styled.i`
    font-size: 16px;
    padding-right: 8px;
    padding-top: 2px;
    color: ${GreyPalette.grey7};
`;

export const S_ContentIcon = styled.span<ContentIconStyle>`
    ${(props): string => {
        const { url } = props;

        return `
            width: 16px;
            height: 16px;
            background: url(${url}) no-repeat;
            background-size: 16px 16px;
            margin-right: 8px;
            padding-right: 16px;
        `;
    }}
`;

export const S_MarginBox = styled.div`
    display: flex;
    margin-right: 8px;
`;
