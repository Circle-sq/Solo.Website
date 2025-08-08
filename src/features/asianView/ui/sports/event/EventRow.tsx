import { useAtomValue } from 'jotai';

import LockIcon from '@solo-asianView/icons/LockIcon';
import { S_LockedCellWrapper, S_LockedCellWrapperLive } from '@solo-asianView/ui/sports/market/styled';

import {
    eventInPlaySelectorFamily,
    eventPrimaryMarketsActiveSelectorFamily,
    eventSecondaryMarketsActiveSelectorFamily,
} from 'src/store/events/selectors/event';

import EventMoreCell from './EventMoreCell/EventMoreCell';
import EventNameCell from './EventNameCell/EventNameCell';
import { PrimaryEventOddsCell, SecondaryEventOddsCell } from './EventOddsCell/EventOddsCell';
import EventTimeCell from './EventTimeCell/EventTimeCell';

const EventRow = ({ id }: { id: number }) => {
    const eventPrimaryMarketsActive = useAtomValue(eventPrimaryMarketsActiveSelectorFamily(id));
    const eventSecondaryMarketsActive = useAtomValue(eventSecondaryMarketsActiveSelectorFamily(id));
    const isLive = useAtomValue(eventInPlaySelectorFamily(id));

    const LockedCellWrapper = isLive ? S_LockedCellWrapperLive : S_LockedCellWrapper;

    return (
        <>
            <EventTimeCell eventId={id} />
            <EventNameCell eventId={id} />

            {eventPrimaryMarketsActive ? (
                <PrimaryEventOddsCell eventId={id} />
            ) : (
                <LockedCellWrapper>
                    <LockIcon />
                </LockedCellWrapper>
            )}
            {eventSecondaryMarketsActive ? (
                <SecondaryEventOddsCell eventId={id} />
            ) : (
                <LockedCellWrapper>
                    <LockIcon />
                </LockedCellWrapper>
            )}

            <EventMoreCell eventId={id} />
        </>
    );
};

export default EventRow;
