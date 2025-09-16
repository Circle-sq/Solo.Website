import styled from '@emotion/styled';

import {
    S_BuildABetCardEventName,
    S_BuildABetIconWrapper,
} from '@solo-buildABet/ui/betslip/BuildABetCardContent/styled';
import { S_SelectionName } from '@solo-buildABet/ui/myBet/styled';
import { GenericColors, cssColor } from '@solo-ui/system';

import Button from 'src/ui/common/Button/Button';

import { CardContentFreeBetsWrapper, ContentFirstColumn } from './CardContent/styled';
import { S_Container } from './CardHeader/styled';
import { S_SelectionPriceAction } from './CardStake/SelectionPrice/styled';
import { S_PossibleWinnings } from './CardStake/styled';
import { S_SelectionEvent, S_StandardLeg } from './StandardBet/styled';

interface SelectionContainerProps {
    isDisabled: boolean;
    isSingleTab: boolean;
    numpadOpen: boolean;
}

export const S_RemoveSelectionButton = styled(Button)<{ isMultiples?: boolean }>`
    opacity: 0.6;
    padding: 0;
    align-self: center;
    font-size: 15px;
    display: flex;

    ${({ isMultiples = false }): string => {
        let styles = `
            background-color: ${GenericColors.transparent};

            &:hover {
                background-color: ${GenericColors.transparent};
            }
        `;

        if (isMultiples) {
            styles += `
                padding-left: 8px;
                align-self: flex-start;
            `;
        } else {
            styles += `
                margin-left: auto;
            `;
        }

        return styles;
    }};
`;

export const S_SelectionContainer = styled.div<SelectionContainerProps>`
    position: relative;

    ${(props): string => {
        const { isDisabled, isSingleTab, numpadOpen } = props;

        let styles = `
            background-color: ${cssColor('--card-bg')};
        `;

        if (isDisabled) {
            styles += `
                ${S_StandardLeg}, ${S_PossibleWinnings}, ${S_SelectionPriceAction}, ${S_Container},
                ${ContentFirstColumn}, ${CardContentFreeBetsWrapper}, ${S_SelectionName},
                ${S_BuildABetCardEventName}, ${S_BuildABetIconWrapper}, ${S_SelectionEvent} {
                    opacity: 0.5;
                }
                pointer-events: none;
            `;
        }

        if (isSingleTab) {
            styles += `
                border-radius: 6px;
                margin-bottom: 16px;
            `;
        }

        if (numpadOpen) {
            styles += `
                padding-bottom: 16px;
            `;
        }

        return `
            ${styles}

            &:last-of-type {
                margin-bottom: 0;
            }
        `;
    }};
`;

export const S_StakeNumpadContainer = styled.div`
    width: calc(100% - 32px);
    display: flex;
    margin: 0 auto;
`;
