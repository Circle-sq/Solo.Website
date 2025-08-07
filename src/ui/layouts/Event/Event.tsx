import { useInPlayLHNFlag } from '@sc-feature-flags';
import { useWindowWidth } from '@sc-hooks';
import pick from 'lodash/pick';
import { observer } from 'mobx-react-lite';
import { type ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { usePossibleBets } from '@sc-betslip/api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '@sc-betslip/enums';
import { normalizeSelection } from '@sc-betslip/store/helpers/selection/common';
import { addStandardSelectionTask } from '@sc-betslip/store/tasks/selection/add';
import { eventMediaAtom } from '@sc-media/store/atoms';

import { useAppStateContext } from 'src/appState/AppState';
import { useFullscreenMode } from 'src/appState/customHooks';
import { generateGtmSelection } from 'src/features/gtm/gtm-utils';
import { isStandalone } from 'src/infra.client';
import {
    S_MainPageWrapper,
    S_EventPageContent,
    S_PageMainSection,
    S_PageNavSection,
} from 'src/layouts/MainWrapper/styled';
import Breadcrumb from 'src/ui/common/Breadcrumb';
import MainCustomScrollbar from 'src/ui/containers/MainCustomScrollbar/MainCustomScrollbar';
import NavigationSidebar from 'src/ui/containers/NavigationSidebar/NavigationSidebar';
import EventCard from 'src/ui/events/containers/EventCard/EventCard';
import useSelectionState from 'src/ui/events/Selection/useSelectionState';
import { IFRAME_ACTION_TYPE, LogStandaloneMessage } from 'src/utils/standalone/utils';

import InPlayLHN from '../InPlay/components/InPlayLHN/InPlayLHN';

import { useGoBack } from './hook';
import { DefaultRootStyles } from './styled';

const MISSING_REVISION = -14;

const EventLayout = () => {
    const { isDesktop, isTablet, isMobile } = useWindowWidth();
    const { fullscreenActive } = useFullscreenMode();
    const { models, router } = useAppStateContext();

    const { params, name } = router.route;

    const isInPlayLHNEnabled = useInPlayLHNFlag();

    const actualEvent = models.getEvent(+params?.id);

    const sport = actualEvent !== null ? actualEvent.sport : '';

    const { getPossibleBets } = usePossibleBets();

    const addSelection = useRecoilCallback(addStandardSelectionTask, []);

    const setEventMedia = useSetRecoilState(eventMediaAtom);

    const [prevScrollPosition, setPrevScrollPosition] = useState(0);

    useEffect(() => {
        if (!isMobile) {
            return;
        }

        if (prevScrollPosition) {
            window.scrollTo({ top: prevScrollPosition });
        }

        const handleScroll = () => {
            setPrevScrollPosition(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [router.route]);

    useEffect(() => {
        if (actualEvent == null) {
            return;
        }
        setEventMedia(pick(actualEvent, ['id', 'sport', 'media']));
    }, [actualEvent]);

    const mainContent = (
        <S_MainPageWrapper fullWidth>
            {isDesktop && <Breadcrumb />}
            <EventCard shared id={params.id} />
        </S_MainPageWrapper>
    );

    let pageContent: ReactElement | undefined = useMemo(() => {
        if (isMobile) {
            return (
                <>
                    <DefaultRootStyles />
                    {mainContent}
                </>
            );
        } else if (isTablet) {
            return (
                <>
                    <DefaultRootStyles />
                    <MainCustomScrollbar>{mainContent}</MainCustomScrollbar>
                </>
            );
        }

        return <MainCustomScrollbar>{mainContent}</MainCustomScrollbar>;
    }, [isTablet, isMobile, mainContent]);

    const prevContent = useRef<ReactElement | undefined>();

    useEffect(() => {
        prevContent.current = pageContent;
    }, [pageContent]);

    const selectionId = Number(window.$add_selectionId_to_betlslip);
    const { eventId, marketId, marketType, priceType, price, isLive } = useSelectionState({ selectionId });
    const NO_MARKET_ID = 0;
    const actualMarket = models.getMarket(marketId ?? NO_MARKET_ID);

    useEffect(() => {
        if (
            !isStandalone() ||
            selectionId === undefined ||
            isNaN(selectionId) ||
            selectionId === null ||
            eventId === undefined ||
            marketId === undefined ||
            marketType === null ||
            priceType === null ||
            price === null
        ) {
            return;
        }
        const gtmSelection = generateGtmSelection(isLive, undefined, true);
        addSelection(
            normalizeSelection({
                eventId,
                eventRevision: actualEvent?.revision ?? MISSING_REVISION,
                marketRevision: actualMarket?.revision ?? MISSING_REVISION,
                marketId,
                selectionId,
                marketType,
                priceType,
                price,
                gtmSelection,
            }),
        );
        getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.AddSelection });
        LogStandaloneMessage(IFRAME_ACTION_TYPE.info, `Added selectionId: ${selectionId} to betlip`);
        window.$add_selectionId_to_betlslip = undefined;
    }, [selectionId, eventId, marketId, marketType, priceType, price, isLive]);

    if (fullscreenActive) {
        pageContent = prevContent.current;
    }

    useGoBack({ name, market: params.market });

    return (
        <S_EventPageContent>
            <S_PageNavSection>
                <MainCustomScrollbar noScrollButton>
                    {isInPlayLHNEnabled && actualEvent?.timeSettingsStarted ? (
                        <InPlayLHN />
                    ) : (
                        <NavigationSidebar sport={sport} />
                    )}
                </MainCustomScrollbar>
            </S_PageNavSection>

            <S_PageMainSection>{pageContent}</S_PageMainSection>
        </S_EventPageContent>
    );
};

export default observer(EventLayout);
