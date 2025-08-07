import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@sc-ui/system';

export const S_TemplateWrapper = styled.div`
    font-size: 14px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${cssColor('--list-selection-item-border')};
    border-right: 1px solid ${cssColor('--list-selection-item-border')};
    border-top: 1px solid ${cssColor('--list-selection-item-border')};
`;

export const S_HeaderWrapper = styled(S_TemplateWrapper)`
    border: none;
`;

export const S_SelectionColumnWrapper = styled(S_TemplateWrapper)`
    flex-direction: column;
    align-self: flex-start;
    border: none;

    &:not(:last-child) {
        border-right: 1px solid ${cssColor('--list-selection-item-border')};
    }

    &:not(:last-child):not(:first-of-type) {
        border-left: 1px solid ${cssColor('--list-selection-item-border')};
        margin-left: -1px;
    }

    &:last-child {
        border-left: 1px solid ${cssColor('--list-selection-item-border')};
        margin-left: -1px;
    }
`;

export const S_SelectionPrice = styled.div<{ isMultiScores?: boolean }>`
    width: 100%;
    height: 100%;
    border-right: 1px solid ${cssColor('--list-selection-item-border')};
    border-bottom: 1px solid ${cssColor('--list-selection-item-border')};

    > div {
        width: 100%;
        height: 100%;
    }

    button {
        font-size: 13px;
        flex-direction: row;
        align-items: center;
        text-align: initial;
        font-weight: ${fontWeight.bold};
        justify-content: center;
        padding: 10px 0;
        background: ${cssColor('--button-text')};

        > div {
            padding: 0 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        ${({ isMultiScores }): string => {
            let styles = ``;

            if (isMultiScores) {
                styles += `
                    flex-direction: column;

                    span {
                        display: block;
                        text-align: center;
                        white-space: unset;
                    }
                `;
            }

            return `
                ${styles}
            `;
        }}
    }
`;
