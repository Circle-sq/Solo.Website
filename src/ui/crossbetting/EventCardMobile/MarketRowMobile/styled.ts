import styled from '@emotion/styled';

import { fontWeight, radius, breakpoints, GreyPalette } from '@sc-ui/system';

export const S_MarketRowMobile = styled.div`
    display: flex;

    &:not(:last-child) {
        margin-bottom: 6px;
    }
`;

export const S_SelectionItemMobile = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: ${GreyPalette.grey7};

    button {
        line-height: 19px;
        padding: 4px 8px;
    }

    &:not(:last-child) {
        margin-right: 8px;
    }

    > span {
        font-weight: ${fontWeight.bold};
    }
`;

export const S_Selection = styled.div<{ isAway?: boolean; isDraw?: boolean }>`
    width: 100%;
    margin: auto;

    > div {
        width: 100%;
        height: 100%;
        padding: 0 2px;
    }

    button {
        font-size: 14px;
        flex-direction: row;
        align-items: center;

        ${({ isAway = false, isDraw = false }): string => {
            const textAlign = isAway ? 'left' : isDraw ? 'center' : 'right';

            return `
                flex-direction: ${isAway ? 'row-reverse' : 'row'};
                border-radius: ${radius.selection};
                font-weight: ${fontWeight.bold};

                > div {
                    text-align: ${textAlign};
                }

                @media(min-width: ${breakpoints.bp500}) and (max-width: ${breakpoints.bp768}) {
                    align-items: center;
                    flex-wrap: wrap;

                    > span {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            `;
        }}

        > div {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

export const S_SelectionMobile = styled.div<{ isAway?: boolean; isDraw?: boolean }>`
    width: 100%;
    margin: auto;

    > div {
        width: 100%;
        height: 100%;
        padding: 0 2px;
    }

    button {
        font-size: 12px;
        line-height: 19px;
        padding: 4px 8px;
        flex-direction: row;
        align-items: center;

        ${({ isAway = false, isDraw = false }): string => {
            const textAlign = isAway ? 'left' : isDraw ? 'center' : 'right';

            return `
                flex-direction: ${isAway ? 'row-reverse' : 'row'};
                border-radius: ${radius.selection};
                font-weight: ${fontWeight.bold};

                > div {
                    text-align: ${textAlign};
                }
            `;
        }}
        > div {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;
