import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { observer } from 'mobx-react-lite';

import { I18n } from 'src/ui/common/Language/I18n';
import NavigationPanel from 'src/ui/common/NavigationPanel/NavigationPanel';
import { useDataCountryCompetitions } from 'src/ui/crossbetting/hooks/useDataCountryCompetitions';
import { request as getCompetitionLocations } from 'src/modules/sports/actions/get-competitions-locations-list';
import { useAppStateContext } from 'src/appState/AppState';
import { competitionLocationItemsSelector } from 'src/modules/sports/selectors';
import { SportType } from 'src/common/enums';
import { buildCrossBetNavigationLinks } from 'src/ui/crossbetting/NavigationSidebar/buildNavigationLinks';

const NavigationSidebar = () => {
    const {
        language: { getTranslation, getTranslationsReverse },
    } = useAppStateContext();
    const { competitions = [] } = useDataCountryCompetitions();
    const dispatch = useDispatch();

    const competitionLocations = useSelector(competitionLocationItemsSelector);

    const {
        router: {
            route: {
                params: { sport },
            },
        },
    } = useAppStateContext();

    const crossBetLinks = buildCrossBetNavigationLinks(
        competitions,
        competitionLocations,
        sport as SportType,
        getTranslation,
        getTranslationsReverse,
    );

    useEffect(() => {
        if (sport !== SportType.All) {
            dispatch(getCompetitionLocations({ sport }));
        }
    }, [sport]);

    return (
        <div className='navigation-sidebar__content'>
            <NavigationPanel
                title={<I18n langKey='left-menu.sports-countries.title' defaultText='All Countries' />}
                links={crossBetLinks}
                id='sports-countries'
                isToggle={true}
                testId='allCountries'
            />
        </div>
    );
};

export default observer(NavigationSidebar);
