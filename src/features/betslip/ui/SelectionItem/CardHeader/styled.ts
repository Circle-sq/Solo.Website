import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const S_Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 16px;
    white-space: nowrap;
    overflow: hidden;
    min-width: 100%;
    border-bottom: 1px solid ${cssColor('--box-betslip-header-border')};
`;

export const S_CardHeaderLabel = styled.div`
    text-transform: capitalize;
    font-size: 16px;
    margin: 1px 8px 1px 0;
    height: 22px;
    display: flex;
    align-items: center;
    color: ${cssColor('--body-text')};
    font-weight: ${fontWeight.semibold};
`;

export const S_CardSportAndCompetition = styled(TooltipTruncatedText)`
    margin: 1px 0 1px 8px;
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 210px;
    height: 22px;
    color: ${cssColor('--text-muted')};
`;
