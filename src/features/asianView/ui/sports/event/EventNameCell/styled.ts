import styled from '@emotion/styled';

import { breakpoints, fontWeight, Gradients, GreyPalette } from '@solo-ui/system';

import TeamImage from 'src/ui/common/TeamImage/TeamImage';
import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const S_TableEventCellRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 0 16px;
`;

export const S_ParticipantName = styled(TooltipTruncatedText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 170px;
    font-size: 14px;
    font-weight: ${fontWeight.semibold};

    @media (max-width: ${breakpoints.bp1440}) {
        font-size: 12px;
    }
`;

export const S_TableEventCellRowNoPadding = styled(S_TableEventCellRow)`
    justify-content: space-between;
    padding: 0 8px 0 0;
`;

export const S_DrawLabel = styled.b<{ hasUniform?: boolean }>`
    font-size: 14px;
    font-weight: ${fontWeight.medium};
    margin-left: ${({ hasUniform }) => (hasUniform ? '23px' : '0')};

    @media (min-width: ${breakpoints.bp1440}) {
        font-size: 12px;
    }
`;

export const AsianViewTeamShirt = styled(TeamImage)`
    width: 16px;
    height: 16px;
    object-fit: contain;
    margin-right: 7px;
    flex-shrink: 0;
    margin-bottom: -1px;

    @media (max-width: ${breakpoints.bp500}) {
        margin-bottom: -3px;
    }
`;

export const S_RedCardScore = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    padding: 5px 3px;
    height: 16px;
    min-width: 11px;
    color: ${GreyPalette.grey7};
    text-align: center;
    font-size: 8px;
    font-style: normal;
    font-weight: ${fontWeight.bold};
    border-radius: 2px;
    background: ${Gradients.gradient2};
`;
