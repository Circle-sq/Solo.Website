import styled from '@emotion/styled';

import { cssColor, fontWeight, GenericColors, Opacities } from '@solo-ui/system';

export const S_CompetitionGroup = styled.tbody`
    width: 100%;
`;

export const S_CompetitionHeader = styled.tr<{ isExpanded: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 38px;
    padding: 6px 12px;
    font-weight: ${fontWeight.semibold};
    margin-bottom: ${({ isExpanded }) => (isExpanded ? '0' : '1px')};
    background-color: ${cssColor('--panel-secondary-header-bg')};
    color: ${cssColor('--text-info-color')};
`;

export const S_CompetitionHeaderLeftContent = styled.td`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 8px;

    > span:first-of-type,
    img,
    div {
        margin: 0;
    }

    color: ${cssColor('--body-text')};
`;

export const S_CompetitionIcon = styled.img`
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    margin-right: 8px;
`;

export const S_EventList = styled.tr`
    display: flex;
    flex-direction: column;
`;

export const S_ExpandBtnWrapper = styled.span`
    cursor: pointer;
`;

export const S_GroupNameSeparator = styled.span`
    width: 1px;
    height: 16px;
    border-left: 1px solid ${GenericColors.white + Opacities.opacity20};
`;
