import { useEffect, useRef, useState, useCallback } from 'react';
import type { PropsWithChildren } from 'react';

import { S_MarketWrapper, S_MarketLabel } from './styled';

const SCROLL_MULTIPLIER = 2;
const SCROLL_DELAY = 4;

const MarketLabel = ({ children }: PropsWithChildren) => {
    const [scrollDuration, setScrollDuration] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const marketWrapperRef = useRef<HTMLDivElement | null>(null);
    const marketLabelRef = useRef<HTMLDivElement | null>(null);

    const calculateDuration = useCallback(() => {
        if (marketLabelRef.current && marketWrapperRef.current) {
            const textWidth = marketLabelRef.current.scrollWidth;
            const containerWidth = marketWrapperRef.current.clientWidth;

            if (textWidth > containerWidth) {
                setContainerWidth(containerWidth);
                const duration = (textWidth - containerWidth) / 100;
                setScrollDuration(duration);
                setIsScrolling(true);
            } else {
                setIsScrolling(false);
            }
        }
    }, []);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => calculateDuration());

        if (marketWrapperRef.current) {
            resizeObserver.observe(marketWrapperRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [calculateDuration]);

    useEffect(() => {
        calculateDuration();
    }, [children, calculateDuration]);

    return (
        <S_MarketWrapper ref={marketWrapperRef}>
            <S_MarketLabel
                ref={marketLabelRef}
                isScrolling={isScrolling}
                containerWidth={containerWidth}
                animationDuration={scrollDuration * SCROLL_MULTIPLIER + SCROLL_DELAY}
            >
                {children}
            </S_MarketLabel>
        </S_MarketWrapper>
    );
};

export default MarketLabel;
