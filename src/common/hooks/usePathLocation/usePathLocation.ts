import { useRecoilValue } from 'recoil';

import { lastSelectionSelector } from '@solo-betslip/store/selectors/selections';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { getEventIdFromRoute } from 'src/common/helpers/event';

export const usePathLocation = () => {
    const lastSelection = useRecoilValue(lastSelectionSelector);

    const {
        router: { route },
    } = useAppStateContext();

    const isEventPage = route.name === RouteName.Event;
    const eventId = getEventIdFromRoute(route) ?? lastSelection?.eventId;

    return {
        isEventPage,
        eventId,
    };
};
