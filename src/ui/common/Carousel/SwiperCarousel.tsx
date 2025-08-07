import isUndefined from 'lodash/isUndefined';
import { Children, useCallback, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { useDeviceSelectors } from 'react-device-detect';
import { FreeMode, Navigation } from 'swiper/modules';
import type { SwiperProps } from 'swiper/react';
import { Swiper as SwiperSlider } from 'swiper/react';
import type { Swiper } from 'swiper/types';

import NavButtons from './NavButtons';
import SlideProgress from './SlideProgress';
import { SwiperContainer } from './styled';

interface Props {
    options: SwiperProps;
    autoplayDelay: number;
    themeColor: 'dark';
    navButtonsOffset: number;
}

const MIN_SIZE_TO_ANIMATE = 1;
const TRANSITION_DURATION = 350;

const SwiperCarousel = ({
    children,
    options,
    autoplayDelay,
    themeColor,
    navButtonsOffset = 0,
}: PropsWithChildren<Props>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [selectors] = useDeviceSelectors(window.navigator.userAgent);
    const { isMobile } = selectors as Record<string, boolean>;

    const [swiperInstance, setSwiperInstance] = useState<Swiper>();
    const [isPaused, setIsPaused] = useState(false);

    const swiperProps: SwiperProps = {
        loop: false,
        speed: TRANSITION_DURATION,
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-nav-next',
            prevEl: '.swiper-nav-prev',
        },
        modules: [Navigation, FreeMode],
        freeMode: {
            enabled: true,
            minimumVelocity: 0.5,
        },
        watchSlidesProgress: true,
        grabCursor: true,
        simulateTouch: false,
        onInit: (swiper: Swiper) => {
            setSwiperInstance(swiper);
        },
        onTouchStart: () => setIsPaused(true),
        onTouchEnd: () => setIsPaused(false),
        ...options,
    };

    const onMouseEnter = useCallback(() => {
        if (swiperInstance && !isMobile) {
            setIsPaused(true);
        }
    }, [swiperInstance, isMobile]);

    const onMouseLeave = useCallback(() => {
        if (swiperInstance && !isMobile) {
            setIsPaused(false);
        }
    }, [swiperInstance, isMobile]);

    const isAnimateSlides = Children.count(children) > MIN_SIZE_TO_ANIMATE;

    return (
        <SwiperContainer ref={containerRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} showButtonsOnHover>
            <SwiperSlider {...swiperProps}>
                {children}
                {isAnimateSlides && <NavButtons offset={navButtonsOffset} themeColor={themeColor} />}
            </SwiperSlider>

            {isAnimateSlides && !isUndefined(autoplayDelay) && !isUndefined(swiperInstance) && (
                <SlideProgress
                    swiperInstance={swiperInstance}
                    delay={autoplayDelay}
                    transition={swiperProps.speed ?? 0}
                    isPaused={isPaused}
                />
            )}
        </SwiperContainer>
    );
};

export default SwiperCarousel;
