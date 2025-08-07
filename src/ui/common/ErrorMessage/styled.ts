import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@sc-ui/system';

import type { Icon } from 'src/ui/common/ErrorMessage/types';

export const S_Message = styled.div`
    padding: 7px 10px;
    font-size: 12px;
    line-height: 1.2;
    display: flex;
    align-items: center;
    color: ${cssColor('--text-error')};
    font-weight: ${fontWeight.medium};

    &:not(:last-of-type) {
        margin-bottom: 10px;
    }
`;

export const S_SingleErrorMessage = styled.div`
    font-size: 10px;
    line-height: normal;
    text-align: right;
    color: ${cssColor('--text-error')};
    font-weight: ${fontWeight.medium};
`;

export const S_InfoIcon = styled.span<Icon>`
    font-size: 16px;
    margin-right: 7px;
    display: flex;

    ${(props): string => {
        const { color } = props;

        let styles = `
            color: ${cssColor('--text-error')};
        `;

        if (color === 'red') {
            styles += `color: ${cssColor('--text-live')};`;
        }

        return styles;
    }}
`;

export const S_InfoHeader = styled.span`
    font-size: 15px;
    margin-right: 7px;
`;

export const S_InfoMessage = styled.span`
    display: flex;
    flex-direction: column;
`;
