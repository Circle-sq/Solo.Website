import classnames from 'classnames';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import { observer } from 'mobx-react-lite';
import type { MouseEvent } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper/types';

import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';
import { sportIconsSelector } from 'src/common/store/icons/selectors';
import { S_SwiperContainer } from 'src/ui/common/Carousel/styled';
import { S_ContentIcon } from 'src/ui/common/NavigationList/styled';
import { S_CountOfGames } from 'src/ui/common/SubNavigation/styled';
import useCrossBetSportCounters from 'src/ui/crossbetting/hooks/useCrossBetSportCounters';

import { selectedSportAtom, sportTypeAtom } from '../store/atoms';

import { Container, CrossbetSubNavMenu, CrossbetSubNavSpan, S_NavMenuLinkContainer, S_NavMenuLink } from './styled';
import type { CrossSportLink } from './types';

const CrossBettingSports = () => {
    const swiperRef = useRef<SwiperCore>();

    const { router } = useAppStateContext();

    const {
        route: {
            params: { day, sport: sportType, countryId },
        },
    } = router;

    const [selectedSport, setSelectedSport] = useRecoilState(selectedSportAtom);
    const setSportType = useSetRecoilState(sportTypeAtom);

    const counterLinks = useCrossBetSportCounters();
    const countersSortedFilter = orderBy(counterLinks, 'displayOrder', 'desc');
    const sportIcons = useRecoilValue(sportIconsSelector);

    const handleSwiperInit = useCallback((swiper: SwiperCore) => {
        swiperRef.current = swiper;
    }, []);

    useEffect(() => {
        if (selectedSport) {
            router.updateQueryParams({ sport: selectedSport });
        }
    }, [selectedSport]);

    useEffect(() => {
        const activeIndex = countersSortedFilter.findIndex((sport: CrossSportLink) => sport.sportId === sportType);

        if (!swiperRef.current || activeIndex === -1) {
            return;
        }

        swiperRef.current?.slideTo(activeIndex);
    }, [sportType]);

    const onNavMenuLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        const sport = e.currentTarget.getAttribute('data-param');
        e.preventDefault();
        e.stopPropagation();

        if (sport === null) {
            return;
        }

        setSelectedSport(sport);
        setSportType(sport);

        countryId ? router.redirectToCrossPage({ sport, day }) : router.updateQueryParams({ sport });
    };

    if (!countersSortedFilter.length) {
        return <Container />;
    }

    return (
        <Container>
            <CrossbetSubNavMenu isNav={false} data-testid='crossbetSportsAvailable'>
                <S_SwiperContainer>
                    <Swiper
                        data-testid='crossBettingSportsSwiper'
                        onBeforeInit={handleSwiperInit}
                        slidesPerView='auto'
                        navigation
                        freeMode={{
                            enabled: true,
                            minimumVelocity: 0.5,
                        }}
                        modules={[Navigation, FreeMode]}
                    >
                        {countersSortedFilter.map((crossSport: CrossSportLink) => {
                            const { sportId, label, count } = crossSport;
                            const isActive = sportType === sportId;
                            const sportIcon =
                                sportId === SportType.All ? get(sportIcons, 'sports-all') : get(sportIcons, sportId);

                            const className = classnames([
                                crossSport?.icon,
                                {
                                    active: isActive,
                                    [`link ${crossSport?.icon}`]: true,
                                    link: true,
                                },
                                'sub_nav',
                            ]);

                            return (
                                <SwiperSlide key={sportId}>
                                    <S_NavMenuLink
                                        title={''}
                                        urlParam={sportId}
                                        testId={`${sportId}CrossbetTab`}
                                        params={{ ...router.route.params, day, sport: sportType }}
                                        onClick={onNavMenuLinkClick}
                                        isActive={isActive || countersSortedFilter.length === 1}
                                    >
                                        <S_NavMenuLinkContainer className={sportIcon?.url ? '' : className}>
                                            {sportIcon?.url ? (
                                                <S_ContentIcon
                                                    className='crossbet-sub-nav'
                                                    src={sportIcon?.url}
                                                    isLoaded
                                                />
                                            ) : null}
                                            {count !== undefined ? (
                                                <S_CountOfGames className='count-of-games'>{count}</S_CountOfGames>
                                            ) : null}
                                        </S_NavMenuLinkContainer>
                                        <CrossbetSubNavSpan isNav={true} isCrossBet>
                                            {label}
                                        </CrossbetSubNavSpan>
                                    </S_NavMenuLink>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </S_SwiperContainer>
            </CrossbetSubNavMenu>
        </Container>
    );
};

export default observer(CrossBettingSports);
