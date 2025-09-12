import styled from '@emotion/styled';

import { fontWeight, breakpoints, cssColor } from '@solo-ui/system';

import type { SelectionValueType } from '../types';

export const S_SelectionValue = styled.span<SelectionValueType>`
    position: relative;
    min-height: 19px;
    font-size: 12px;
    font-weight: ${fontWeight.bold};
    color: ${cssColor('--body-text')};

    ${(props): string => {
        const { disabled, isSuspended = false } = props;

        let styles = `
            @media(max-width: ${breakpoints.bp500}) {
                min-height: 16px;
            }
        `;

        if (isSuspended || disabled === true) {
            styles = `
                background-color: transparent;
                pointer-events: none;
                color: ${cssColor('--text-secondary')};
            `;
        }

        return styles;
    }};
`;

export const S_SelectionValueIdentifier = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
