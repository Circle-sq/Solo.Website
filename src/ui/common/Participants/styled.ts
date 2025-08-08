import styled from '@emotion/styled';

import { fontWeight, breakpoints, GreyPalette } from '@solo-ui/system';

import TeamImage from 'src/ui/common/TeamImage/TeamImage';
import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const TeamShirt = styled(TeamImage)`
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

export const S_AmericanFormat = styled.span`
    color: ${GreyPalette.grey6};
    margin-left: 4px;
`;

export const S_Participant = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 22px;

    .bets & {
        & > span {
            font-weight: ${fontWeight.medium};
            color: ${GreyPalette.grey7};
            font-size: 14px;
            line-height: 19px;
        }
    }

    & > span:first-of-type {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 12px;
        line-height: 19px;

        &:first-of-type {
            .bets & {
                margin-bottom: 0;
            }
        }
    }
`;

export const S_ParticipantName = styled(TooltipTruncatedText)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const S_PitcherWrapper = styled.div<{ hasUniform: boolean }>`
    padding-left: ${({ hasUniform }) => (hasUniform ? '24px' : '0')};
`;
