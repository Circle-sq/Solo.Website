import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@sc-ui/system';

import { S_ContentIcon as ContentIcon } from 'src/ui/common/NavigationList/styled';

export const S_NavListItem = styled.li<{ isActive: boolean; isSecondLevel?: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    padding: 9px 14px;
    height: 42px;
    width: 100%;

    color: ${cssColor('--body-text')};
    padding-left: ${({ isSecondLevel = false }) => (isSecondLevel ? '44px' : '14px')};
    background-color: ${({ isActive = false }) =>
        isActive ? cssColor('--list-lhn-item-active-bg') : cssColor('--list-lhn-item-bg')};
    border-bottom: 1px solid ${cssColor('--list-lhn-item-border')};

    &:hover {
        background-color: ${cssColor('--list-lhn-item-hover-bg')};
        border-color: transparent;
        text-decoration: none;
    }
`;

export const S_NavListItemContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const S_NavIconWrapper = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 16px;
    color: ${cssColor('--body-text')};
`;

export const S_NavSportName = styled.span`
    display: flex;
    max-width: 240px;
    font-size: 16px;
    font-weight: ${fontWeight.regular};
    align-items: center;
    user-select: none;
`;

export const S_NavLiveIndicator = styled.span`
    padding: 3px 0;
    font-size: 12px;
    text-align: center;
    font-weight: ${fontWeight.bold};
    text-transform: uppercase;
    color: ${cssColor('--text-live')};
`;
export const S_NavEventCounter = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 41px;
    height: 20px;
    padding: 0 8px;
    border-radius: 4px;

    font-size: 14px;
    font-weight: ${fontWeight.semibold};

    background-color: ${cssColor('--chip-betslip-bg')};
`;

export const S_ExpandableSportListItem = styled.li<{ highlightESports: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    padding: 9px 14px;
    height: 42px;
    width: 100%;

    color: ${cssColor('--body-text')};
    background-color: ${({ highlightESports = false }) =>
        highlightESports ? cssColor('--list-lhn-item-active-bg') : cssColor('--list-lhn-item-bg')};
    border-bottom: 1px solid ${cssColor('--list-lhn-item-border')};

    &:hover {
        background-color: ${cssColor('--list-lhn-item-hover-bg')};
        border-color: transparent;
        text-decoration: none;
    }
`;

export const S_ExpandArrowWrapper = styled.div`
    display: flex;
`;

export const S_ContentIcon = styled(ContentIcon)`
    margin-right: 0;
`;

export const S_NavListItemCounterWrapper = styled(S_NavListItemContentWrapper)`
    gap: 6px;
`;
