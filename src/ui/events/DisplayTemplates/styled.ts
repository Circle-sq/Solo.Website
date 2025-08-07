import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@sc-ui/system';

export const S_MarketDescription = styled.div`
    display: flex;
    padding: 8px;
    gap: 8px;
    border-left: 1px solid ${cssColor('--list-selection-item-border')};
    border-right: 1px solid ${cssColor('--list-selection-item-border')};
    font-size: 12px;
    font-weight: ${fontWeight.regular};
    line-height: 16px;
    color: ${cssColor('--text-default-color')};
    overflow-wrap: anywhere;
`;

export const S_TemplateSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    border: 1px solid ${cssColor('--list-selection-item-border')};
`;
