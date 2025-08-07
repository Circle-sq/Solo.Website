import { useWindowWidth } from '@sc-hooks';
import classnames from 'classnames';
import includes from 'lodash/includes';
import { observer } from 'mobx-react-lite';

import { useAppStateContext } from 'src/appState/AppState';
import LogoNew from 'src/assets/icons/logo/LogoNew';
import { RouteName } from 'src/common/enums';
import { hideHeaderInStandalone, isStandalone } from 'src/infra.client';
import Breadcrumb from 'src/ui/common/Breadcrumb';
import QuickHeader from 'src/ui/common/QuickHeader/QuickHeader';
import SubNavigation from 'src/ui/common/SubNavigation/SubNavigation';
import { useGoBack } from 'src/ui/layouts/Event/hook';
import LiveSubNavigation from 'src/ui/layouts/InPlay/components/LiveSubNavigation';
import SubNavBar from 'src/ui/navBar/SubNavBar/SubNavBar';

import HeaderMainLinks from './HeaderMainLinks/HeaderMainLinks';
import { LogoContainer, S_HeaderBox, S_HeaderContainer, S_HeaderWrapper } from './styled';

const Header = () => {
    const { isDesktop } = useWindowWidth();

    const {
        router: {
            route: { name: routeName, params },
        },
    } = useAppStateContext();

    const isRouteAllowed = includes(
        [
            RouteName.Sport,
            RouteName.Country,
            RouteName.Competition,
            RouteName.Event,
            RouteName.AllCountries,
            RouteName.InPlay,
        ],
        routeName,
    );

    const isHomePage = routeName === RouteName.Homepage;
    const isLiveSportsPage = routeName === RouteName.InPlay;

    const withNavigation = isHomePage || (isRouteAllowed && isDesktop);

    useGoBack({ name: routeName, market: params.market });

    const showMainSubNavigation = withNavigation && !isLiveSportsPage;
    const showLiveSportsSubNavigation = withNavigation && isLiveSportsPage;

    return (
        <S_HeaderWrapper className={classnames({ navigationStandalone: isStandalone() })}>
            <S_HeaderBox data-testid='headerNavigation'>
                {hideHeaderInStandalone() && (
                    <S_HeaderContainer>
                        <LogoContainer testId='headerMainLogo' params={{}} route='homepage'>
                            <LogoNew />
                        </LogoContainer>
                        {isDesktop && <HeaderMainLinks />}
                        <QuickHeader />
                    </S_HeaderContainer>
                )}
                {!isDesktop && isRouteAllowed && <Breadcrumb />}
                {showMainSubNavigation && <SubNavigation isNav={false} isInHeader />}
                {showLiveSportsSubNavigation && <LiveSubNavigation />}
                <SubNavBar />
            </S_HeaderBox>
        </S_HeaderWrapper>
    );
};

export default observer(Header);
