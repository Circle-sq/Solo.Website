import { useAsianViewFlag } from '@solo-feature-flags';
import { observer } from 'mobx-react-lite';

import AsianViewPage from '@solo-asianView/ui/AsianViewPage';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import RouteComponent from 'src/layouts/RouteComponent/RouteComponent';
import Betting from 'src/ui/betting/Betting';
import Header from 'src/ui/common/Header/Header';
import NavigationCloser from 'src/ui/common/NavigationCloser/NavigationCloser';

import { S_BodyWrapper, S_MainContent, S_MainWrapper } from './styled';

const DesktopMainWrapper = () => {
    const {
        router: { route },
    } = useAppStateContext();

    const isEventRoute = !!route.params?.slug;

    const asianViewFlag = useAsianViewFlag();
    const isAsianViewPage = route.name === RouteName.AsianView;

    return (
        <S_MainWrapper isEventRoute={isEventRoute}>
            <NavigationCloser />
            <Header />
            <S_BodyWrapper>
                {asianViewFlag && isAsianViewPage ? (
                    <AsianViewPage />
                ) : (
                    <>
                        <S_MainContent>
                            <RouteComponent routeName={route.name} />
                        </S_MainContent>
                        <Betting />
                    </>
                )}
            </S_BodyWrapper>
        </S_MainWrapper>
    );
};

export default observer(DesktopMainWrapper);
