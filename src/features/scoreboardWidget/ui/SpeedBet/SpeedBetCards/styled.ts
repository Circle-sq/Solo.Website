import styled from '@emotion/styled';

import { GreenPalette, GenericColors, LightBluePalette, RedPalette, Opacities, fontWeight } from '@solo-ui/system';

import {
    CARDS_PADDING,
    CARD_WIDTH,
    CARD_HEIGHT,
    CARD_TRANSITION_TIME,
    getCardPadding,
    getCardSummedUpPadding,
    isLastCard,
} from './utils';

interface CardProps {
    index: number;
    totalCards: number;
    transitions: {
        toRight: boolean;
        toBottom: boolean;
        toLeft: boolean;
        toTop: boolean;
    };
}

interface NextBetButtonProps {
    disabled?: boolean;
}

interface BackgroundProps {
    bg: string;
}

export const S_Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const S_CardsStack = styled.div`
    user-select: none;
    position: relative;
    width: ${CARD_WIDTH}px;
`;

export const S_CardTransitionWrapper = styled.div<CardProps>`
    position: absolute;
    transition: all ${CARD_TRANSITION_TIME}ms cubic-bezier(0, 0, 0, 0.5);

    filter: ${({ transitions, index, totalCards }) =>
        (transitions.toTop && !isLastCard(index, totalCards)) || (transitions.toBottom && index === 0)
            ? 'blur(2px)'
            : 'none'};

    width: ${({ index = 0, transitions, totalCards = 0 }) => {
        const { toBottom, toTop, toLeft, toRight } = transitions;

        if ((toLeft && toRight && isLastCard(index, totalCards)) || (!toLeft && toRight && index === 1)) {
            return `${CARD_WIDTH}px`;
        }

        if (toTop) {
            return `${CARD_WIDTH - getCardSummedUpPadding(isLastCard(index, totalCards) ? 0 : index + 1)}px`;
        }

        if (toBottom) {
            const newIndex = index === 0 ? totalCards : index;

            return `${CARD_WIDTH - getCardSummedUpPadding(newIndex - 1)}px`;
        }

        return `${CARD_WIDTH - getCardSummedUpPadding(index)}px`;
    }};

    top: ${({ index = 0, transitions, totalCards = 0 }) => {
        const { toBottom, toTop } = transitions;

        if (toTop) {
            return `${getCardPadding(isLastCard(index, totalCards) ? 0 : index + 1)}px`;
        }

        if (toBottom) {
            const newIndex = index === 0 ? totalCards : index;

            return `${getCardPadding(newIndex - 1)}px`;
        }

        return `${getCardPadding(index)}px`;
    }};

    left: ${({ index = 0, transitions, totalCards = 0 }) => {
        const { toRight, toTop, toBottom, toLeft } = transitions;

        if (toRight && ((toLeft && isLastCard(index, totalCards)) || (!toLeft && index === 0))) {
            return `${CARD_WIDTH}px`;
        }

        if (toTop) {
            return `${getCardPadding(isLastCard(index, totalCards) ? 0 : index + 1)}px`;
        }

        if (toBottom) {
            const newIndex = index === 0 ? totalCards : index;

            return `${getCardPadding(newIndex - 1)}px`;
        }

        return `${getCardPadding(index)}px`;
    }};

    z-index: ${({ index = 0, transitions, totalCards = 0 }) => {
        const { toBottom, toTop } = transitions;

        if (toBottom && index === 0) {
            return 0;
        }

        if (toTop && isLastCard(index, totalCards)) {
            return CARDS_PADDING + 1;
        }

        return CARDS_PADDING - index;
    }};
`;

export const S_SpeedBetCard = styled.div<BackgroundProps>`
    height: ${CARD_HEIGHT}px;
    padding: 12px;
    border-radius: 6px;
    box-shadow: 0 4px 10px 0 ${GenericColors.black + Opacities.opacity25};
    background: ${({ bg = GreenPalette.green4 }) => bg};
    display: flex;
    flex-direction: column;
    color: ${GenericColors.white};
`;

export const S_MarketName = styled.span`
    font-size: 14px;
    font-weight: ${fontWeight.medium};
    letter-spacing: -0.28px;
    text-align: center;
    margin-bottom: 12px;
    max-height: 57px;
    line-height: 19px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const S_ConstraintNote = styled.span`
    margin-bottom: 6px;
    font-size: 10px;
    font-weight: ${fontWeight.regular};
    text-align: center;
    line-height: 14px;
    height: 14px;
    overflow: hidden;
`;

export const S_ContextNote = styled.span`
    font-size: 10px;
    font-weight: ${fontWeight.regular};
    line-height: 14px;
    text-align: center;
    max-height: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const S_Selections = styled.div`
    margin-top: auto;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
`;

export const S_Selection = styled.div`
    display: flex;
    gap: 8px;
    width: 151px;
    height: 33px;
    padding: 6px 12px;
    justify-content: flex-end;
    line-height: 21px;
    cursor: pointer;
`;

export const S_YesSelection = styled(S_Selection)`
    border-radius: 3px 0 0 3px;
    background: ${LightBluePalette.lightBlue6};

    &:hover {
        background: ${LightBluePalette.lightBlue4};
    }
`;

export const S_NoSelection = styled(S_Selection)`
    border-radius: 0 3px 3px 0;
    background: ${RedPalette.red1};

    &:hover {
        background: ${RedPalette.red6};
    }
`;

export const S_SelectionName = styled.div`
    font-size: 12px;
    font-weight: ${fontWeight.regular};
    margin-right: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const S_SelectionPrice = styled.div`
    font-size: 14px;
    font-weight: ${fontWeight.bold};
`;

export const S_NextBetButton = styled.div<NextBetButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    user-select: none;
    cursor: pointer;

    width: 122px;
    height: 32px;
    border-radius: 3px;
    border: 1px solid ${GenericColors.white + Opacities.opacity20};
    margin: 0 6px;

    font-size: 12px;
    font-weight: ${fontWeight.regular};
    line-height: 16px;
    color: ${GenericColors.white};
    background: ${GenericColors.transparent};
    transition: all ${CARD_TRANSITION_TIME}ms cubic-bezier(0, 0, 0, 0.5);

    &:hover {
        background: ${GenericColors.white + Opacities.opacity10};
    }

    ${({ disabled = false }): string => {
        if (!disabled) {
            return ``;
        }

        return `
            cursor: initial;
            pointer-events: none;
            background: ${GenericColors.transparent};
            transition: none;
            border: 1px solid ${GenericColors.white + Opacities.opacity15};
            color: ${GenericColors.white + Opacities.opacity25};

            &&& {
                path {
                    fill: ${GenericColors.white + Opacities.opacity15};
                }
            }

            &:hover {
                background: ${GenericColors.transparent};
            }
        `;
    }}
`;

export const S_PaddingWrapper = styled.div<{ paddingTop: number }>`
    padding-top: ${({ paddingTop = 0 }) => `${paddingTop}px`};
    display: flex;
    justify-content: space-between;
`;

export const S_OddsChangeArrow = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12px !important;
    height: 100%;
    background: ${GenericColors.transparent};

    @keyframes blink-increase {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes last-blink {
        0% {
            opacity: 1;
        }

        99% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    animation:
        blink-increase 0.5s ease-out 0s 6 forwards,
        last-blink 3s ease-out 3s 1 forwards;
`;
