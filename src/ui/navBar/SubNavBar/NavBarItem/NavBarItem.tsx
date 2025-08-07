import { useWindowWidth } from '@sc-hooks';
import includes from 'lodash/includes';

import { RightArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import type { Link } from 'src/ui/navBar/SubNavBar/types';

import { S_BarLink, S_BetsIndicator, S_CounterLink, S_NavBarItemLabel } from './styled';

const NavBarItem = ({ link, isLiveEvent }: { link: Link; isLiveEvent: boolean }) => {
    const { counter, route, label, params, icon, testId } = link;

    const { isTablet } = useWindowWidth();

    const { router } = useAppStateContext();
    const { name: routeName, params: routeParam } = router.route;

    const isRouteActiveOnMobile = includes([RouteName.Country, RouteName.Competition], routeName);

    const isActive = ({ route, params }: Link) => {
        if (route === RouteName.MyBets) {
            return params?.id === routeParam.id;
        }

        if (isTablet && isRouteActiveOnMobile && route === RouteName.AllCountries) {
            return true;
        }

        if (routeName === RouteName.Event && !isLiveEvent) {
            return route === RouteName.Country;
        }

        return routeName === route;
    };

    if (counter === undefined) {
        return (
            <S_BarLink active={isActive(link)} route={route} params={params} testId={testId}>
                <S_NavBarItemLabel>{label}</S_NavBarItemLabel>
            </S_BarLink>
        );
    }

    if (counter > 0) {
        return (
            <S_CounterLink active={isActive(link)} route={route} params={params} testId={testId}>
                <S_NavBarItemLabel>{label}</S_NavBarItemLabel>
                <S_BetsIndicator>{counter}</S_BetsIndicator>

                {icon !== undefined && <RightArrowIcon color={cssColor('--icon-generic-color')} fontSize='xsmall' />}
            </S_CounterLink>
        );
    }

    return null;
};

export default NavBarItem;
