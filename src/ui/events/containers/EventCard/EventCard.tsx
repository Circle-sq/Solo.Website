import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { usePossibleBets } from '@solo-betslip/api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '@solo-betslip/enums';

import { refreshEvent, request as getEvent } from 'src/modules/events/actions/get';
import { eventSelector } from 'src/modules/events/selectors';
import EventCard from 'src/ui/events/EventCard/EventCard';

interface PropsTypes {
    id: string;
    shared: boolean;
}

const ConnectedEventCard = observer((props: PropsTypes) => {
    const REFRESH_TIMEOUT = window.$appState.env.refreshTimeout;
    const SHOULD_REFRESH_EVENT = window.$appState.env.shouldRefreshEvent;
    const dispatch = useDispatch();
    const id = +props.id;

    const event = useSelector(eventSelector(id));
    const status = useSelector((state) => state.events.getIn(['items', id, '_state']));
    const retrieved = useSelector((state) => state.events.getIn(['items', id, '_retrieved']));

    const { getPossibleBets } = usePossibleBets();

    const onLoadRequest = () => {
        dispatch(getEvent(props.id));
    };

    useEffect(() => {
        dispatch(getEvent(props.id));

        window.addEventListener('online', onLoadRequest);

        return () => {
            window.removeEventListener('online', onLoadRequest);
        };
    }, [props.id]);

    useEffect(() => {
        const pid = window.setTimeout(() => {
            if (SHOULD_REFRESH_EVENT) {
                dispatch(refreshEvent(props.id));
            }
            // force PossibleBets request from event cards
            // TODO check & remove
            getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.RefreshEventTimeOut });
        }, REFRESH_TIMEOUT);

        return () => window.clearTimeout(pid);
    }, [props.id, dispatch]);

    return <EventCard status={status} event={event} eventId={id} retrieved={retrieved} onLoadRequest={onLoadRequest} />;
});

export default ConnectedEventCard;
