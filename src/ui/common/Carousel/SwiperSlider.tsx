import get from 'lodash/get';
import { type ReactNode, useEffect, useRef } from 'react';
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper/types';

import { S_SwiperContainer } from './styled';

interface Props {
    children: ReactNode[];
}

const SwiperSlider = ({ children }: Props) => {
    const swiperRef = useRef<SwiperCore>();

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.updateSlides();
        }
    }, [children]);

    if (children === undefined || children === null) {
        return <></>;
    }

    return (
        <S_SwiperContainer>
            <Swiper
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                slidesPerView={'auto'}
                navigation={true}
                freeMode={{
                    enabled: true,
                    minimumVelocity: 0.5,
                }}
                modules={[Navigation, FreeMode]}
            >
                {children.map((child, i: number) => {
                    const key = get(child, 'key', `tnb-slide-${i}`);

                    return <SwiperSlide key={key}>{child}</SwiperSlide>;
                })}
            </Swiper>
        </S_SwiperContainer>
    );
};

export default SwiperSlider;
