import styled from '@emotion/styled';

import { radius, fontWeight, cssColor } from '@sc-ui/system';

export const S_FiltersWrapper = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
    height: 24px;
    width: 100%;
    margin-bottom: 16px;
`;

export const S_Chip = styled.span`
    text-align: center;
    font-feature-settings:
        'clig' off,
        'liga' off;
    font-size: 12px;
    font-style: normal;
    line-height: 1.1;
    min-width: 22px;
    padding: 0;
    border-radius: ${radius.toggle};
    font-weight: ${fontWeight.semibold};
    background: ${cssColor('--chip-bg')};
`;

export const S_LeaguesDropdownWrapper = styled.div`
    margin: 0 9px;
    border: 1px solid ${cssColor('--box-default-border')};
    background: ${cssColor('--popup-default-bg')};
    border-radius: ${radius.secondary};
    box-shadow: 0 2px 4px 1px ${cssColor('--box-default-shadow')};
`;

export const S_Header = styled.div`
    height: 60px;
    display: flex;
    padding: 12px 16px;
    gap: 64px;
    align-items: center;
    align-self: stretch;
    border-bottom: 1px solid ${cssColor('--box-default-border')};
`;

export const S_HeaderLabel = styled.div`
    font-feature-settings:
        'clig' off,
        'liga' off;
    font-size: 16px;
    font-style: normal;
    text-transform: uppercase;
    font-weight: ${fontWeight.semibold};
`;

export const S_SearchFilter = styled.div`
    display: flex;
    padding: 10px 12px;
    align-items: center;
    gap: 12px;
    border-radius: 6px;
    width: 240px;
    height: 36px;
    margin-left: auto;
    border: 2px solid ${cssColor('--input-border')};
    background: ${cssColor('--input-bg')};
`;

export const S_Input = styled.input`
    background: transparent;
    border: 0;
    color: ${cssColor('--body-text')};

    &::placeholder {
        color: ${cssColor('--text-muted')};
        font-size: 14px;
    }
`;

export const S_LeaguesContent = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(7, 1fr);
    padding: 8px 0 8px 4px;
    align-items: flex-start;
    height: 310px;
    overflow-y: scroll;
    border-bottom: 1px solid ${cssColor('--box-default-border')};

    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${cssColor('--box-default-border')};
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${cssColor('--popup-default-bg')};
    }
`;

export const S_CompetitionItem = styled.div`
    display: flex;
    gap: 12px;
    padding: 4px 0 4px 12px;
    cursor: pointer;

    div {
        margin-top: 2px;
    }

    span {
        cursor: pointer;
        user-select: none;
        font-size: 14px;
    }
`;

export const S_SmallerSpan = styled.span`
    font-size: 12px;
    margin: auto 0;
`;

export const S_Footer = styled.div`
    height: 51px;
    display: flex;
    padding: 8px 28px 8px 0;
    justify-content: flex-end;
    gap: 10px;

    > * {
        border-radius: 3px;
        padding: 7px 16px;
        cursor: pointer;
        font-feature-settings:
            'clig' off,
            'liga' off;

        font-size: 14px;
        font-style: normal;
        font-weight: ${fontWeight.medium};
    }
`;

export const S_ApplyButton = styled.div`
    background: ${cssColor('--button-primary-bg')};

    &:hover {
        background: ${cssColor('--button-primary-hover-bg')};
    }
`;
