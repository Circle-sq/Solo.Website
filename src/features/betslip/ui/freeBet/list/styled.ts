import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

export const S_FreeBetListContainer = styled.div<{ freeBetsCount?: number }>`
    overflow-y: scroll;
    padding-right: 12px;
    margin-top: 8px;
    max-height: ${({ freeBetsCount = 0 }) => (freeBetsCount > 3 ? '285px' : '275px')};

    &::-webkit-scrollbar {
        width: 4px;
        border-radius: 6px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${cssColor('--scrollbar-track-color')};
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${cssColor('--scrollbar-thumb-bg')};
        border-radius: 6px;
    }
`;

export const S_FreeBetItemWrapper = styled.div`
    padding: 4px 12px;
    border-radius: 6px;
    margin-top: 8px;
    cursor: pointer;
    background-color: ${cssColor('--list-item-secondary-bg')};

    &:hover {
        background-color: ${cssColor('--list-item-secondary-bg-hover')};
    }

    &:first-of-type {
        margin-top: 0;
    }

    &:hover {
        box-shadow: 0 4px 10px 1px rgba(0, 0, 0, 0.25);
        transition: all 0.2s ease;
    }
`;

export const S_FreeBetItemAmount = styled.div`
    font-size: 14px;
    font-weight: ${fontWeight.bold};
    cursor: pointer;
    color: ${cssColor('--text-warning-color')};
`;

export const S_FreeBetItemDescription = styled.div`
    font-size: 12px;
    line-height: 16px;
    font-weight: ${fontWeight.semibold};
    overflow-wrap: break-word;
    color: ${cssColor('--label-primary-text')};
`;

export const S_FreeBetItemValidity = styled.div`
    font-size: 10px;
    color: ${cssColor('--text-secondary')};
    font-weight: ${fontWeight.medium};
`;
