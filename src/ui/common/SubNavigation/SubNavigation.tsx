import { searchFlagSelector } from '@sc-feature-flags';
import { useWindowWidth } from '@sc-hooks';
import classnames from 'classnames';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import find from 'lodash/find';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { observer } from 'mobx-react-lite';
import type { MouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper/types';
import { useScrollLock } from 'usehooks-ts';

import { useAppStateContext } from 'src/appState/AppState';
import { useEventCounters } from 'src/appState/customHooks';
import { RouteName } from 'src/common/enums';
import { toggleState } from 'src/common/helpers/state';
import { sportIconsSelector } from 'src/common/store/icons/selectors';
import { SPORT_ICONS } from 'src/config/sport-icons';
import { isStandalone } from 'src/infra.client';
import { isLiveSportsModalOpenAtom, isSearchModalOpenAtom, isSportModalOpenAtom } from 'src/store/common/atoms';
import { S_SwiperContainer } from 'src/ui/common/Carousel/styled';
import SportsModal from 'src/ui/common/SportsModal/SportsModal';
import SearchEventsDialog from 'src/ui/events/SearchEventsEnhanced/SearchEventsDialog';
import SearchEventsModal from 'src/ui/events/SearchEventsModal/SearchEventsModal';
import { useBetlinkGolf } from 'src/ui/sports/useBetlinkGolfFlag';

import { I18n } from '../Language/I18n';
import LiveSportsModal from '../LiveSportsModal/LiveSportsModal';

import { getSubNavigationIconType } from './helpers';
import { useVisibleMenuItems } from './hooks';
import { S_CountOfGames, S_SubNav, S_SubNavMenu, S_SubNavMenuLink, S_SubNavMenuNoLink } from './styled';
import SubNavigationIcon from './SubNavigationIcon';
import { SubNavigationLabel } from './SubNavigationLabel';
import type { Navigate, NavLink } from './types';

const DEFAULT_EXTERNAL_LINK_WINDOW_WIDTH = 1024;
const DEFAULT_EXTERNAL_LINK_WINDOW_HEIGHT = 750;
const STATIC_MENU_ITEMS = 4;
const MENU_ITEMS_TO_SHOW = 9;
const DESKTOP_ITEM_WIDTH = 82;
const MOBILE_ITEM_WIDTH = 78;
const LIVE_PAGE_URL = 'https://ls.sir.sportradar.com/beteast';
const BETEAST_BETTING_RULE_URL = 'https://rule.beteast8.com';

interface Props {
    propsLinks?: Navigate[];
    isNav: boolean;
    isInHeader?: boolean;
    slideTo?: boolean;
}

const SubNavigation = ({ propsLinks, isNav, isInHeader = false, slideTo = false }: Props) => {
    const { isDesktop, isTablet } = useWindowWidth();

    const menuItemWidth = isDesktop ? DESKTOP_ITEM_WIDTH : MOBILE_ITEM_WIDTH;
    const subNavigationRef = useRef(null);
    const swiperRef = useRef<SwiperCore>();
    const visibleMenuItems = useVisibleMenuItems(menuItemWidth, subNavigationRef);
    const menuItemsToShow = isTablet ? MENU_ITEMS_TO_SHOW : visibleMenuItems - STATIC_MENU_ITEMS;
    const standalone = isStandalone();

    const {
        models,
        reduxState,
        router,
        sportsList,
        language: { getTranslation, userLangShort },
    } = useAppStateContext();
    const { route } = router;

    const ROLLIN_BETTING_RULE_URL = `https://www.rollin.io/${userLangShort}/legal-documents/jhGpFgXdDju8OnbdhDdy`;

    const getBettingRuleUrl = () => (standalone ? ROLLIN_BETTING_RULE_URL : BETEAST_BETTING_RULE_URL);

    const event =
        route.name !== RouteName.Competition && route.name !== RouteName.Country
            ? models.getEvent(Number(route.params.id))
            : undefined;
    const { sport, timeSettingsStarted: inPlay = false } = event ?? {};

    const { countEvents } = useEventCounters();

    const [activeSport, setActiveSport] = useState('');

    const { enabled: isBetlinkFeatureEnabled, openBetlinkGolf, i18nGolf } = useBetlinkGolf();
    const visibleSubNavItems = isBetlinkFeatureEnabled ? menuItemsToShow - 1 : menuItemsToShow;
    const currentRouteId = route.params.id;

    const searchFlag = useAtomValue(searchFlagSelector);
    const setIsSearchModalOpen = useSetAtom(isSearchModalOpenAtom);
    const sportIcons = useRecoilValue(sportIconsSelector);

    const [isSportsModalOpen, setIsSportsModalOpen] = useAtom(isSportModalOpenAtom);
    const [isLiveSportsModalOpen, setIsLiveSportsModalOpen] = useAtom(isLiveSportsModalOpenAtom);

    const handleSwiperInit = useCallback((swiper: SwiperCore) => {
        swiperRef.current = swiper;
    }, []);

    const openSearchModal = () => {
        setIsSportsModalOpen(false);
        setIsSearchModalOpen(true);
    };

    const toggleSportsModal = useCallback(() => {
        if (sportsList.sports.length > 0) {
            setIsSportsModalOpen(toggleState);
        }
    }, []);

    const toggleLiveSportsModal = () => {
        setIsLiveSportsModalOpen(toggleState);
    };

    const [openedWindows, setOpenedWindows] = useState<Record<string, Window | null>>({});

    const visibleSubNavSports = sportsList.sports
        .slice(0, visibleSubNavItems)
        .reduce((accumulator: Partial<NavLink>[], { id, label, displayOrder }) => {
            const icon =
                id !== 'olympicgames' ? `sports-icon ${SPORT_ICONS[id] || SPORT_ICONS.default}` : SPORT_ICONS[id];
            const count = countEvents(id)?.count;

            accumulator.push({
                count,
                route: 'sport',
                params: { id },
                icon,
                label,
                displayOrder,
                testId: `visibleSubNavSport-${id}`,
            });

            return accumulator;
        }, []);

    const [latestSportId, setLatestSportId] = useState(() => {
        const [latestId] = reduxState.recentlyViewedSports;

        return latestId;
    });

    useEffect(() => {
        const activeIndex = linkList.findIndex((item) => {
            return item.params?.id === currentRouteId;
        });

        if (!swiperRef.current || activeIndex === -1 || !slideTo) {
            return;
        }

        swiperRef.current?.slideTo(activeIndex);
    }, [currentRouteId]);

    useEffect(() => {
        const [id] = reduxState.recentlyViewedSports;

        if (!find(visibleSubNavSports, { params: { id } })) {
            setLatestSportId(() => {
                const [latestId] = reduxState.recentlyViewedSports;

                return latestId;
            });
        }
    }, [reduxState.recentlyViewedSports]);

    useEffect(() => {
        const [id] = reduxState.recentlyViewedSports;

        if (
            !inPlay &&
            sport !== undefined &&
            !includes(reduxState.recentlyViewedSports, sport) &&
            !find(visibleSubNavSports, { params: { id } })
        ) {
            setLatestSportId(sport);
        }
    }, [sport, inPlay]);

    useEffect(() => {
        setActiveSport(sport ?? '');
    }, [sport]);

    useEffect(() => {
        if (isEmpty(route.params) || router.route.name === RouteName.InPlay) {
            setActiveSport('');
        }
    }, [route.params, router.route.name]);

    const externalLink = useCallback(
        (url: string, width = DEFAULT_EXTERNAL_LINK_WINDOW_WIDTH, height = DEFAULT_EXTERNAL_LINK_WINDOW_HEIGHT) => {
            const existingWindow = openedWindows[url];

            if (existingWindow && !existingWindow.closed) {
                existingWindow.focus();
            } else {
                const newWindow = window.open(url, '_blank', `width=${width}, height=${height}`);

                if (newWindow) {
                    setOpenedWindows((prevWindows) => ({
                        ...prevWindows,
                        [url]: newWindow,
                    }));
                }
            }
        },
        [openedWindows],
    );

    const getIconUrl = (name: string) => {
        const sportIcon = get(sportIcons, name);

        return sportIcon?.url;
    };

    const { lock, unlock } = useScrollLock({
        autoLock: false,
        lockTarget: 'body',
    });

    useEffect(() => {
        isLiveSportsModalOpen || isSportsModalOpen ? lock() : unlock();

        return () => unlock();
    }, [isLiveSportsModalOpen, isSportsModalOpen]);

    const staticLinks = [
        {
            route: null,
            onClick: openSearchModal,
            testId: 'search',
            icon: 'theme-search',
            iconUrl: getIconUrl('theme-search'),
            label: getTranslation('header.search.nav.label', 'Search'),
        },
        {
            onClick: () => externalLink(`${LIVE_PAGE_URL}/${userLangShort}`),
            testId: 'livescore',
            icon: 'theme-icon-livescore',
            iconUrl: getIconUrl('theme-icon-livescore'),
            label: getTranslation('header.livescore.nav.label', 'Livescore'),
        },
        {
            onClick: () => externalLink(getBettingRuleUrl()),
            testId: 'bettingRules',
            icon: 'theme-icon-bettingrules',
            iconUrl: getIconUrl('theme-icon-bettingrules'),
            label: getTranslation('header.bettingrules.nav.label', 'Betting Rules'),
        },
    ];

    const createLinks = (latestSportId: string | undefined) => {
        const links = [...visibleSubNavSports] as NavLink[];

        if (latestSportId !== undefined) {
            links.push({
                route: 'sport',
                params: { id: latestSportId },
                icon: SPORT_ICONS[latestSportId] || SPORT_ICONS.default,
                count: countEvents(latestSportId).count,
                label: reduxState.getSportName(latestSportId),
                extra: true,
                testId: `visibleSubNavSport-${latestSportId}`,
            });
        }

        if (isBetlinkFeatureEnabled) {
            links.push({
                route: null,
                onClick: openBetlinkGolf,
                icon: 'betlink-golf',
                label: i18nGolf,
                testId: 'betlinkGolf',
            });
        }

        if (isDesktop) {
            links.push({
                route: null,
                onClick: toggleSportsModal,
                icon: 'theme-menu',
                label: getTranslation('header.azsports.nav.label', 'A-Z Sports'),
                testId: 'sportsNavigation',
                iconUrl: getIconUrl('az-sports'),
            });
        }

        links.push(...staticLinks);

        return links;
    };

    const extraSport = (latestSportId: string | undefined): string | undefined => {
        if (propsLinks === undefined && latestSportId !== undefined) {
            const links = createLinks(latestSportId);
            const favorites = links.filter((item) => item.params && item.params.id === latestSportId && !item.extra);

            return favorites.length > 0 ? undefined : latestSportId;
        }

        return latestSportId;
    };

    const azMenuLink = {
        route: null,
        icon: 'theme-menu',
        label: <I18n langKey='livefilter.allSports.title' defaultText='A-Z Sports' />,
        text: 'A-Z Sports',
        testId: 'azSportsLink',
        onClick: toggleLiveSportsModal,
        iconUrl: getIconUrl('az-sports'),
    };

    const createPropLinks = (links: Navigate[]) => {
        const linksWithSportIcons = links.map((link) => {
            const id = link.params?.id;
            const sportIcon = id === RouteName.Betting ? get(sportIcons, 'sports-all') : get(sportIcons, id);

            return {
                ...link,
                ...(!isUndefined(sportIcon) ? { iconUrl: sportIcon.url } : {}),
            };
        });

        if (route.name === RouteName.InPlay && isDesktop) {
            return [...linksWithSportIcons, { ...azMenuLink }, ...staticLinks];
        }

        return [...linksWithSportIcons];
    };

    const linkList: NavLink[] =
        propsLinks !== undefined ? createPropLinks(propsLinks) : createLinks(extraSport(latestSportId));

    const extraLinkIndex = linkList.findIndex((item) => item.extra === true);

    if (extraLinkIndex > 0 && !isTablet) {
        linkList.splice(extraLinkIndex - 1, 1);
    }

    return (
        <S_SubNav isNav={isNav} ref={subNavigationRef} className={classnames({ navigationStandalone: standalone })}>
            <S_SubNavMenu data-testid='subNavigation' isNav={false}>
                {/* TODO: Move Modal out of SubNavigation */}
                {searchFlag ? <SearchEventsDialog /> : <SearchEventsModal />}
                <SportsModal />
                <LiveSportsModal />
                <S_SwiperContainer>
                    <Swiper
                        onBeforeInit={handleSwiperInit}
                        slidesPerView={'auto'}
                        navigation
                        freeMode={{
                            enabled: true,
                            minimumVelocity: 0.5,
                        }}
                        modules={[Navigation, FreeMode]}
                    >
                        {linkList.map((link) => {
                            const { route: linkRoute, params, isActiveCallback, label, count, onClick, testId } = link;
                            const iconType = getSubNavigationIconType(link.icon, isInHeader, isDesktop);
                            const shouldActivateNavElement =
                                (route.name === RouteName.Country && route.params.sportId === params?.id) ||
                                (route.name === RouteName.Competition && route.params.slug === params?.id) ||
                                (route.name === RouteName.Event && sport === params?.id && sport !== undefined) ||
                                (activeSport === params?.id && activeSport);

                            const handleClick = (e: MouseEvent<HTMLElement>) => {
                                e.stopPropagation();

                                if (testId === 'sportsNavigation' || testId === 'azSportsLink') {
                                    e.preventDefault();
                                }

                                if (isSportsModalOpen && testId !== 'sportsNavigation') {
                                    setIsSportsModalOpen(false);
                                }

                                if (isLiveSportsModalOpen && testId !== 'azSportsLink') {
                                    setIsLiveSportsModalOpen(false);
                                }

                                setActiveSport('');

                                if (onClick !== undefined) {
                                    onClick();
                                }
                            };

                            if ((count !== undefined && count === 0) || !label) {
                                return null;
                            }

                            const isLink = linkRoute !== undefined;
                            let isActive = false;

                            if (isActiveCallback) {
                                isActive = isActiveCallback(router.url);
                            } else if (shouldActivateNavElement) {
                                isActive = true;
                            } else if (!isEmpty(linkRoute) || !isEmpty(params)) {
                                isActive = router.buildUrl(linkRoute, params) === router.url;
                            } else if (link.testId === 'sportsNavigation' && isSportsModalOpen) {
                                isActive = true;
                            } else if (
                                link.testId === 'azSportsLink' &&
                                isLiveSportsModalOpen &&
                                sportsList.sports.length > 0
                            ) {
                                isActive = true;
                            }

                            const sportIcon = get(sportIcons, params?.id ?? '');
                            const iconUrl = sportIcon?.url ?? link.iconUrl;

                            const className = classnames([
                                {
                                    active: isActive,
                                    link: isLink,
                                },
                                isNav ? 'sub_nav' : 'header_nav',
                            ]);

                            let ItemComponent;
                            const itemProps: Record<string, unknown> = {
                                route: linkRoute,
                                params,
                                className,
                            };

                            if (isLink) {
                                ItemComponent = S_SubNavMenuLink;
                                itemProps.testId = testId;
                            } else {
                                ItemComponent = S_SubNavMenuNoLink;
                                itemProps['data-testid'] = testId;
                            }

                            return (
                                <SwiperSlide key={link.icon}>
                                    {isDesktop ? (
                                        <ItemComponent
                                            iconType={iconType}
                                            isInHeader={isInHeader}
                                            onClick={handleClick}
                                            {...itemProps}
                                        >
                                            <SubNavigationIcon iconType={iconType} iconUrl={iconUrl} testId={testId} />
                                            <SubNavigationLabel
                                                testId={testId}
                                                iconType={iconType}
                                                isNav={isNav}
                                                isInHeader={isInHeader}
                                                label={label}
                                            />
                                            {count !== undefined && (
                                                <S_CountOfGames data-testid={`${testId}Count`}>{count}</S_CountOfGames>
                                            )}
                                        </ItemComponent>
                                    ) : (
                                        <ItemComponent
                                            iconType={iconType}
                                            isInHeader={isInHeader}
                                            onClick={handleClick}
                                            {...itemProps}
                                        >
                                            <SubNavigationIcon iconType={iconType} iconUrl={iconUrl} testId={testId} />
                                            <SubNavigationLabel testId={testId} isNav={isNav} label={label} />
                                            {count !== undefined && (
                                                <S_CountOfGames data-testid={`${testId}Count`}>{count}</S_CountOfGames>
                                            )}
                                        </ItemComponent>
                                    )}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </S_SwiperContainer>
            </S_SubNavMenu>
        </S_SubNav>
    );
};

export default observer(SubNavigation);
