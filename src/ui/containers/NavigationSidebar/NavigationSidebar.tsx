import includes from 'lodash/includes';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppStateContext } from 'src/appState/AppState';
import { getCompetitionLocation } from 'src/appState/utils';
import { IconCategory, RouteName } from 'src/common/enums';
import { request as getContentIcons } from 'src/modules/content/actions/get-content-icons';
import { request as getCompetitionLocations } from 'src/modules/sports/actions/get-competitions-locations-list';
import NavigationSidebar from 'src/ui/common/NavigationSidebar/NavigationSidebar';

import { useHighlightCompetitionsLinks } from './hooks/useHighlightCompetitionsLinks';

interface Props {
    sport?: string;
    shouldRenderOnlyListOrGroups?: boolean;
}

const NavigationSidebarContainer = ({ sport, shouldRenderOnlyListOrGroups }: Props) => {
    const dispatch = useDispatch();
    const { reduxState, router } = useAppStateContext();
    const {
        route: {
            name,
            params: { country },
        },
    } = router;

    const { highlightItems } = useHighlightCompetitionsLinks();

    useEffect(() => {
        dispatch(getContentIcons(IconCategory.Competitions));
        dispatch(getContentIcons(IconCategory.CompetitionLocations));
        dispatch(getContentIcons(IconCategory.Sports));
    }, []);

    useEffect(() => {
        const allowedRoutes = [
            RouteName.Event,
            RouteName.Competition,
            RouteName.Sport,
            RouteName.Country,
            RouteName.AllCountries,
        ];

        if (includes(allowedRoutes, name) && sport !== '') {
            const competitionLocation = getCompetitionLocation(sport);
            const query = {
                sport: sport,
                tags: {
                    [competitionLocation.tag]: country !== null && country !== undefined ? [country] : [],
                },
            };
            reduxState.dispatch(getCompetitionLocations(query));
        }
    }, [sport, country, name]);

    return (
        <NavigationSidebar
            popular={highlightItems}
            sport={sport}
            shouldRenderOnlyListOrGroups={shouldRenderOnlyListOrGroups}
        />
    );
};

export default observer(NavigationSidebarContainer);
