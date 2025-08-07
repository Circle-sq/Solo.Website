import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';
import { isSportModalOpenAtom } from 'src/store/common/atoms';
import { useBetlinkGolf } from 'src/ui/sports/useBetlinkGolfFlag';
import { activeSportsToMap } from 'src/utils/common';
import { MODAL_ROUTE_NAME } from 'src/utils/constants';

import { groupSportsByAlphabet } from './config';
import SportsModalDesktop from './SportsModalDesktop';
import { S_ContainerForLargeScreen } from './styled';

const SportsModal = () => {
    const {
        router: {
            route: {
                params: { popup },
            },
        },
        reduxState,
        language: { userLang },
    } = useAppStateContext();
    const isVisible = useAtomValue(isSportModalOpenAtom);

    const { sportsItems } = reduxState;

    const { enabled: isBetlinkFeatureEnabled, i18nGolf } = useBetlinkGolf();

    let updatedSports = sportsItems;

    if (isBetlinkFeatureEnabled) {
        updatedSports = updatedSports.set(SportType.BetlinkGolf, {
            displayOrder: sportsItems.get(SportType.Golf)?.displayOrder ?? 100,
            id: SportType.BetlinkGolf,
            name: i18nGolf,
        });
    }

    const isLivePage = popup === MODAL_ROUTE_NAME.liveGroupedSports;

    const sportList = isLivePage ? activeSportsToMap(reduxState) : updatedSports;

    const groups = useMemo(() => groupSportsByAlphabet(sportList, userLang), [sportList.size, userLang]);

    return (
        <S_ContainerForLargeScreen isVisible={isVisible} sportsCount={sportList.size}>
            <SportsModalDesktop groups={groups} />
        </S_ContainerForLargeScreen>
    );
};

export default observer(SportsModal);
