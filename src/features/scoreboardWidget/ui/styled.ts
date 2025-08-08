import styled from '@emotion/styled';

import { breakpoints, GenericColors } from '@solo-ui/system';

export const S_ScoreboardContainer = styled.div`
    position: relative;

    @media (max-width: ${breakpoints.bp500}) {
        margin: 0 -8px;
    }
`;

export const S_MainScoreboardInfo = styled.div<{ isMiniVersion: boolean }>`
    display: flex;
    width: 100%;
    height: 100%;
    padding: ${({ isMiniVersion = false }) => (isMiniVersion ? '0 10px 12px' : '0 20px 24px')};
`;

export const S_BackgroundWrapper = styled.div<{ backgroundImage: string }>`
    min-height: 92px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: ${GenericColors.white};

    background-image: ${({ backgroundImage }) => backgroundImage};

    @media (max-width: ${breakpoints.bp500}) {
        min-height: 59px;
    }
`;

export const S_TopScoreboardInfo = styled.div<{ isMiniVersion: boolean }>`
    width: 100%;
    min-height: 21px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${({ isMiniVersion = false }) => (isMiniVersion ? '8px' : '0')};
    padding: ${({ isMiniVersion = false }) => (isMiniVersion ? '4px 14px' : '8px 14px')};

    @media (min-width: ${breakpoints.bp500}) {
        min-height: 29px;
    }
`;
