import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@sc-ui/system';

const S_BaseName = styled.span`
    flex: 1 1 auto;
    font-size: 14px;
    line-height: 21px;
    margin-right: 8px;
`;

export const S_SelectionName = styled(S_BaseName)`
    margin-right: 0;
    font-weight: ${fontWeight.bold};
    color: ${cssColor('--body-text')};
`;

export const S_MarketName = styled(S_BaseName)`
    word-break: keep-all;
    color: ${cssColor('--text-muted')};
    font-weight: ${fontWeight.medium};
`;

export const S_SelectionMarketName = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 8px;
`;
