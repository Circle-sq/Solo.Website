import styled from '@emotion/styled';

import { breakpoints, fontWeight, GreyPalette, Gradients, cssColor } from '@solo-ui/system';

export const BasicEventScore = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    min-width: 27px;

    @media (max-width: ${breakpoints.bp500}) {
        line-height: normal;
    }
`;

export const NumberRow = styled.span`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 23px;

    @media (max-width: ${breakpoints.bp500}) {
        line-height: 17px;

        &:first-of-type {
            margin-bottom: 0;
        }
    }

    ${BasicEventScore} & {
        &:first-of-type {
            margin-top: -1px;
            margin-bottom: 1px;

            @media (max-width: ${breakpoints.bp500}) {
                margin-top: 0;
                margin-bottom: 2px;
            }
        }
    }
`;

export const S_PeriodContainer = styled.div`
    font-style: normal;
    line-height: 15px;
    font-weight: ${fontWeight.medium};
`;

export const RowScore = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: ${fontWeight.bold};
    line-height: 23px;

    .bets & {
        line-height: 19px;
    }

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 12px;
        line-height: 19px;

        .bets & {
            font-size: 14px;
            line-height: 19px;
        }
    }

    ${BasicEventScore} & {
        @media (max-width: ${breakpoints.bp500}) {
            line-height: 19px;
        }
    }
`;

export const S_Score = styled(RowScore)`
    margin-left: 8px;

    @media (max-width: ${breakpoints.bp500}) {
        margin-left: 8px;
    }
`;

export const S_RedCard = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    padding: 4px 2px;
    border-radius: 2px;
    height: 15px;
    width: 10px;
    background: ${Gradients.gradient2};
    font-weight: ${fontWeight.bold};
`;

export const S_EventScore = styled.div`
    display: flex;
    flex: 0 0 auto;
    justify-content: flex-end;
    align-items: flex-start;
    margin-left: 32px;
    text-align: center;
    font-size: 14px;

    & > span {
        margin-right: 8px;

        &.sets-info-score {
            margin-left: -8px;

            & > span {
                justify-content: center;
            }
        }
    }

    @media (max-width: ${breakpoints.bp500}) {
        margin-left: 0;
        flex-basis: 0;
        > span {
            line-height: 17px;
        }
    }
`;

export const InfoRowScore = styled(RowScore)<{ label?: string }>`
    line-height: 23px;
    font-weight: ${fontWeight.bold};

    &:empty:before {
        content: '\00a0'; // &nbsp;
    }

    @media (max-width: ${breakpoints.bp500}) {
        line-height: 22px;
    }

    .bets & {
        line-height: 19px;
    }
`;

export const EventRowName = styled(NumberRow)<{ label?: string }>`
    font-size: 10px;
    line-height: 1;
    margin-top: 2px;
    color: ${cssColor('--label-score-text')};
`;

export const EventRowActiveIcon = styled.span`
    margin-top: -1px;
    font-size: 10px;
    line-height: 22px;
    color: ${cssColor('--icon-active-color')};

    ${NumberRow} & {
        margin-top: 2px;
        align-self: end;

        @media (max-width: ${breakpoints.bp500}) {
            margin-top: 0.5px;
        }
    }

    ${NumberRow}:first-of-type & {
        margin-top: 0.5px;
    }

    .bets & {
        line-height: 19px;
        margin-bottom: 0;
    }

    @media (max-width: ${breakpoints.bp500}) {
        margin-top: -1px;
    }
`;

export const EventRowSeparator = styled.span`
    margin-top: 6px;
    height: 40px;
    border-left: 1px solid ${cssColor('--body-text')};

    @media screen and (max-width: ${breakpoints.bp500}) {
        margin-top: 4px;
        height: 39px;
    }

    .bets & {
        height: 42px;
        margin-top: 4px;

        @media screen and (max-width: ${breakpoints.bp500}) {
            margin-top: 4px;
            height: 38px;
        }
    }
`;

export const S_EventInfoParticipants = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 13px;
    min-width: 0;
    margin-right: 8px;

    & > div:first-of-type {
        display: flex;
        flex-flow: column;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (max-width: ${breakpoints.bp500}) {
        flex-basis: 100%;
    }
`;

export const S_EventTimeBase = styled.div`
    display: flex;
    font-style: italic;
    line-height: normal;
    align-items: center;

    @media (max-width: ${breakpoints.bp500}) {
        padding-left: 8px;
    }
`;

export const S_EventTime = styled(S_EventTimeBase)`
    font-size: 12px;
    color: ${GreyPalette.grey5};

    span:first-of-type {
        margin-right: 7px;
    }

    @media (max-width: ${breakpoints.bp500}) {
        padding-left: 0;

        svg {
            flex: none;
        }
    }
`;

export const S_EventInfoBase = styled.div`
    display: flex;
    max-width: 100%;
    min-width: 0;

    & > ${S_EventScore} {
        max-width: fit-content;
        margin-left: 16px;
        margin-top: -2px;

        & > span:not(:only-child):last-child {
            margin-left: 0;
            margin-right: 0;
        }

        span.info-score-col {
            min-width: 15.5px;
        }

        @media (max-width: ${breakpoints.bp500}) {
            .bets & {
                ${NumberRow} {
                    &:nth-of-type(2) {
                        margin-top: 8px;
                    }
                }
            }

            .bets & ${BasicEventScore} ${NumberRow}:nth-of-type(2) {
                margin-top: 4px;
            }
        }

        @media (min-width: ${breakpoints.bp500}) {
            .bets & ${BasicEventScore} ${NumberRow}:nth-of-type(2) {
                margin-top: 8px;
            }
        }
    }

    @media (max-width: ${breakpoints.bp960}) {
        & > ${S_EventScore} {
            margin-left: 16px;
        }
    }

    @media (max-width: ${breakpoints.bp500}) {
        padding-right: 16px;

        & > ${S_EventScore} {
            span.info-score-col {
                min-width: 13.5px;
            }
        }
    }
`;

export const S_EventInfo = styled(S_EventInfoBase)<{ isAmericanSports?: boolean }>`
    & > ${S_EventInfoParticipants} {
        margin: 0;
    }
`;

export const S_EventInfoColumn = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
    justify-content: center;
    padding: 0;

    @media (max-width: ${breakpoints.bp500}) {
        padding: 0;
    }
`;

export const StyledInfoWrapper = styled.div`
    @media (max-width: ${breakpoints.bp500}) {
        padding-left: 32px;
    }
`;

export const S_MarginBox = styled.div`
    display: flex;
    margin-right: 6px;
`;

export const S_MarginWrapper = styled.div`
    display: flex;
    margin-right: 6px;

    & > svg {
        font-size: 16px;
    }
`;
