import { useWindowWidth as useWidth } from '@react-hook/window-size';

import { BreakPoints } from '@solo-ui/system';

const defaultDelay = 150;

/**
 * useWindowWidth
 *
 * @hook A hook that returns the current width of the window and the main breakpoint flags. This hook is debounced (150ms).
 *
 * @return Return width: the current clientWidth
 * @return Return isMobile: width <= 500px
 * @return Return isTabletSmall: width <= 768px
 * @return Return isTablet: width <= 960px
 * @return Return isLaptop: width < 1280px
 * @return Return isDesktop: width >= 1280px
 */

export const useWindowWidth = ({ delay = defaultDelay }: { delay?: number } = {}) => {
    const width = useWidth({
        initialWidth: 1360,
        wait: delay,
    });

    const isMobile = width <= BreakPoints.phone;
    const isMobileLandscape = width <= BreakPoints.phoneLandscape;
    const isTabletSmall = width <= BreakPoints.smallTablet;
    const isTablet = width <= BreakPoints.tablet;
    const isLaptop = width < BreakPoints.desktop;
    const isDesktop = width >= BreakPoints.desktop;

    return {
        width,
        isMobile,
        isMobileLandscape,
        isTabletSmall,
        isTablet,
        isLaptop,
        isDesktop,
    };
};
