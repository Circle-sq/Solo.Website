import { useWindowWidth } from '@sc-hooks';
import filter from 'lodash/filter';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRecoilValue, useRecoilCallback } from 'recoil';

import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';

import { Direction } from '../../../enums';
import { speedBetMarketsAtom } from '../../../store/atoms';
import { moveFirstToLastSpeedMarketTask, moveLastToFirstSpeedMarketTask } from '../../../store/tasks';

import NavigationButton from './NavigationButton';
import SpeedBetQuestionCard from './SpeedBetQuestionCard';
import { S_CardsStack, S_CardTransitionWrapper, S_PaddingWrapper, S_Wrapper } from './styled';
import { CARD_HEIGHT, CARD_TRANSITION_TIME, CARDS_PADDING, isMarketVisible, MAX_CARDS_DISPLAYED } from './utils';

const MINIMUM_CARDS_FOR_SHUFFLE = 2;

const SpeedBetCards = () => {
    const [transitions, setTransitions] = useState({
        toRight: false,
        toBottom: false,
        toTop: false,
        toLeft: false,
    });

    const { isTablet } = useWindowWidth();

    const speedBetMarkets = useRecoilValue(speedBetMarketsAtom);

    const moveFirstToLastTask = useRecoilCallback(moveFirstToLastSpeedMarketTask, []);
    const moveLastToFirstTask = useRecoilCallback(moveLastToFirstSpeedMarketTask, []);

    const [visibleMarkets, hiddenMarkets] = useMemo(() => {
        const visibleMarkets = filter(speedBetMarkets.markets, isMarketVisible);

        if (visibleMarkets.length <= MAX_CARDS_DISPLAYED) {
            return [visibleMarkets.slice(0, MAX_CARDS_DISPLAYED), []];
        }

        const firstThree = [visibleMarkets[0], visibleMarkets[1], visibleMarkets[visibleMarkets.length - 1]];
        const marketIds = firstThree.map((market) => market?.id || market?.market?.id);

        const lastThree = visibleMarkets.slice(-MAX_CARDS_DISPLAYED).filter((market) => {
            const marketId = market?.id || market?.market?.id;

            return !marketIds.includes(marketId);
        });

        return [firstThree, lastThree];
    }, [speedBetMarkets.markets]);

    const visibleCardsLength = Math.min(MAX_CARDS_DISPLAYED, visibleMarkets.length);
    const hasMultipleVisibleCards = visibleCardsLength > 1;

    const nextButtonOffset = CARD_HEIGHT + visibleCardsLength * CARDS_PADDING;

    const disableNavigationButtons = visibleCardsLength === 1;

    const moveFirstToLast = () => {
        if (visibleCardsLength < MINIMUM_CARDS_FOR_SHUFFLE) {
            return;
        }
        moveFirstToLastTask();
    };

    const moveLastToFirst = () => {
        if (visibleCardsLength < MINIMUM_CARDS_FOR_SHUFFLE) {
            return;
        }
        moveLastToFirstTask();
    };

    const startNextTransition = () => {
        if (transitions.toBottom || transitions.toRight || transitions.toTop) {
            return;
        }
        setTransitions((prev) => ({ ...prev, toLeft: false, toRight: true }));
        setTimeout(() => {
            setTransitions((prev) => ({ ...prev, toRight: false, toBottom: true }));
            setTimeout(() => setTransitions((prev) => ({ ...prev, toBottom: false })), CARD_TRANSITION_TIME);
        }, CARD_TRANSITION_TIME);
    };

    const startPreviousTransition = () => {
        if (transitions.toBottom || transitions.toRight || transitions.toTop) {
            return;
        }
        setTransitions((prev) => ({ ...prev, toLeft: true, toRight: true }));
        setTimeout(() => {
            setTransitions((prev) => ({ ...prev, toTop: true, toRight: false }));
            setTimeout(() => setTransitions((prev) => ({ ...prev, toTop: false })), CARD_TRANSITION_TIME);
        }, CARD_TRANSITION_TIME);
    };

    const handlers = useSwipeable({
        onSwipedLeft: hasMultipleVisibleCards ? startPreviousTransition : undefined,
        onSwipedRight: hasMultipleVisibleCards ? startNextTransition : undefined,
        delta: 20,
    });

    const prevTransitionToBottomValue = useRef(transitions.toBottom);
    const prevTransitionToTopValue = useRef(transitions.toTop);

    const finishedTransition =
        (prevTransitionToBottomValue.current && !transitions.toRight && !transitions.toBottom) ||
        (prevTransitionToTopValue.current && !transitions.toRight && !transitions.toTop);

    useEffect(() => {
        if (finishedTransition) {
            if (transitions.toLeft) {
                moveLastToFirst();
                setTransitions((prev) => ({ ...prev, toLeft: false }));
            } else {
                moveFirstToLast();
            }
        }
        prevTransitionToBottomValue.current = transitions.toBottom;
        prevTransitionToTopValue.current = transitions.toTop;
    }, [transitions.toBottom, transitions.toTop]);

    return (
        <S_Wrapper {...(isTablet && hasMultipleVisibleCards ? handlers : {})}>
            <S_CardsStack data-testid='speedBetCardsStack'>
                {!finishedTransition &&
                    visibleMarkets.map((market, index) => {
                        const marketId = market.id || market?.market?.id;

                        return (
                            <S_CardTransitionWrapper
                                data-testid={`speedBetCardsIndex-${index}`}
                                key={marketId}
                                totalCards={visibleCardsLength}
                                index={index}
                                transitions={transitions}
                            >
                                <SubscribeElement
                                    id={marketId}
                                    parentId={market?.event?.id}
                                    subKey={SubKey.speed_bet_market}
                                    revision={market.revision}
                                >
                                    <SpeedBetQuestionCard market={market} />
                                </SubscribeElement>
                            </S_CardTransitionWrapper>
                        );
                    })}
                {hiddenMarkets.map((market) => {
                    const marketId = market.id || market?.market?.id;

                    return (
                        <SubscribeElement
                            key={marketId}
                            id={marketId}
                            parentId={market?.event?.id}
                            subKey={SubKey.speed_bet_market_hidden}
                            revision={market.revision}
                        />
                    );
                })}
            </S_CardsStack>

            {!isTablet && (
                <S_PaddingWrapper paddingTop={nextButtonOffset}>
                    <NavigationButton
                        startTransition={startPreviousTransition}
                        disabled={disableNavigationButtons}
                        direction={Direction.Previous}
                    />
                    <NavigationButton
                        startTransition={startNextTransition}
                        disabled={disableNavigationButtons}
                        direction={Direction.Next}
                    />
                </S_PaddingWrapper>
            )}
        </S_Wrapper>
    );
};

export default SpeedBetCards;
