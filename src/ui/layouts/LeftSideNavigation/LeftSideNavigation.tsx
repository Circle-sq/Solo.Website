import { useWindowWidth } from '@sc-hooks';
import get from 'lodash/get';
import includes from 'lodash/includes';
import { observer } from 'mobx-react-lite';
import { type ReactElement, type RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import type { Scrollbars } from 'react-custom-scrollbars-2';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName, SportType } from 'src/common/enums';
import {
    S_MainPageWrapper,
    S_PageContent,
    S_PageMainSection,
    S_PageNavSection,
    S_ScrolledContent,
} from 'src/layouts/MainWrapper/styled';
import Breadcrumb from 'src/ui/common/Breadcrumb';
import CustomScrollbar from 'src/ui/common/CustomScrollbar';
import ScrollTopButton from 'src/ui/common/ScrollTopButton/ScrollTopButton';
import { scrollBarAtom } from 'src/ui/containers/MainCustomScrollbar/store/scrollBar';
import NavigationSidebar from 'src/ui/containers/NavigationSidebar/NavigationSidebar';
import EventsHighlightCarousel from 'src/ui/events/EventsHighlightCarousel';
import General from 'src/ui/sports/General/General';

import competition from './competition';
import sports from './sports';

const verticalBarPosition = { top: '16px', bottom: '16px' };
const highlightedPath = [
    SportType.Football,
    SportType.Baseball,
    SportType.Basketball,
    SportType.Tennis,
    SportType.IceHockey,
    SportType.AmericanFootball,
    SportType.Boxing,
    SportType.Volleyball,
    SportType.Dota2,
    SportType.StarCraft,
    SportType.CsGo,
    SportType.LeagueOfLegends,
];

const LeftSideNavigation = () => {
    const {
        router: {
            route: { name: routeName, params },
        },
    } = useAppStateContext();
    const { id, slug, sportId } = params;

    const scrollContainer = useRef<Scrollbars>(null);
    const animationFrameIdRef = useRef<number | null>(null);

    const scrollPosition = useRecoilValue(scrollBarAtom);
    const resetScrollPosition = useResetRecoilState(scrollBarAtom);

    const { isDesktop, isMobile } = useWindowWidth();

    const allSports: string[] = Object.values(SportType);

    const isHighlightAllowed = routeName === RouteName.Sport && includes(highlightedPath, id);

    const sidebarType = {
        [RouteName.Country]: sportId,
        [RouteName.Competition]: slug,
        [RouteName.Sport]: id,
    };

    const sportType = sidebarType[routeName as keyof typeof sidebarType];

    const handleScroll = useCallback(() => {
        animationFrameIdRef.current = requestAnimationFrame(() => {
            if (scrollContainer.current !== null && scrollPosition !== null) {
                scrollContainer.current.scrollTop(scrollPosition);
            }
        });
    }, [scrollPosition]);

    const resetScroll = useCallback(() => {
        if (scrollPosition !== null) {
            resetScrollPosition();
        }
    }, [resetScrollPosition, scrollPosition]);

    const mainPageComponent = useMemo<ReactElement | null>(() => {
        const SportPage = get(sports, id, sports.default);
        const CompetitionPage = get(competition, id, competition.default);

        switch (routeName) {
            case RouteName.Country:
                return <General />;

            case RouteName.Competition:
                return <CompetitionPage />;

            case RouteName.Sport:
                return <SportPage />;

            default:
                return null;
        }
    }, [routeName, id]);

    const scrollbarRef = useRef<Scrollbars>(null);
    const lhnScrollbarRef = useRef<Scrollbars>(null);

    const scrollToTop = useCallback((ref: RefObject<Scrollbars>) => {
        if (ref?.current !== null) {
            ref.current.scrollToTop();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, []);

    const mainPage = () => {
        if (isMobile) {
            return <S_MainPageWrapper fullWidth>{mainPageComponent}</S_MainPageWrapper>;
        }

        return (
            <>
                <CustomScrollbar ref={scrollbarRef} verticalBarPosition={verticalBarPosition}>
                    <S_ScrolledContent>
                        <S_MainPageWrapper fullWidth>
                            {isDesktop && <Breadcrumb waitForRequestToComplete />}
                            {mainPageComponent}
                        </S_MainPageWrapper>
                    </S_ScrolledContent>
                </CustomScrollbar>
                {!isMobile ? (
                    <ScrollTopButton containerRef={scrollbarRef} onClick={() => scrollToTop(scrollbarRef)} />
                ) : null}
            </>
        );
    };

    useEffect(() => {
        handleScroll();

        return () => resetScroll();
    }, [handleScroll, resetScrollPosition, resetScroll, scrollPosition, routeName, id]);

    useEffect(() => {
        if (allSports.includes(id)) {
            scrollToTop(lhnScrollbarRef);
        }
    }, [id]);

    return (
        <>
            {isHighlightAllowed && <EventsHighlightCarousel sport={id} />}

            <S_PageContent>
                <S_PageNavSection>
                    {isMobile ? (
                        sportType && <NavigationSidebar sport={sportType} />
                    ) : (
                        <CustomScrollbar
                            ref={lhnScrollbarRef}
                            verticalBarPosition={verticalBarPosition}
                            showScrollToTopButton={false}
                        >
                            <S_ScrolledContent>
                                {sportType && <NavigationSidebar sport={sportType} />}
                            </S_ScrolledContent>
                        </CustomScrollbar>
                    )}
                </S_PageNavSection>
                <S_PageMainSection>{mainPage()}</S_PageMainSection>
            </S_PageContent>
        </>
    );
};

export default observer(LeftSideNavigation);
