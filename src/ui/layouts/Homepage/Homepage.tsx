import { useWindowResize } from '@solo-hooks';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppStateContext } from 'src/appState/AppState';
import { S_MainPageWrapper, S_PageContent } from 'src/layouts/MainWrapper/styled';
import { getStreams } from 'src/modules/media/actions/stream';
import SportsPanel from 'src/ui/common/Panel/SportsPanel';
import NavigationSidebar from 'src/ui/containers/NavigationSidebar/NavigationSidebar';
import BannersContainer from 'src/ui/content/Banners/BannersContainer';
import EventsInPlay from 'src/ui/events/containers/EventsInPlay/EventsInPlay';
import EventsOnLater from 'src/ui/events/containers/EventsOnLater';
import EventsHighlightCarousel from 'src/ui/events/EventsHighlightCarousel';

const DEFAULT_VIEWPORT = 0;
const BANNER_VIEWPORT_TOGGLE = 500;
const PANEL_HEADER_FONT_SIZE = 16;

export const Homepage = () => {
    const dispatch = useDispatch();

    const {
        language: { getTranslation },
    } = useAppStateContext();

    const [viewportWidth, setViewportWidth] = useState(DEFAULT_VIEWPORT);

    useWindowResize(() => {
        setViewportWidth(window.innerWidth);
    });

    useEffect(() => {
        dispatch(getStreams());
        setViewportWidth(window.innerWidth);
    }, []);

    const showForDesktop = viewportWidth > 0 && viewportWidth >= BANNER_VIEWPORT_TOGGLE;

    return (
        <>
            <EventsHighlightCarousel />

            <S_PageContent>
                <NavigationSidebar />

                <S_MainPageWrapper>
                    {showForDesktop && <BannersContainer />}

                    <SportsPanel
                        title={getTranslation('events.panel.header.live-highlights', 'Live Highlights')}
                        testId='liveHighlights'
                        fontSize={PANEL_HEADER_FONT_SIZE}
                    >
                        <EventsInPlay />
                    </SportsPanel>

                    <SportsPanel
                        title={getTranslation('events.panel.header.upcoming-events', 'Upcoming Events')}
                        testId='upcomingEvents'
                        fontSize={PANEL_HEADER_FONT_SIZE}
                    >
                        <EventsOnLater />
                    </SportsPanel>
                </S_MainPageWrapper>
            </S_PageContent>
        </>
    );
};

export default observer(Homepage);
