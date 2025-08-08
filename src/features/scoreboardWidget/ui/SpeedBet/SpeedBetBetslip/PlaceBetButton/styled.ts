import styled from '@emotion/styled';

import { LightBluePalette, fontWeight, breakpoints, cssColor } from '@solo-ui/system';

export const S_PlaceBetButton = styled.div<{ disabled?: boolean | undefined; isLoading?: boolean | undefined }>`
    background: ${cssColor('--speedbet-confirm-button-bg')};
    height: 48px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    font-size: 16px;
    color: ${cssColor('--body-text')};
    font-weight: ${fontWeight.bold};
    outline: none;
    border: none;
    cursor: pointer;
    flex: 1;
    padding: 5px;
    border: 1px solid ${cssColor('--speedbet-confirm-button-border')};

    &:hover {
        background: ${cssColor('--speedbet-confirm-button-bg-hover')};
    }

    &:active {
        background: ${cssColor('--speedbet-confirm-button-bg-active')};
    }

    ${({ disabled = false, isLoading = false }) => {
        let style = ``;

        if (disabled) {
            style += `
                background: ${cssColor('--speedbet-confirm-button-disabled-bg')};
                color: ${cssColor('--speedbet-confirm-button-disabled')};
                cursor: not-allowed;

                &:hover,
                &:active {
                    background: ${cssColor('--speedbet-confirm-button-disabled-bg')};
                }
            `;
        }

        if (isLoading) {
            style += `
                border: 1px solid ${cssColor('--speedbet-confirm-button-loading-border')};
                background: ${cssColor('--speedbet-confirm-button-loading-bg')}
                cursor: not-allowed;

                &:hover,
                &:active {
                    background: ${cssColor('--speedbet-confirm-button-loading-bg')}
                }
            `;
        }

        return style;
    }}

    @media (max-width: ${breakpoints.bp960}) {
        font-size: 12px;
        height: 31px;
    }
`;

export const S_Spinner = styled.div`
    display: flex;

    & > span {
        margin-left: 5px;
        width: 4px;
        height: 4px;
        background: ${LightBluePalette.lightBlue7};
        border-radius: 50%;
        animation: dots3 1.5s infinite ease-out;
    }

    & > span:nth-of-type(1) {
        animation-delay: 0.2s;
    }

    & > span:nth-of-type(2) {
        animation-delay: 0.4s;
    }

    & > span:nth-of-type(3) {
        animation-delay: 0.8s;
    }

    @keyframes dots3 {
        0% {
            background: ${LightBluePalette.lightBlue7};
        }
        50% {
            background: ${LightBluePalette.lightBlue11};
        }
        100% {
            background: ${LightBluePalette.lightBlue10};
        }
    }
`;
