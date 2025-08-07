import styled from '@emotion/styled';

import { fontWeight } from '@sc-ui/system';

export const S_BasicScoreboard = styled.div`
    display: flex;
    justify-content: center;
`;

export const S_NumberRow = styled.div`
    display: flex;
`;

export const S_EventRowName = styled(S_NumberRow)`
    font-size: 10px;
    margin-top: 2px;
    color: #606060;
`;

export const S_RowScore = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: ${fontWeight.bold};
`;

export const S_ScoreboardSeparator = styled.span`
    font-size: 16px;
    font-weight: ${fontWeight.bold};
`;

export const S_InfoRowScore = styled(S_RowScore)`
    font-weight: ${fontWeight.bold};

    &:empty:before {
        content: '\00a0'; // &nbsp;
    }
`;

export const S_EventRowSeparator = styled.span`
    margin-top: 6px;
    height: 40px;
    border-left: 1px solid #adadad;
`;

export const S_EventRowActiveIcon = styled.span`
    margin-top: -1px;
    font-size: 10px;
    color: #007acc;

    ${(): string => {
        return `
            ${S_NumberRow} & {
                margin-top: 1px;
                align-self: end;
            }

            ${S_NumberRow}:first-of-type & {
                margin-top: 0px;
            }

            .bets & {
                margin-bottom: 0px;
            }
        `;
    }}
`;
