import styled from '@emotion/styled';

import { fontWeight, breakpoints, cssColor } from '@sc-ui/system';

import {
    EventRowActiveIcon,
    EventRowName,
    EventRowSeparator,
    InfoRowScore,
    NumberRow,
    S_EventInfo,
    S_EventInfoColumn,
    S_EventScore,
    S_EventTime,
} from 'src/ui/common/EventInfographics/styled';
import LinesEllipsis from 'src/ui/common/LinesEllipsis';
import { S_Participant } from 'src/ui/common/Participants/styled';
import TeamShirt from 'src/ui/common/TeamImage';

export const S_Content = styled.section`
    color: ${cssColor('--body-text')};
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 57px;
    line-height: 16px;

    ${S_EventInfoColumn} {
        padding: 7px 0 10px 0;
    }

    ${S_EventInfo} {
        justify-content: space-between;
        height: 40px;
    }

    ${S_EventScore} {
        margin-left: 0;

        & > span {
            position: relative;
            width: 24px;

            &:first-of-type {
                width: auto;
                margin-right: 0;
            }

            &:last-of-type {
                margin: 0;

                & span:last-of-type {
                    word-break: keep-all;
                }
            }

            ${NumberRow} {
                justify-content: center;
                line-height: normal;

                &:first-of-type {
                    margin-bottom: 8px;
                }
            }

            ${EventRowName} {
                position: absolute;
                top: -10px;
                margin: 0 -5px;
                background: ${cssColor('--card-marquee-bg')};
                justify-content: center;
                font-size: 8px;
                line-height: 1;
                width: 34px;
            }

            &:nth-of-type(2) {
                ${EventRowName} {
                    width: 35px;
                }
            }

            &:last-of-type {
                ${EventRowName} {
                    width: 29px;
                    justify-content: flex-end;
                    padding-right: 10px;
                }
            }
        }

        ${EventRowSeparator} {
            margin-top: 2px;
            height: 40px;
            width: 1px;
            margin-right: 0;
        }
    }

    ${InfoRowScore}, ${NumberRow} {
        line-height: 16px;
        height: 16px;
        font-size: 12px;
        color: ${cssColor('--body-text')};
    }

    ${EventRowActiveIcon} {
        line-height: 16px;
        margin-top: -2px;
    }

    ${S_Participant} {
        font-size: 12px;
        color: ${cssColor('--body-text')};
        line-height: 16px;

        &:first-of-type {
            margin-bottom: 8px;
        }
    }

    ${S_EventTime} {
        display: none;
    }

    & > svg {
        margin-right: 8px;
    }

    @media screen and (max-width: ${breakpoints.bp500}) {
        ${S_EventInfo} {
            padding: 0;
            border-bottom: none;

            & ${EventRowActiveIcon} {
                line-height: 16px;
                margin-top: 1px;

                &:first-of-type {
                    margin-top: 0;
                }
            }
        }

        ${S_EventInfoColumn} {
            border-right: none;
        }
    }
`;

export const S_NameContainer = styled.div<{ isWithUniform?: boolean }>`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    max-width: ${({ isWithUniform }) => (isWithUniform === true ? '72px' : '96px')};
`;

export const S_Name = styled(LinesEllipsis)`
    margin: 0;
    font-weight: ${fontWeight.regular};
    font-size: 12px;
`;

export const S_TeamImage = styled(TeamShirt)`
    width: 24px;
    height: 24px;
    object-fit: contain;
    padding: 0 1.5px;
    flex-shrink: 0;
`;

export const S_Score = styled.span`
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    font-weight: ${fontWeight.bold};
`;

export const S_Team = styled.div<{ align?: 'right' }>`
    display: flex;
    align-items: center;
    width: 104px;

    ${(props): string | undefined => {
        const { align } = props;

        if (align === 'right') {
            return `
                text-align: right;
                justify-content: flex-end;

                ${S_NameContainer} {
                    margin-right: 8px;
                }
            `;
        } else {
            return `
                ${S_NameContainer} {
                    margin-left: 8px;
                }
            `;
        }
    }}
`;
