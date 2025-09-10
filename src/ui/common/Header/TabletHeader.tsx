import { useWindowWidth } from '@solo-hooks';
import { useAtomValue } from 'jotai';
import includes from 'lodash/includes';
import { observer } from 'mobx-react-lite';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import Box from '@mui/material/Box';

import { isAuthenticatedAtom } from '@solo-account/store/atoms';

import { useAppStateContext } from 'src/appState/AppState';
import LogoNew from 'src/assets/icons/logo/LogoNew';
import { RouteName } from 'src/common/enums';
import { isStandalone } from 'src/infra.client';
import { showMyBetsSelector } from 'src/ui/betting/store/selectors';
import { closeMyBetsAndQuickBetTask, toggleMyBetsTask } from 'src/ui/betting/store/tasks';
import { I18n } from 'src/ui/common/Language/I18n';
import MyBetsModal from 'src/ui/common/MyBetsModal/MyBetsModal';
import QuickHeader from 'src/ui/common/QuickHeader/QuickHeader';
import SubHeader from 'src/ui/common/SubHeader/SubHeader';
import SubNavigation from 'src/ui/common/SubNavigation/SubNavigation';
import HamburgerIcon from 'src/ui/events/SportHeader/HamburgerIcon';
import { useGoBack } from 'src/ui/layouts/Event/hook';
import LiveSubNavigation from 'src/ui/layouts/InPlay/components/LiveSubNavigation';
import SubNavBar from 'src/ui/navBar/SubNavBar/SubNavBar';

import Breadcrumb from '../Breadcrumb';

import {
    LogoContainer,
    MyBetsLink,
    S_HamburgerWrapper,
    S_HeaderBox,
    S_HeaderContainer,
    S_HeaderWrapper,
} from './styled';

interface Props {
    showBurgerMenu: boolean;
    toggleBurgerMenu: () => void;
}

const TabletHeader = ({ showBurgerMenu, toggleBurgerMenu }: Props) => {
    const {
        router: {
            route: { name: routeName, params },
        },
    } = useAppStateContext();

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const showMyBets = useRecoilValue(showMyBetsSelector);

    const toggleMyBets = useRecoilCallback(toggleMyBetsTask, []);
    const closeMyBetsAndQuickBet = useRecoilCallback(closeMyBetsAndQuickBetTask, []);

    const { isDesktop } = useWindowWidth();

    const isRouteAllowed = includes(
        [RouteName.Sport, RouteName.Country, RouteName.Competition, RouteName.Event, RouteName.AllCountries],
        routeName,
    );

    const isAllowedSubNav = routeName === RouteName.Homepage;

    const showLiveSubNavigation = routeName === RouteName.InPlay && !isDesktop;

    useGoBack({ name: routeName, market: params.market });

    return (
        <S_HeaderWrapper>
            <S_HeaderBox data-testid='headerNavigation'>
                <>
                    {!isStandalone() && (
                        <S_HeaderContainer>
                            <S_HamburgerWrapper onClick={toggleBurgerMenu}>
                                <HamburgerIcon />
                            </S_HamburgerWrapper>
                            <LogoContainer
                                testId='headerMainLogo'
                                params={{}}
                                route='homepage'
                                onClick={closeMyBetsAndQuickBet}
                            >
                                <LogoNew width='113px' height='31px' />
                            </LogoContainer>
                            <Box display='flex' gap={2} alignItems='center' flex={1}>
                                {isAuthenticated && (
                                    <MyBetsLink isActive={showMyBets} onClick={toggleMyBets}>
                                        <I18n langKey='footer.mobile.mybets.label' defaultText='My Bets' />
                                    </MyBetsLink>
                                )}
                                {!showBurgerMenu && <QuickHeader />}
                            </Box>
                        </S_HeaderContainer>
                    )}
                    {showMyBets && <MyBetsModal onClose={toggleMyBets} />}
                    <SubHeader />
                </>

                {isRouteAllowed && <Breadcrumb />}
                {isAllowedSubNav && <SubNavigation isNav={false} isInHeader />}
                {showLiveSubNavigation && <LiveSubNavigation />}
                <SubNavBar />
            </S_HeaderBox>
        </S_HeaderWrapper>
    );
};

export default observer(TabletHeader);
