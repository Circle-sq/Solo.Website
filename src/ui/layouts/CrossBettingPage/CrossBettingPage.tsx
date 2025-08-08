import { useWindowWidth } from '@solo-hooks';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Scrollbars } from 'react-custom-scrollbars-2';
import { Redirect } from 'react-router-dom';
import { useRecoilCallback } from 'recoil';

import { resetCrossPageRelationForOrphanSelectionsTask } from '@solo-betslip/store/tasks/selection/relation';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName, SportType } from 'src/common/enums';
import useHighlightCompetitions from 'src/common/hooks/useHighlightCompetitions/useHighlightCompetitions';
import { isStandalone } from 'src/infra.client';
import { LoaderContainer, S_PageMainSection, S_PageNavSection } from 'src/layouts/MainWrapper/styled';
import CustomScrollbar from 'src/ui/common/CustomScrollbar/CustomScrollbar';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';
import ScrollTopButton from 'src/ui/common/ScrollTopButton/ScrollTopButton';
import CrossBetting from 'src/ui/crossbetting/CrossBetting';
import useEventsCountByWeekRange from 'src/ui/crossbetting/hooks/useEventsCountByWeekRange';
import NavigationSidebar from 'src/ui/crossbetting/NavigationSidebar/NavigationSidebar';
import TopSportsNavigationSidebar from 'src/ui/crossbetting/TopSportsNavigationSidebar';
import { useMarketCounter } from 'src/ui/events/hooks/useMarketCounter';

import { S_CrossBettingCustomScrollbar, S_CrossBettingPage } from './styled';

const verticalBarPosition = { top: '16px', bottom: '16px' };

const CrossBettingPage = () => {
    const { router } = useAppStateContext();
    const { sport } = router.route.params;
    const scrollbarRef = useRef<Scrollbars>(null);
    const { isTablet, isMobile } = useWindowWidth();
    const { isPending } = useEventsCountByWeekRange();
    const [isShowTopSports, setIsShowTopSports] = useState(false);

    useMarketCounter();
    useHighlightCompetitions();

    const resetCrossPageRelationForOrphanSelections = useRecoilCallback(
        resetCrossPageRelationForOrphanSelectionsTask,
        [],
    );

    useEffect(() => {
        setIsShowTopSports(sport === SportType.All);
    }, [sport]);

    useEffect(() => {
        return () => {
            resetCrossPageRelationForOrphanSelections();
        };
    }, []);

    const scrollToTop = useCallback(() => {
        if (scrollbarRef?.current !== null) {
            scrollbarRef.current.scrollToTop();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, []);

    if (isStandalone()) {
        return <Redirect to={RouteName.Homepage} />;
    }

    if (isPending) {
        return (
            <LoaderContainer data-testid='loader-container'>
                <Loader message={<I18n langKey='events.search.loading' defaultText='Loading...' />} />
            </LoaderContainer>
        );
    }

    return (
        <S_CrossBettingPage>
            {!isTablet && (
                <S_PageNavSection>
                    <CustomScrollbar verticalBarPosition={verticalBarPosition}>
                        <S_CrossBettingCustomScrollbar>
                            {isShowTopSports ? <TopSportsNavigationSidebar /> : <NavigationSidebar />}
                        </S_CrossBettingCustomScrollbar>
                    </CustomScrollbar>
                </S_PageNavSection>
            )}
            <S_PageMainSection>
                <CustomScrollbar ref={scrollbarRef} verticalBarPosition={verticalBarPosition} disabled={isMobile}>
                    <CrossBetting testId='crossbetContent' />
                    {!isMobile ? <ScrollTopButton containerRef={scrollbarRef} onClick={scrollToTop} /> : null}
                </CustomScrollbar>
            </S_PageMainSection>
        </S_CrossBettingPage>
    );
};

export default observer(CrossBettingPage);
