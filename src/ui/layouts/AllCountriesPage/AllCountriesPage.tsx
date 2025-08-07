import get from 'lodash/get';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppStateContext } from 'src/appState/AppState';
import { IconCategory, RouteName } from 'src/common/enums';
import { S_MainPageWrapper, S_PageContent } from 'src/layouts/MainWrapper/styled';
import { request as getContentIcons } from 'src/modules/content/actions/get-content-icons';
import NavigationSidebar from 'src/ui/containers/NavigationSidebar/NavigationSidebar';

const AllCountriesPage = () => {
    const dispatch = useDispatch();

    const {
        router: {
            route: { name: routeName, params: routeParam },
        },
    } = useAppStateContext();

    useEffect(() => {
        dispatch(getContentIcons(IconCategory.Competitions));
        dispatch(getContentIcons(IconCategory.CompetitionLocations));
    }, []);

    const detectedSportId = {
        [RouteName.Sport]: routeParam.id,
        [RouteName.Country]: routeParam.sportId,
        [RouteName.Competition]: routeParam.slug,
        [RouteName.AllCountries]: routeParam.sportId,
    };

    return (
        <S_PageContent>
            <S_MainPageWrapper>
                <NavigationSidebar shouldRenderOnlyListOrGroups sport={get(detectedSportId, routeName)} />
            </S_MainPageWrapper>
        </S_PageContent>
    );
};

export default observer(AllCountriesPage);
