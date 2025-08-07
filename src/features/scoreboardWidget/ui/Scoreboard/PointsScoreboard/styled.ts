import styled from '@emotion/styled';

import { breakpoints, fontWeight, GenericColors, GreyPalette, Opacities } from '@sc-ui/system';

import { ParticipantType } from '../../../types';

import { BoardStatus, ScoreColor } from './types';

export const S_Board = styled.div<{ status: BoardStatus }>`
    width: 100%;
    display: grid;
    gap: 4px 12px;

    ${({ status }) => {
        if (status === BoardStatus.Active) {
            return `
                grid-template-areas: 'home history' 'away history' 'phase phase';
                grid-template-columns: minmax(auto, 70%) minmax(min-content, 30%);
                place-items: center start;
            `;
        }

        return `
            grid-template-areas: 'home vs away';
            grid-template-columns: 1fr auto 1fr;
            place-items: center;
        `;
    }}
`;

export const S_Participant = styled.div<{ type: ParticipantType }>`
    grid-area: ${({ type }) => type};
    overflow: hidden;
    width: 100%;
`;

export const S_Versus = styled.div`
    grid-area: vs;
    text-align: center;
`;

export const S_VersusLabel = styled.p`
    margin: 0;
    font-size: 18px;
    font-weight: ${fontWeight.bold};
    line-height: 24px;
    filter: drop-shadow(0px 4px 4px ${GenericColors.black + Opacities.opacity25});

    @media screen and (min-width: ${breakpoints.bp500}) {
        font-size: 32px;
        line-height: 44px;
    }
`;

export const S_Phase = styled.p`
    grid-area: phase;
    margin: 0;
    font-size: 12px;
    font-weight: ${fontWeight.medium};
    line-height: 16px;
    filter: drop-shadow(0px 4px 4px ${GenericColors.black + Opacities.opacity25});

    & > span {
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
    }

    @media screen and (min-width: ${breakpoints.bp500}) {
        font-size: 16px;
        line-height: 26px;
    }
`;

export const S_History = styled.div`
    grid-area: history;
    display: grid;
    grid-auto-columns: min-content;
    grid-template-rows: subgrid;
    place-items: center;
    column-gap: 8.5px;
`;

export const S_HistoryParticipantSetScore = styled.p<{ type: ParticipantType; color: ScoreColor }>`
    grid-row: ${({ type }) => (type === ParticipantType.Home ? '1 / 2' : '2 / 3')};
    margin: 0;
    color: ${({ color }) => (color === ScoreColor.Primary ? GenericColors.white : GreyPalette.grey5)};
    font-size: 14px;
    font-weight: ${fontWeight.bold};
    line-height: 24px;

    @media screen and (min-width: ${breakpoints.bp500}) {
        font-size: 16px;
        line-height: 32px;
    }
`;

export const S_HistoryParticipantActiveIndicator = styled.span<{ type: ParticipantType; visible: boolean }>`
    grid-row: ${({ type }) => (type === ParticipantType.Home ? '1 / 2' : '2 / 3')};
    display: inline-block;
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
    pointer-events: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${GenericColors.white};
`;

export const S_HistorySetSeparator = styled.span`
    grid-row: 1 / 3;
    width: 1px;
    height: calc(100% - 8px);
    background-color: ${GenericColors.white};
    border-radius: 0.5px;

    @media screen and (min-width: ${breakpoints.bp500}) {
        height: calc(100% - 16px);
    }
`;
