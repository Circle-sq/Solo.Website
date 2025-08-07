import { useEffect, useRef } from 'react';
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper/types';

import { S_Item } from 'src/ui/common/ButtonGroup/styled';
import { S_SwiperButtonContainer } from 'src/ui/events/EventsList/styled';
import type { DropdownItem } from 'src/ui/events/EventsList/types';

interface Props {
    options: DropdownItem[];
    onChange: (selected: string, index?: number) => void;
    selected: string[];
}

const EventListSwiper = ({ options, onChange, selected }: Props) => {
    const swiperRef = useRef<SwiperCore>();

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.updateSlides();
        }
    }, [options]);

    if (options === undefined || options === null) {
        return null;
    }

    const onButtonClick = (value: string, index: number) => {
        onChange(value, index);
    };

    return (
        <Swiper
            onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
            }}
            slidesPerView={'auto'}
            freeMode={{
                enabled: true,
                minimumVelocity: 0.5,
            }}
            modules={[Navigation, FreeMode]}
            style={{ marginLeft: '5px', marginRight: 'auto' }}
        >
            {options.map(({ value }, i) => (
                <SwiperSlide style={{ width: 'auto' }} key={value}>
                    <S_SwiperButtonContainer>
                        <S_Item
                            data-testid={selected[i]}
                            selected={selected[0] === value}
                            onClick={() => onButtonClick(value, 0)}
                        >
                            {value}
                        </S_Item>
                    </S_SwiperButtonContainer>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default EventListSwiper;
