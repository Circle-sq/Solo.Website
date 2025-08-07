import { useRef, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

import { S_AutoScroller, S_AutoScrollerContent } from './styled';

const AutoScroller = ({ children }: PropsWithChildren) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [shouldScroll, setShouldScroll] = useState<boolean>(false);

    useEffect(() => {
        if (contentRef.current && containerRef.current) {
            const contentWidth = contentRef.current.scrollWidth;
            const containerWidth = containerRef.current.clientWidth;

            setContainerWidth(containerWidth);
            setShouldScroll(contentWidth > containerWidth);
        }
    }, [children]);

    return (
        <S_AutoScroller ref={containerRef}>
            <S_AutoScrollerContent ref={contentRef} containerWidth={containerWidth} shouldScroll={shouldScroll}>
                {children}
            </S_AutoScrollerContent>
        </S_AutoScroller>
    );
};

export default AutoScroller;
