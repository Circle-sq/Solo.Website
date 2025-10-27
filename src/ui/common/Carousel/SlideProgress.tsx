import { useEffect } from 'react';
import type { Swiper } from 'swiper/types';

import useTimer, { TimerStatus } from 'src/utils/hooks/useTimer';
import { NUMBERS } from 'src/utils/constants';

interface Props {
    swiperInstance: Swiper;
    delay: number;
    transition?: number;
    isPaused: boolean;
}

const SlideProgress = ({ swiperInstance, delay, isPaused }: Props) => {
    const { status, start, pause, reset } = useTimer({
        step: 1,
        endTime: 100,
        interval: delay / NUMBERS.hundred,
        onTimeOver: () => {
            swiperInstance.slideNext();
        },
    });

    useEffect(() => {
        if (status === TimerStatus.Stopped) {
            start();
        }
    }, [status, start]);

    useEffect(() => {
        swiperInstance.on('slideChangeTransitionEnd', () => {
            reset();
        });

        swiperInstance.on('touchMove', () => {
            reset();
        });

        return () => {
            swiperInstance.off('slideChangeTransitionStart');
            swiperInstance.off('slideChangeTransitionEnd');
            swiperInstance.off('touchMove');
            swiperInstance.off('sliderMove');
        };
    }, [swiperInstance, reset]);

    useEffect(() => {
        if (isPaused) {
            pause();
        } else if (status !== TimerStatus.Running) {
            start();
        }
    }, [isPaused, status, start, pause]);

    return <></>;
};

export default SlideProgress;
