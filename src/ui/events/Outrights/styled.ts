import styled from '@emotion/styled';

import { fontWeight, GenericColors, cssColor } from '@solo-ui/system';

export const MarketGroupContainer = styled.section`
    column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid-column;
`;

export const ToggleButton = styled.button`
    border: none;
    cursor: pointer;
    display: flex;
    background-color: ${GenericColors.transparent};
`;

export const S_OutrightNamePanel = styled.div<{ isOpen: boolean; isEventExpandable: boolean }>`
    cursor: pointer;
    padding: 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    color: ${cssColor('--body-text')};
`;

export const HeaderLabel = styled.span``;
export const HeaderName = styled.span`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: ${fontWeight.bold};
`;
export const HeaderDate = styled.span`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 1;
`;

export const Content = styled.div`
    padding: 0.47rem 0.7rem;

    section + section {
        margin-top: 0.47rem;
    }
`;
