import Box from '@mui/material/Box';
import { useWindowWidth } from '@solo-hooks';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRecoilValue } from 'recoil';
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import { LeftArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import {
    getCompetitionLocation,
    getCompetitionLocationInfoFromTags,
    getCompetitionLocationLabel,
} from 'src/appState/utils';
import { SportType, RequestStatus } from 'src/common/enums';
import { highlightCompetitionsAtom } from 'src/common/hooks/useHighlightCompetitions/useHighlightCompetitions';
import { sportIconsSelector } from 'src/common/store/icons/selectors';
import { SIMULATED_REALITY_LEAGUES } from 'src/config/config';
import { SPORT_ICONS } from 'src/config/sport-icons';
import { competitionsItemsSelector } from 'src/modules/competitions/selectors';
import { eventsItemsSelector } from 'src/modules/events/selectors';
import {
    competitionLocationItemsSelector,
    competitionLocationItemsStateSelector,
    sportsSportsItemsSelector,
} from 'src/modules/sports/selectors';
import { S_SwiperContainer } from 'src/ui/common/Carousel/styled';
import { I18n } from 'src/ui/common/Language/I18n';
import { getCompetitionsParams } from 'src/utils/breadcrumb';
import { PAGE_ROUTE_NAME } from 'src/utils/constants';
import { getItemByCompetitionLocation } from 'src/utils/detectGroupFormat';
import { encoder } from 'src/utils/encoder';

import AutoScroller from './AutoScroller/AutoScroller';
import BreadcrumbEventPageLinks from './BreadcrumbEventPageLinks';
import { BreadcrumbLink } from './BreadcrumbLink';
import { useGoBack } from './hook';
import { useCompetitionEventById } from './hooks/useCompetitionEventById';
import MobileMatchLeadMedia from './MobileMatchLeadMedia/MobileMatchLeadMedia';
import {
    BackButton,
    S_Wrapper,
    S_BreadcrumbLink,
    S_LiveBreadcrumb,
    S_LiveBreadcrumbWrapper,
    S_PaddingBox,
    S_SwiperWrapper,
    S_LinksWrapper,
} from './styled';
import type { Link } from './types';

const MATCH_LEAD_MEDIA_WIDTH = '100px';

interface Props {
    waitForRequestToComplete?: boolean;
}

const Breadcrumb = ({ waitForRequestToComplete = false }: Props) => {
    const swiperRef = useRef<SwiperType>();

    const events = useSelector(eventsItemsSelector);
    const sports = useSelector(sportsSportsItemsSelector);
    const competitions = useSelector(competitionsItemsSelector);

    const competitionLocations = useSelector(competitionLocationItemsSelector);
    const competitionLocationItemsState = useSelector(competitionLocationItemsStateSelector);

    const {
        language: { getTranslation },
        router: {
            route: { name: routeName, params: routeParams },
        },
        reduxState: { normalizedCompetitionLocations },
        eventsCounter,
        router,
    } = useAppStateContext();

    const { reduxState } = useAppStateContext();

    const competitionEventById = useCompetitionEventById();
    const { isDesktop, isMobile } = useWindowWidth();

    const [showBreadcrumb, setShowBreadcrumb] = useState(false);
    const [breadcrumbLinks, setBreadcrumbLinks] = useState<Link[]>([]);

    const highlightCompetitions = useRecoilValue(highlightCompetitionsAtom);
    const sportIcons = useRecoilValue(sportIconsSelector);

    const handleSwiperInit = useCallback((swiper: SwiperType) => {
        swiperRef.current = swiper;
    }, []);

    const isCompetitionChanged = routeName === PAGE_ROUTE_NAME.competition && routeParams.id;
    const isEventPageRoute = routeName.includes(PAGE_ROUTE_NAME.event);

    const detectSportId = {
        [PAGE_ROUTE_NAME.sport]: routeParams.id,
        [PAGE_ROUTE_NAME.country]: SIMULATED_REALITY_LEAGUES.includes(routeParams.countryId)
            ? routeParams.countryId
            : routeParams.sportId,
        [PAGE_ROUTE_NAME.competition]: routeParams.slug,
        [PAGE_ROUTE_NAME.allcountries]: routeParams.sportId,
    };

    const competitionLocation = getCompetitionLocation(detectSportId[routeName as keyof typeof detectSportId]);
    const isCounterAllowed = routeName === PAGE_ROUTE_NAME.sport || routeName === PAGE_ROUTE_NAME.allcountries;
    const shouldGoBackToHomePage = PAGE_ROUTE_NAME.inplay === routeName;

    const sport = detectSportId[routeName as keyof typeof detectSportId];

    const isMatchLeadMediaVisible = isEventPageRoute && !isDesktop;
    const isMobileEventBreadcrumb =
        isEventPageRoute && isMobile && breadcrumbLinks.some((link) => link.originalRoute === PAGE_ROUTE_NAME.event);

    const { isLoading, total } = useMemo(() => {
        if (!isCounterAllowed || isDesktop) {
            return {
                isLoading: false,
                total: 0,
            };
        }

        return eventsCounter.getEventsCounterList(`in-play-count-${sport}`, { sport });
    }, [sport, isCounterAllowed, isDesktop, eventsCounter]);

    const buildLinks = (routeName: string, activeSport: string, setLinks: Link[]): Link[] => {
        const sportName = get(sports, `${activeSport}.name`, '');

        const sport = [
            {
                route: PAGE_ROUTE_NAME.sport,
                params: { id: activeSport },
                icon: SPORT_ICONS[activeSport] !== undefined ? SPORT_ICONS[activeSport] : 'theme-competitions-all',
                label: (
                    <>
                        {sportName}&nbsp;
                        <I18n langKey='breadcrumb.sport.betting.label' defaultText='Betting' />
                    </>
                ),
            },
        ];

        const { route, ...competitionsConfig } = getCompetitionsParams(normalizedCompetitionLocations, activeSport);

        let links: Link[] = [
            {
                route: route,
                params: { ...competitionsConfig },
                icon: 'sports-globe',
                label: <I18n langKey='breadcrumb.competitions.label' defaultText='Competitions' />,
                highlighted: false,
            },
        ];

        if (routeName === PAGE_ROUTE_NAME.sport || routeName === PAGE_ROUTE_NAME.allcountries) {
            links = sport;
        } else if ([PAGE_ROUTE_NAME.event, PAGE_ROUTE_NAME.inplay].some((name) => name === routeName)) {
            links = setLinks;
        } else {
            links = [...sport, ...links, ...setLinks];
        }

        return links;
    };

    const getBreadcrumbLinks = (routeName: string): Link[] => {
        let links: Link[] = [];

        if (waitForRequestToComplete && competitionLocationItemsState === RequestStatus.Progress) {
            return [];
        }

        switch (routeName) {
            case PAGE_ROUTE_NAME.allcountries: {
                links = buildLinks(PAGE_ROUTE_NAME.allcountries, routeParams.sportId, []);

                break;
            }

            case PAGE_ROUTE_NAME.inplay: {
                links = buildLinks(PAGE_ROUTE_NAME.inplay, '', [
                    {
                        route: PAGE_ROUTE_NAME.inplay,
                        icon: 'theme-live',
                        label: <I18n langKey='breadcrumb.inlive.betting.label' defaultText='Live' />,
                    },
                ]);

                break;
            }

            case PAGE_ROUTE_NAME.sport: {
                links = buildLinks(PAGE_ROUTE_NAME.sport, routeParams.id, []);

                break;
            }

            case PAGE_ROUTE_NAME.country: {
                const { sportId, countryId, competitionId } = routeParams;
                const { locationKey, locationLabel } = getItemByCompetitionLocation(
                    competitionLocations,
                    competitionLocation,
                    routeName,
                    countryId,
                );

                links = buildLinks(PAGE_ROUTE_NAME.country, sportId, [
                    {
                        route: PAGE_ROUTE_NAME.country,
                        params: {
                            sportId: sportId,
                            countryId: countryId,
                            competitionId: competitionId,
                        },
                        icon: 'theme-competitions-all',
                        label: getCompetitionLocationLabel(getTranslation, locationKey, locationLabel),
                    },
                ]);

                break;
            }

            case PAGE_ROUTE_NAME.competition: {
                const { id, slug } = routeParams;
                let locationName;
                let competitionLabel;
                const { competitionName, locationLabel, locationKey, isCompetition, competitionLocationItem } =
                    getItemByCompetitionLocation(competitionLocations, competitionLocation, routeName, id);

                const highlightItem = highlightCompetitions?.find((highlight) => highlight.id.toString() === id);

                if (competitionName) {
                    locationName = getCompetitionLocationLabel(getTranslation, locationKey, locationLabel);
                    competitionLabel = competitionName;
                } else if (highlightItem !== undefined) {
                    competitionLabel = highlightItem.name;
                    locationName = getCompetitionLocationLabel(getTranslation, locationKey, locationLabel);
                }

                const preparingLinks: Link[] = [
                    {
                        route: PAGE_ROUTE_NAME.country,
                        params: {
                            sportId: slug,
                            countryId: locationKey,
                        },
                        icon: 'theme-competitions-all',
                        label: locationName,
                    },
                ];

                if (isCompetition) {
                    const iconUrl =
                        reduxState.competitionIcons.getIn([get(highlightItem, 'platformObject.id'), 'url']) ??
                        reduxState.competitionIcons.getIn([competitionLocationItem?.platformObject.id, 'url']);

                    preparingLinks.push({
                        route: PAGE_ROUTE_NAME.competition,
                        params: { id: id, slug: slug },
                        icon: 'theme-competitions-all',
                        label: competitionLabel,
                        iconUrl,
                    });
                }

                links = buildLinks(PAGE_ROUTE_NAME.competition, slug, preparingLinks);

                break;
            }

            case PAGE_ROUTE_NAME.event: {
                let tag, category: string | undefined, categoryLabel;

                if (!isUndefined(competitionEventById)) {
                    const competitionInfo = getCompetitionLocationInfoFromTags(competitionEventById?.tags);
                    tag = competitionInfo.tag;
                    category = competitionInfo.category;
                    categoryLabel = competitionInfo.categoryLabel;
                }

                const isSimulatedRealityLeague = category !== undefined && SIMULATED_REALITY_LEAGUES.includes(category);
                const isESoccer = competitionEventById?.originalSport === SportType.ESoccer;
                const sportLabel = isSimulatedRealityLeague ? category : categoryLabel;
                const locationIcon = reduxState.getCompetitionLocationIconUrl(tag, category);
                const iconUrl = reduxState.getCompetitionIconUrl(competitionEventById);
                const location = isESoccer
                    ? getTranslation('sport-name.esoccer', 'eSoccer')
                    : getCompetitionLocationLabel(getTranslation, category, categoryLabel, false);

                const eSoccerIcon = get(sportIcons, competitionEventById?.sport as string, { url: '' });

                links = buildLinks(PAGE_ROUTE_NAME.event, routeParams.slug, [
                    {
                        route: PAGE_ROUTE_NAME.competition,
                        originalRoute: PAGE_ROUTE_NAME.event,
                        params: { id: competitionEventById?.id, slug: competitionEventById?.sport },
                        label: (
                            <BreadcrumbEventPageLinks
                                location={location}
                                category={category}
                                sport={sport}
                                sportLabel={sportLabel}
                                locationIcon={locationIcon}
                                eSoccerIconUrl={eSoccerIcon.url}
                                iconUrl={iconUrl}
                                competitionEventById={competitionEventById}
                            />
                        ),
                    },
                ]);

                break;
            }

            default:
                links = [];
        }

        return links;
    };

    const goToPreviousPage = useGoBack();
    const handleGoBack = shouldGoBackToHomePage ? () => router.redirect(PAGE_ROUTE_NAME.homepage) : goToPreviousPage;

    const liveBreadcrumbLink = useMemo(() => {
        const showLiveBreadcrumb =
            total !== undefined &&
            total > 0 &&
            routeName !== PAGE_ROUTE_NAME.inplay &&
            routeName !== PAGE_ROUTE_NAME.event;

        if (showLiveBreadcrumb) {
            return (
                <S_LiveBreadcrumbWrapper>
                    <S_LiveBreadcrumb
                        route='inplay'
                        params={{ id: detectSportId[routeName as keyof typeof detectSportId] }}
                        testId='liveBreadcrumb'
                    >
                        <BreadcrumbLink
                            label={<I18n langKey='live.bar.link.live' defaultText='Live' />}
                            icon='theme-right'
                            counter={total}
                            liveType={true}
                        />
                    </S_LiveBreadcrumb>
                </S_LiveBreadcrumbWrapper>
            );
        }

        return null;
    }, [total, routeName]);

    useEffect(() => {
        if (routeName === PAGE_ROUTE_NAME.sport && isDesktop) {
            setShowBreadcrumb(false);
        } else {
            const links = getBreadcrumbLinks(routeName);
            setBreadcrumbLinks(links);

            setShowBreadcrumb(true);
        }
    }, [
        routeName,
        isCompetitionChanged,
        isDesktop,
        competitions,
        events,
        sports,
        isLoading,
        total,
        competitionLocations,
        normalizedCompetitionLocations,
        highlightCompetitions,
    ]);

    if (!showBreadcrumb) {
        return null;
    }

    const breadcrumbNavigationWidth = isMatchLeadMediaVisible ? `calc(100% - ${MATCH_LEAD_MEDIA_WIDTH})` : '100%';

    if (isMobileEventBreadcrumb) {
        return (
            <S_Wrapper>
                <Box sx={{ display: 'flex', alignItems: 'center', width: breadcrumbNavigationWidth }}>
                    <BackButton data-testid='breadcrumbBackButton' onClick={handleGoBack}>
                        <S_PaddingBox>
                            <LeftArrowIcon fontSize='small' color={cssColor('--icon-generic-color')} />{' '}
                        </S_PaddingBox>
                    </BackButton>
                    <S_LinksWrapper>
                        <AutoScroller>
                            {breadcrumbLinks.map(({ route, params, label, icon, counter, liveType, iconUrl }, idx) => {
                                const textKey = !isNil(label) ? label.toString() : '';
                                const id = params?.id ?? '';

                                const isESoccer = isString(label) && label.toLowerCase() === SportType.ESoccer;

                                const imageUrl =
                                    iconUrl || get(sportIcons, [isESoccer ? SportType.ESoccer : id, 'url']);

                                return (
                                    <S_BreadcrumbLink
                                        route={route}
                                        params={params}
                                        testId='breadcrumb'
                                        key={encoder(textKey, idx)}
                                    >
                                        <BreadcrumbLink
                                            label={label}
                                            icon={icon}
                                            counter={counter}
                                            liveType={liveType}
                                            imageUrl={imageUrl}
                                        />
                                    </S_BreadcrumbLink>
                                );
                            })}
                        </AutoScroller>
                        {liveBreadcrumbLink}
                    </S_LinksWrapper>
                </Box>
                {isMatchLeadMediaVisible && <MobileMatchLeadMedia />}
            </S_Wrapper>
        );
    }

    return (
        <S_Wrapper>
            <Box sx={{ display: 'flex', alignItems: 'center', width: breadcrumbNavigationWidth }}>
                <BackButton data-testid='breadcrumbBackButton' onClick={handleGoBack}>
                    <S_PaddingBox>
                        <LeftArrowIcon fontSize='small' color={cssColor('--icon-generic-color')} />{' '}
                    </S_PaddingBox>
                </BackButton>
                <S_SwiperWrapper>
                    <S_SwiperContainer>
                        <Swiper
                            data-testid='breadcrumbSwiper'
                            modules={[Navigation, FreeMode]}
                            onBeforeInit={handleSwiperInit}
                            slidesPerView='auto'
                            navigation
                            freeMode
                        >
                            {breadcrumbLinks.map(({ route, params, label, icon, counter, liveType, iconUrl }, idx) => {
                                const textKey = !isNil(label) ? label.toString() : '';
                                const id = params?.id ?? '';

                                const isESoccer = isString(label) && label.toLowerCase() === SportType.ESoccer;

                                const imageUrl =
                                    iconUrl || get(sportIcons, [isESoccer ? SportType.ESoccer : id, 'url']);

                                return (
                                    <SwiperSlide
                                        key={encoder(textKey, idx)}
                                        style={{
                                            width: 'auto',
                                            flexShrink: '0',
                                            display: 'block',
                                            height: '100%',
                                            maxHeight: ' 100%',
                                        }}
                                    >
                                        <S_BreadcrumbLink route={route} params={params} testId='breadcrumb'>
                                            <BreadcrumbLink
                                                label={label}
                                                icon={icon}
                                                counter={counter}
                                                liveType={liveType}
                                                imageUrl={imageUrl}
                                            />
                                        </S_BreadcrumbLink>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </S_SwiperContainer>
                    {liveBreadcrumbLink}
                </S_SwiperWrapper>
            </Box>
            {isMatchLeadMediaVisible && <MobileMatchLeadMedia />}
        </S_Wrapper>
    );
};

export default observer(Breadcrumb);
