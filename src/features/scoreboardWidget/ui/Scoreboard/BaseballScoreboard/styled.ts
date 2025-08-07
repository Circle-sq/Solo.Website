import styled from '@emotion/styled';

import { breakpoints, fontWeight } from '@sc-ui/system';

export const S_ScoreboardWrapper = styled.div<{ shouldAlignCenter: boolean }>`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: ${({ shouldAlignCenter = false }) => (shouldAlignCenter ? 'center' : 'flex-start')};
    justify-content: space-between;

    & > :nth-of-type(2) {
        align-self: center;
    }
`;

export const S_Participant = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1 1 0;

    @media (max-width: ${breakpoints.bp500}) {
        flex: 1;
        width: 100%;
        justify-content: center;
    }
`;

export const S_MainScoreInfo = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    @media (max-width: ${breakpoints.bp500}) {
        flex: 1;
        width: 100%;
    }
`;

export const S_ScoreSeparator = styled.span`
    display: flex;
    text-align: center;
    margin-bottom: 4px;
    font-size: 32px;
    line-height: 43px;
    font-weight: ${fontWeight.bold};

    @media screen and (max-width: ${breakpoints.bp500}) {
        font-size: 18px;
        line-height: 24px;
    }
`;

export const S_ScoreAndTimeWrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
    margin: 0 16px;
`;

export const S_PitcherWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 4px 0;

    @media (max-width: ${breakpoints.bp500}) {
        justify-content: left;
    }

    & p {
        font-size: 12px;
        line-height: 16px;

        @media (max-width: ${breakpoints.bp500}) {
            font-size: 8px;
            line-height: 11px;
        }
    }
`;
