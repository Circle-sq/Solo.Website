import styled from '@emotion/styled';

import { fontWeight, radius, cssColor } from '@solo-ui/system';

export const S_MarketHeaderWrapper = styled.div<{ isOpen?: boolean }>`
    background-color: ${cssColor('--accordion-header-bg')};

    ${({ isOpen }): string => {
        let styles = `
            border-top-left-radius: ${radius.main};
            border-top-right-radius: ${radius.main};
        `;

        if (!isOpen) {
            styles += `
                border-radius: ${radius.main};
            `;
        }

        return `
            ${styles};
        `;
    }}
`;

export const S_MarketHeaderContent = styled.button<{ isSuspended?: boolean }>`
    border: none;
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 17px;
    min-height: 40px;
    font-size: 14px;
    padding: 0 15px;
    color: ${cssColor('--body-text')};
    background-color: ${cssColor('--button-text')};
    border-radius: ${radius.main};

    &:hover {
        background-color: ${cssColor('--box-selection-header-hover-bg')};
    }

    ${(props): string => {
        let styles = ``;
        const { isSuspended } = props;

        if (isSuspended) {
            styles += `
                ${S_MarketHeaderTitle} {
                    color: ${cssColor('--text-muted')};
                }
            `;
        }

        return styles;
    }}
`;

export const S_TitleWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

export const S_MarketHeaderTitle = styled.h4`
    margin: 0;
    font-size: 14px;
    text-align: left;
    font-weight: ${fontWeight.regular};
`;
