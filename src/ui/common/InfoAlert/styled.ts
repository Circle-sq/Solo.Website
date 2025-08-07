import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@sc-ui/system';

import { IconPositionTypes } from 'src/common/enums';

import type { IconType, IconPosition } from './types';
import { AlertIcon } from './types';

export const S_InfoMessage = styled.div<IconType>`
    display: flex;
    padding: 16px;
    position: relative;
    font-size: 14px;
    line-height: 1.4;
    animation: 400ms fadeInReceipt 1;
    margin-bottom: 16px;
    border-radius: 5px;
    align-items: center;

    ${(props): string => {
        const { type } = props;

        let bgColor;
        let textColor;

        switch (type) {
            case AlertIcon.Warning:
                bgColor = cssColor('--alert-warning-bg');
                textColor = cssColor('--alert-warning-text');

                break;

            case AlertIcon.Error:
                bgColor = cssColor('--alert-error-bg');
                textColor = cssColor('--alert-error-text');

                break;

            case AlertIcon.Info:
                bgColor = cssColor('--alert-info-bg');
                textColor = cssColor('--alert-info-text');

                break;

            case AlertIcon.Success:
                bgColor = cssColor('--alert-success-bg');
                textColor = cssColor('--alert-success-text');

                break;
        }

        let styles = `
                background-color: ${bgColor};
                color: ${textColor};
            `;

        if (type === AlertIcon.Info) {
            styles += 'padding: 16px; margin-bottom: 0';
        }

        return `
            ${styles}
        `;
    }}
`;

export const S_InfoHeaderMessage = styled.div`
    font-weight: ${fontWeight.bold};
`;

export const S_InfoBodyMessage = styled.div`
    font-weight: ${fontWeight.regular};
`;

export const S_InfoTitleMessage = styled.div<IconType & IconPosition>`
    ${({ type }): string => (type === AlertIcon.Warning ? `margin-bottom: 4px;` : '')}
    margin-right: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${({ iconPosition }): string => {
        if (iconPosition === IconPositionTypes.TOP) {
            return `
                min-width: 16px;

                svg {
                    position: absolute;
                    top: 18px;
                }
            `;
        }

        return ``;
    }}
`;

export const S_InfoAlert = styled.div<IconType>`
    ${({ type }): string => (type === AlertIcon.Info ? 'padding: 16px; width: 100%' : '')}
`;
