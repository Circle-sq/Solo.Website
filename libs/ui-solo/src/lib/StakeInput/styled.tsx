import styled from '@emotion/styled';

import { DarkBluePalette, RedPalette, cssColor } from '@solo-ui/system';

export const S_Input = styled.input<{ error?: boolean }>`
    border-radius: 3px;
    text-align: right;
    max-height: 32px;
    padding: 7px;
    line-height: 1;
    max-width: 107px;
    font-size: 14px;
    transition: all 0.2s ease;
    color: ${cssColor('--body-text')};
    border: 1px solid ${cssColor('--input-border')};
    background-color: ${cssColor('--input-bg')};

    &:hover {
        border: 1px solid ${cssColor('--text-muted')};
    }

    &:focus {
        border: 1px solid ${cssColor('--box-secondary-border')};
    }

    &::placeholder {
        color: ${cssColor('--body-text')};
    }

    ${({ disabled = false, error = false }: { disabled?: boolean; error?: boolean }) => {
        let styles = '';

        if (disabled) {
            styles += `
                -webkit-text-fill-color: ${DarkBluePalette.darkBlue5};
                opacity: 1; /* required on iOS */
                background-color: ${cssColor('--stake-input-bg-disabled')};
            `;
        }

        if (error) {
            styles += `
                border: 1px solid ${cssColor('--text-error')};
                &:hover {
                    border: 1px solid ${cssColor('--text-error')};
                }
                &:focus {
                    border: 1px solid ${cssColor('--text-error')};
                }
        `;
        }

        return styles;
    }}
`;

export const S_InputWrapper = styled.div`
    position: relative;
`;

export const S_StakeInputErrorIcon = styled.span`
    font-size: 13px;
    position: absolute;
    line-height: 1;
    top: 53%;
    left: 8px;
    transform: translateY(-50%);
    display: block;
    color: ${RedPalette.red5};
`;
