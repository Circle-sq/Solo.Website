import { useAtomValue } from 'jotai';

import { primaryMainLineMarketIdsAtomFamily, secondaryMainLineMarketIdsAtomFamily } from '@sc-asianView/store/mainLine';

import { S_CommonCell } from '../styled';

import ExtremeRowEventLines from './EventLines/ExtremeRowEventLines';
import MiddleRowEventLine from './EventLines/MiddleRowEventLine';

interface Props {
    eventId: number;
    mainLineMarketIds: number[];
}

export const EventOddsCell = ({ eventId, mainLineMarketIds }: Props) => {
    const hasNoMarketsToDisplay = mainLineMarketIds.every((marketId) => marketId < 0);

    if (hasNoMarketsToDisplay) {
        return <S_CommonCell data-testid='eventOddsCellEmpty' />;
    }

    return (
        <S_CommonCell data-testid='eventOddsCell'>
            <ExtremeRowEventLines eventId={eventId} mainLineMarketIds={mainLineMarketIds} position='top' />

            <MiddleRowEventLine eventId={eventId} mainLineMarketIds={mainLineMarketIds} />

            <ExtremeRowEventLines eventId={eventId} mainLineMarketIds={mainLineMarketIds} position='bottom' />
        </S_CommonCell>
    );
};

export const PrimaryEventOddsCell = ({ eventId }: { eventId: number }) => {
    const primaryMainLineMarketIds = useAtomValue(primaryMainLineMarketIdsAtomFamily(eventId));

    return <EventOddsCell eventId={eventId} mainLineMarketIds={primaryMainLineMarketIds} />;
};

export const SecondaryEventOddsCell = ({ eventId }: { eventId: number }) => {
    const secondaryMainLineMarketIds = useAtomValue(secondaryMainLineMarketIdsAtomFamily(eventId));

    return <EventOddsCell eventId={eventId} mainLineMarketIds={secondaryMainLineMarketIds} />;
};
