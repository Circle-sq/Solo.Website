import styled from '@emotion/styled';

import { fontWeight, radius, cssColor } from '@sc-ui/system';

export const S_SelectToggle = styled.div`
    position: relative;
`;

export const S_SelectButton = styled.button`
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    height: 24px;
    padding: 8px;
    cursor: pointer;
    user-select: none;
    font-size: 12px;
    gap: 8px;
    font-weight: ${fontWeight.medium};
    color: ${cssColor('--body-text')};
    border: 1px solid ${cssColor('--dropdown-border')};
    background: ${cssColor('--dropdown-mini-bg')};
    border-radius: ${radius.secondary};

    svg {
        font-size: 8px;
        height: 12px;
        width: 12px;
    }

    &:disabled {
        color: ${cssColor('--dropdown-mini-disabled-bg')};

        svg path {
            fill: ${cssColor('--dropdown-mini-disabled-text')};
        }
    }
`;

export const S_ExpandIcon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    gap: 2px;

    svg:not(:first-of-type) {
        margin-left: -2px;
    }
`;

export const S_SelectOptions = styled.div`
    position: absolute;
    box-shadow: 0 2px 4px 1px ${cssColor('--dropdown-shadow')};
    z-index: 2;
    border-radius: ${radius.secondary};
    border: 1px solid ${cssColor('--dropdown-border')};
`;

export const S_Option = styled.div<{ width?: number; active?: boolean }>`
    display: flex;
    align-items: center;
    height: 24px;
    font-size: 12px;
    font-style: normal;
    padding: 8px;
    cursor: pointer;
    gap: 8px;
    white-space: nowrap;
    background-color: ${({ active = false }) =>
        active ? cssColor('--dropdown-option-active-bg') : cssColor('--dropdown-option-bg')};
    width: ${({ width }) => `${width}px`};

    &:hover {
        background-color: ${cssColor('--dropdown-option-hover-bg')};
    }

    svg {
        height: 12px;
        width: 12px;
    }
`;
