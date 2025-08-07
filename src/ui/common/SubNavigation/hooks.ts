import type { RefObject } from 'react';
import { useState, useEffect } from 'react';

export const useVisibleMenuItems = (menuItem: number, containerRef: RefObject<HTMLDivElement>) => {
    const [visibleMenuItems, setVisibleMenuItems] = useState(0);

    useEffect(() => {
        const updateVisibleItems = () => {
            const screenWidth = containerRef.current?.offsetWidth ?? window.innerWidth;
            const visibleCount = Math.floor(screenWidth / menuItem);
            setVisibleMenuItems(visibleCount);
        };

        updateVisibleItems();

        window.addEventListener('resize', updateVisibleItems);

        return () => window.removeEventListener('resize', updateVisibleItems);
    }, [menuItem, containerRef.current?.offsetWidth]);

    return visibleMenuItems;
};
