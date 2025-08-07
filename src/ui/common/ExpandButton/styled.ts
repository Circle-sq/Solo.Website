import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@sc-ui/system';

export const S_ShowMoreBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    margin: 0;
    font-size: 13px;
    cursor: pointer;
    color: ${cssColor('--body-text')};
    background: ${cssColor('--button-text')};
    border: 1px solid ${cssColor('--button-border')};
    border-top: 0;
    font-weight: ${fontWeight.bold};

    &:hover {
        color: ${cssColor('--text-info-color')};

        svg path {
            fill: ${cssColor('--text-info-color')};
        }
    }
`;

export const S_MarginBox = styled.div`
    margin-left: 10px;
    display: flex;
`;
