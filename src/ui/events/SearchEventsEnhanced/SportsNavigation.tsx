import { useAtom } from 'jotai';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { sportIconsSelector } from 'src/common/store/icons/selectors';
import { SPORT_ICONS } from 'src/config/sport-icons';
import { S_CountOfGames } from 'src/ui/common/SubNavigation/styled';
import SubNavigationIcon from 'src/ui/common/SubNavigation/SubNavigationIcon';
import { SubNavigationLabel } from 'src/ui/common/SubNavigation/SubNavigationLabel';

import { activeSportAtom } from './store/atoms';
import type { SearchResultsData } from './store/types';
import { S_SlideContent, S_SwiperWrapper } from './styled';

const SportsNavigation = ({ pages }: { pages: SearchResultsData[] }) => {
    const [activeSport, setActiveSport] = useAtom(activeSportAtom);
    const sportIcons = useRecoilValue(sportIconsSelector);

    const sports = useMemo(() => {
        const groupedEvents = groupBy(
            pages.flatMap((page) => page.events),
            (event) => event.sport.id,
        );

        const sportsList = map(groupedEvents, (events) => {
            const { name, displayOrder, id } = events[0].sport;

            return { id, name, displayOrder, eventsCount: events.length };
        });

        const sortedSports = sortBy(sportsList, [(sport) => -sport.displayOrder]);

        if (sortedSports.length) {
            setActiveSport(sortedSports[0].id);
        }

        return sortedSports;
    }, [pages]);

    return (
        <S_SwiperWrapper>
            <Swiper
                slidesPerView='auto'
                navigation
                freeMode={{ enabled: true, minimumVelocity: 0.5 }}
                modules={[Navigation, FreeMode]}
            >
                {sports.map(({ id, name, eventsCount }) => {
                    const iconUrl = sportIcons[id].url;
                    const iconType = SPORT_ICONS[id];

                    return (
                        <SwiperSlide key={id}>
                            <S_SlideContent isActive={id === activeSport} onClick={() => setActiveSport(id)}>
                                <SubNavigationIcon iconUrl={iconUrl} iconType={iconType} testId={name} />
                                <SubNavigationLabel label={name} isNav={false} testId={name} />
                                <S_CountOfGames>{eventsCount}</S_CountOfGames>
                            </S_SlideContent>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </S_SwiperWrapper>
    );
};

export default SportsNavigation;
