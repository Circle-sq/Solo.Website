import includes from 'lodash/includes';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { SportCount } from 'src/appState/sportsList/types';
import { RouteName } from 'src/common/enums';
import { S_InPlayContent, S_MainPageWrapper } from 'src/layouts/MainWrapper/styled';
import type { Navigate } from 'src/ui/common/SubNavigation/types';

import CountrySelector from './components/CountrySelector/CountrySelector';
import Highlights from './components/Highlights';
import LiveStream from './components/LiveStream/LiveStream';
import Sport from './components/Sport';
import { useActiveSportCountriesData } from './hooks/useActiveSportCountriesData';
import { useFetchStreams } from './hooks/useFetchStreams';
import { useGetContentIcons } from './hooks/useGetContentIcons';
import { useInPlayStreamsCounters } from './hooks/useInPlayStreamsCounters';
import { S_InPlayPageContent } from './styled';

const InPlayLayout = () => {
    const {
        router,
        router: {
            route: {
                name: routeName,
                params: { id: sportId },
            },
        },
    } = useAppStateContext();

    useFetchStreams();
    useGetContentIcons();

    const { streamsCounters, inPlayCounters, selectedCountry } = useInPlayStreamsCounters();
    const { activeSports, selectedSportCountries } = useActiveSportCountriesData(inPlayCounters);

    useEffect(() => {
        if (sportId === undefined) {
            router.redirect(RouteName.InPlay, { id: RouteName.Betting });
        }
    }, [router, sportId]);

    useEffect(() => {
        const sport = inPlayCounters.length ? inPlayCounters.find((sport: SportCount) => sport.id === sportId) : null;

        if (!includes([RouteName.LiveStream, RouteName.Betting], sportId) && sport === undefined) {
            router.redirect(routeName, { id: RouteName.Betting });
        }
    }, [inPlayCounters, routeName, router, sportId]);

    const isSportAvailable = selectedSportCountries.length > 0;

    const renderSelectedTab = () => {
        const sportsCollection = activeSports.reduce((acc: string[], y: Navigate) => [...acc, y.params.id], []);

        switch (sportId) {
            case RouteName.Betting:
                return <Highlights sportsCollection={sportsCollection} />;

            case RouteName.LiveStream:
                return <LiveStream liveStreams={streamsCounters} />;

            default:
                return isSportAvailable ? (
                    <Sport key={`${sportId}-${selectedCountry}`} sportId={sportId} countryId={selectedCountry} />
                ) : null;
        }
    };

    return (
        <S_InPlayPageContent>
            <S_InPlayContent data-testid='inPlayContent'>
                <S_MainPageWrapper data-testid='pagemain'>
                    {isSportAvailable && (
                        <CountrySelector
                            key={sportId}
                            sportId={sportId}
                            locations={selectedSportCountries}
                            selectedId={selectedCountry}
                        />
                    )}
                    {renderSelectedTab()}
                </S_MainPageWrapper>
            </S_InPlayContent>
        </S_InPlayPageContent>
    );
};

export default observer(InPlayLayout);
