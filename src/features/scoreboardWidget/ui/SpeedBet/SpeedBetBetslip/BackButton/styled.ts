import styled from '@emotion/styled';

import { fontWeight, cssColor, breakpoints } from '@solo-ui/system';

export const S_BackButton = styled.button`
    outline: none;
    border: 1px solid ${cssColor('--speedbet-back-button-border')};
    color: ${cssColor('--body-text')};
    text-decoration: none;
    font-size: 16px;
    font-weight: ${fontWeight.bold};
    background: none;
    cursor: pointer;
    padding: 5px;
    flex: 1;
    height: 48px;
    border-radius: 3px;
    line-height: 1;

    &:hover {
        background: ${cssColor('--speedbet-back-button-hover')};
    }

    &:active {
        background: ${cssColor('--speedbet-back-button-active')};
    }

    @media (max-width: ${breakpoints.bp960}) {
        font-size: 12px;
        height: 31px;
    }
`;
