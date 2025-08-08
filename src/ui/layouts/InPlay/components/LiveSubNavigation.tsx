import { useWindowWidth } from '@solo-hooks';
import { observer } from 'mobx-react-lite';

import { GreyPalette } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { NavigatorPlatforms } from 'src/common/enums';
import SubNavigation from 'src/ui/common/SubNavigation/SubNavigation';

import { useActiveSportCountriesData } from '../hooks/useActiveSportCountriesData';
import { useInPlayLinks } from '../hooks/useInPlayLinks';
import { useInPlayStreamsCounters } from '../hooks/useInPlayStreamsCounters';
import { S_SportsNavigationWrapper } from '../styled';

const LiveSubNavigation = () => {
    const {
        router: {
            route: {
                params: { sportId },
            },
        },
    } = useAppStateContext();

    const { isDesktop } = useWindowWidth();

    const { streamsCounters, inPlayCounters } = useInPlayStreamsCounters();
    const { activeSports } = useActiveSportCountriesData(inPlayCounters);

    const links = useInPlayLinks(sportId, activeSports, streamsCounters);

    const SportsNavigationWrapperBg = navigator.platform === NavigatorPlatforms.iphone ? '' : GreyPalette.grey8;

    return (
        <S_SportsNavigationWrapper bg={SportsNavigationWrapperBg} data-testid='sportsSubNavigation'>
            <SubNavigation propsLinks={links} isNav={!isDesktop} slideTo />
        </S_SportsNavigationWrapper>
    );
};

export default observer(LiveSubNavigation);
