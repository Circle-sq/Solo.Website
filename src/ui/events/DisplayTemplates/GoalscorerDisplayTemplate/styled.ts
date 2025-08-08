import styled from '@emotion/styled';

import { fontWeight, GenericColors, cssColor } from '@solo-ui/system';

const FOUR_COLUMNS = 4;

export const S_TemplateSelectionRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${cssColor('--list-selection-item-border')};
`;

export const S_GoalscorerDisplayTemplateWrapper = styled.div`
    font-size: 14px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${cssColor('--list-selection-item-border')};
`;

export const S_GoalscorerHeaderWrapper = styled(S_GoalscorerDisplayTemplateWrapper)`
    border: none;
`;

export const S_GoalscorerPlayerName = styled.div<{ columnsNumber: number }>`
    font-size: 14px;
    display: flex;
    align-items: center;
    color: ${GenericColors.white};

    ${(props): string => {
        const { columnsNumber } = props;
        let styles = ``;

        if (columnsNumber === FOUR_COLUMNS) {
            styles += `
                width: 40%;
                padding-left: 15px;
            `;
        } else {
            styles += `
                width: 40%;
                flex: 1;
                justify-content: center;
            `;
        }

        return `
            ${styles};
        `;
    }};
`;

export const S_SelectionPrice = styled.div`
    width: 100%;
    height: 100%;

    > div {
        width: 100%;
        height: 100%;
    }

    button {
        font-size: 14px;
        flex-direction: row;
        align-items: center;
        text-align: initial;
        font-weight: ${fontWeight.bold};
        justify-content: center;
        padding: 10px 0;
        background: ${cssColor('--button-text')};

        > div {
            padding: 0 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;
