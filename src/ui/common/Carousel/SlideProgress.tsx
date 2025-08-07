import { useEffect, useState } from 'react';
import type { Swiper } from 'swiper/types';

import useTimer, { TimerStatus } from 'src/utils/hooks/useTimer';
import { S_ProgressBar } from './styled';
import { NUMBERS } from 'src/utils/constants';

interface Props {
    swiperInstance: Swiper;
    delay: number;
    transition: number;
    isPaused: boolean;
}

const SlideProgress = ({ swiperInstance, delay, transition, isPaused }: Props) => {
    const [isReset, setIsReset] = useState(false);

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
        swiperInstance.on('slideChangeTransitionStart', () => {
            setIsReset(true);
        });

        swiperInstance.on('slideChangeTransitionEnd', () => {
            reset();
            setIsReset(false);
        });

        swiperInstance.on('touchMove', () => {
            setIsReset(true);
            reset();
        });

        swiperInstance.on('sliderMove', () => {
            setIsReset(false);
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

    const duration = (delay + transition) / NUMBERS.thousand;

    return <S_ProgressBar duration={duration} isPaused={isPaused} isReset={isReset} />;
};

export default SlideProgress;
