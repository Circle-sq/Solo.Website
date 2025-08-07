import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@sc-ui/system';

export const S_MultipleBetLegItem = styled.div`
    border-radius: 0;
    margin-bottom: 0;
    border-bottom: 1px solid ${cssColor('--list-primary-item-border')};

    &:last-of-type {
        border: unset;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        margin-bottom: 10px;
    }
`;

export const S_MultipleBetHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    height: 40px;
    font-size: 16px;
    padding: 10px 17px;
    margin: 0;
    line-height: 24px;
    font-weight: ${fontWeight.semibold};
    border-bottom: 1px solid ${cssColor('--list-primary-item-border')};
`;

export const S_EventName = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    line-height: 1em;
    margin-top: 15px;
    padding-left: 0;
    max-width: 260px;
    color: ${cssColor('--body-text')};

    .x-logo-icon {
        transform: scale(0.8);
        position: relative;

        path {
            fill: ${cssColor('--icon-tertiary-color')};
        }
    }
`;
