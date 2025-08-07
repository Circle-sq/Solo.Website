import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@sc-ui/system';

export const S_TemplateWrapper = styled.div`
    font-size: 14px;
    text-align: center;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    border: 1px solid ${cssColor('--list-selection-item-border')};
    border-bottom: none;
`;

export const S_HeaderWrapper = styled(S_TemplateWrapper)`
    border: none;
`;

export const S_SelectionGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const S_SelectionColumnWrapper = styled(S_TemplateWrapper)`
    flex-direction: column;
    align-self: flex-start;
    border: none;
    height: 100%;
    border-right: 1px solid ${cssColor('--list-selection-item-border')};

    &:last-child {
        border: none;
    }
`;

export const S_SelectionPrice = styled.div`
    width: 100%;
    height: 100%;
    border-bottom: 1px solid ${cssColor('--list-selection-item-border')};

    > div {
        width: 100%;
        height: 100%;
    }

    button {
        flex-direction: row;
        font-size: 14px;
        align-items: center;
        text-align: initial;
        font-weight: ${fontWeight.bold};
        justify-content: center;
        padding: 10px 0;
        background: ${cssColor('--button-text')};

        span:first-of-type {
            left: 11px;
        }

        span {
            padding: 0;
            top: unset;
        }

        > div {
            padding: 0 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;
