import styled from '@emotion/styled';

import { breakpoints, fontWeight, GreyPalette } from '@solo-ui/system';

import { S_PitcherName } from 'src/ui/common/Pitcher/styled';
import TeamShirt from 'src/ui/common/TeamImage';
import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const S_ParticipantMobile = styled.div<{ away?: boolean; truncatedWidth?: string }>`
    display: flex;
    align-items: center;
    margin-top: 0;
    justify-content: ${(props) => (props.away ? 'flex-start' : 'flex-end')};
    max-width: 100%;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    svg {
        height: 8px;
        width: 8px;
        min-width: 8px;
        min-height: 8px;
    }

    ${({ away }): string => {
        if (away === true) {
            return `
                padding-left: 0;

                > img { margin-right: 8px; }
            `;
        }

        return `
                padding-right: 0;

                > img { margin-left: 8px; }
            `;
    }};
`;

export const S_ParticipantTitleMobile = styled(TooltipTruncatedText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    font-size: 12px;
    color: ${GreyPalette.grey7};
    font-weight: ${fontWeight.medium};
    max-width: 100%;

    @media (min-width: ${breakpoints.bp500}) {
        font-size: 16px;
    }
`;

export const S_TimeContainerContent = styled.div`
    display: flex;
    justify-content: space-between;
    height: 19px;
`;

export const S_PitcherMobileWrapper = styled.div<{ isWithUniform: boolean }>`
    display: flex;

    ${S_PitcherName} {
        @media (min-width: ${breakpoints.bp500}) {
            font-size: 12px;
        }
    },
`;

export const S_PitcherMobileEndWrapper = styled(S_PitcherMobileWrapper)<{ isWithUniform: boolean }>`
    display: flex;
    justify-content: end;
`;

export const S_TeamImage = styled(TeamShirt)`
    object-fit: contain;
    flex-shrink: 0;
    width: 36px;
    height: 36px;

    @media (max-width: ${breakpoints.bp500}) {
        width: 20px;
        height: 20px;
    }
`;

export const S_VersusSeparator = styled.span`
    font-size: 12px;
    color: ${GreyPalette.grey7};
    margin: 0 12px 8px 12px;
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
`;
