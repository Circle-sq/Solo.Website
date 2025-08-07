import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import { cssColor, fontWeight, GenericColors } from '@sc-ui/system';

import { SPORT_ROW_HEIGHT } from './utils';

export const S_BurgerMenuContainer = styled.div`
    max-height: 100svh;
    width: 300px;
`;

export const S_SportTabsWrapper = styled.div`
    position: relative;
    height: 49px;
    display: flex;
    align-items: center;
    font-size: 12px;
    border-bottom: 1px solid ${cssColor('--tabs-secondary-border')};
`;

export const S_SportTabs = styled.div`
    display: flex;
    align-items: center;
    width: 300px;
    height: 100%;
`;

export const S_SportTabItem = styled.div<{ isActive?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    height: 49px;
    background-color: ${({ isActive = false }) =>
        isActive ? cssColor('--tabs-secondary-active-bg') : cssColor('--tabs-secondary-bg')};

    > span {
        height: 17px;
    }
`;

export const S_SeparatorWrapper = styled.div`
    display: flex;
    position: absolute;
    top: 4px;
    right: -1px;
`;

export const S_CloseIconWrapper = styled.div<{ width: string }>`
    margin: 5px 0 0 6px;
    cursor: pointer;
    width: ${({ width }) => width};
`;

export const S_ExpandIconWrapper = styled.div`
    margin: 2px 0 0 6px;
    cursor: pointer;
`;

export const S_SportRow = styled.div<{ isActive?: boolean }>`
    height: ${SPORT_ROW_HEIGHT}px;
    display: flex;
    align-items: center;
    padding-right: 12px;
    font-size: 14px;
    cursor: pointer;

    border-bottom: 1px solid ${cssColor('--list-border')};

    background-color: ${({ isActive = false }) => (isActive ? cssColor('--list-active-bg') : cssColor('--list-bg'))};

    border-left: ${({ isActive = false }) =>
        `3px solid ${isActive ? cssColor('--list-active-border') : cssColor('--list-bg')}`};
`;

export const S_NoEventsRow = styled(S_SportRow)`
    height: fit-content;
    text-align: center;
    border-left: 0;
    padding-left: 15px;
    justify-content: center;
    color: ${GenericColors.white};
`;

export const S_LiveLabel = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 10px;
    margin-left: auto;
    margin-right: 6px;
    text-align: center;
    color: ${cssColor('--text-live')};
    font-weight: 900;
    white-space: nowrap;
`;

export const S_SportCounter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 9px;
    line-height: 12px;
    border-radius: 2px;
    padding: 4px 2px;
    min-width: 25px;
    height: 14px;
    flex-shrink: 0;
    background: ${cssColor('--chip-bg')};
    font-weight: ${fontWeight.semibold};
`;

export const S_MobileSportIconWrapper = styled.div`
    margin: 0 8px 0 12px;
    height: 17px;
    width: 16px;
`;

export const S_CompetitionIconWrapper = styled(S_MobileSportIconWrapper)`
    margin-left: 24px;
`;

export const S_Option = styled.div`
    display: flex;
    align-items: center;
`;

export const S_Icon = styled.span<{ src: string }>`
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    align-self: center;
    margin-right: 8px;

    ${(props): string => {
        const { src } = props;

        return `
                background-image: url('${src}');
                width: 14px;
                min-width: 14px;
                height: 12px;
        `;
    }}
`;

export const S_Wrapper = styled.div`
    padding: 12px;
    background-color: ${cssColor('--list-bg')};
`;

export const S_Content = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 6px;
    background-color: ${cssColor('--button-outlined-default-border')};
    outline: 2px solid ${cssColor('--button-active-bg')};
`;
export const S_SearchButton = styled(Typography)`
    font-size: 11px;
    line-height: 1.35;
    white-space: nowrap;
`;
