import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

export const S_OverUnderDisplayTemplateWrapper = styled.div`
    font-size: 14px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: start;
    border-left: 1px solid ${cssColor('--list-selection-item-border')};
    border-top: 1px solid ${cssColor('--list-selection-item-border')};
    border-right: 1px solid ${cssColor('--list-selection-item-border')};
`;

export const S_OverUnderSelectionLine = styled.div`
    opacity: 0.85;
`;

export const S_OverUnderSelection = styled(S_OverUnderDisplayTemplateWrapper)<{ identifier?: string }>`
    font-size: 12px;
    width: 100%;
    padding: 7.5px 0;
    text-align: center;
    font-weight: ${fontWeight.bold};

    ${(props): string => {
        const identifier = props.identifier;
        let style = ``;

        if (identifier === 'O') {
            style += `
                border-left: 1px solid ${cssColor('--list-selection-item-border')};
                border-right: 1px solid ${cssColor('--list-selection-item-border')};
            `;
        }

        return `
            border: none;
            border-bottom: 1px solid ${cssColor('--list-selection-item-border')};
            ${style}
        `;
    }}
`;

export const S_OverUnderHeaderWrapper = styled(S_OverUnderDisplayTemplateWrapper)`
    border: none;
`;

export const S_SelectionColumnWrapper = styled(S_OverUnderDisplayTemplateWrapper)`
    flex-direction: column;
    border: none;
`;

export const S_SelectionPrice = styled.div<{ identifier?: string; overunder?: boolean }>`
    width: 100%;
    height: 100%;

    ${(props): string => {
        const identifier = props.identifier;
        const overunder = props.overunder;
        let style = ``;

        if (overunder) {
            if (identifier === 'O') {
                style += `
                    border-right: 1px solid ${cssColor('--list-selection-item-border')};
                    border-left: 1px solid ${cssColor('--list-selection-item-border')};
                `;
            }
        } else {
            style += `
                border-right: 1px solid ${cssColor('--list-selection-item-border')};
            `;
        }

        return `
            ${style}
            border-bottom: 1px solid ${cssColor('--list-selection-item-border')};
        `;
    }}
    > div {
        width: 100%;
        height: 100%;
    }

    button {
        font-size: 14px;
        flex-direction: row;
        align-items: center;
        text-align: initial;
        font-weight: ${fontWeight.bold};
        justify-content: center;
        padding: 7.5px 0;
        background: ${cssColor('--button-text')};

        > div {
            padding: 0 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;
