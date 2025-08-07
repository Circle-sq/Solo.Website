import { format } from 'date-fns';
import map from 'lodash/map';
import omit from 'lodash/omit';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper/types';

import { useAppStateContext } from 'src/appState/AppState';
import { I18n } from 'src/ui/common/Language/I18n';
import { isLoadingFiltersEventsAtom, selectedDayAtom } from 'src/ui/crossbetting/store/atoms';
import { getDateRange } from 'src/utils/date';

import { S_FilterItem, S_SwiperWeekFilterContainer, S_FilterContainer } from './styled';

const WEEK_RANGE = 7;

const WeekFilter = () => {
    const {
        router: { route },
    } = useAppStateContext();
    const isLoading = useRecoilValue(isLoadingFiltersEventsAtom);
    const [selectedDay, setSelectedDay] = useRecoilState(selectedDayAtom);

    const swiperRef = useRef<SwiperCore>();

    const weekRange = getDateRange(WEEK_RANGE);

    const params = omit(route.params, ['countryId', 'competitionId']);

    const handleSwiperInit = useCallback((swiper: SwiperCore) => {
        swiperRef.current = swiper;
    }, []);

    useEffect(() => {
        if (!swiperRef.current || selectedDay === null) {
            return;
        }
        swiperRef.current.slideTo(selectedDay);
    }, [selectedDay]);

    return (
        <S_FilterContainer data-testid='weekFilter'>
            <S_SwiperWeekFilterContainer>
                <Swiper
                    initialSlide={parseInt(route.params.day)}
                    onBeforeInit={handleSwiperInit}
                    slidesPerView='auto'
                    navigation
                    freeMode={{
                        enabled: true,
                        minimumVelocity: 0.5,
                    }}
                    modules={[Navigation, FreeMode]}
                >
                    {map(weekRange, (day, index) => {
                        const isActive = index === parseInt(route.params.day);
                        const isActiveEnabled = isActive && !isLoading;
                        const isLoadingEnabled = isActive && isLoading;

                        const dayOfMonth = format(day, 'MM.dd');
                        const dayOfWeek = format(day, 'eee');

                        return (
                            <SwiperSlide key={index}>
                                <S_FilterItem
                                    key={dayOfMonth}
                                    active={isActiveEnabled}
                                    loading={isLoadingEnabled}
                                    route={route.name}
                                    params={{ ...params, day: index }}
                                    testId={`date-${dayOfMonth}`}
                                    onClick={() => setSelectedDay(index)}
                                >
                                    <span>{dayOfMonth}</span>
                                    &nbsp; (
                                    <I18n langKey={`crossbetting.filters.date.${dayOfWeek}`} defaultText={dayOfWeek} />)
                                </S_FilterItem>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </S_SwiperWeekFilterContainer>
        </S_FilterContainer>
    );
};

export default observer(WeekFilter);
