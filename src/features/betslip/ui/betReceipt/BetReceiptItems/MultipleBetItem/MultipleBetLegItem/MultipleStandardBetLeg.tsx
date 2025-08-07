import { observer } from 'mobx-react-lite';

import { useAppStateContext } from 'src/appState/AppState';

import type { PlacedStandardBetLeg } from '../../../../../api/types/placedBet';
import SelectionMarketInfo from '../../../SelectionMarketInfo/SelectionMarketInfo';
import { S_BetLegInfo, S_EventInfo, S_EventName, S_StandardBetLegContent } from '../../styled';

const MultipleStandardBetLeg = ({ leg }: { leg: PlacedStandardBetLeg }) => {
    const { event } = leg;

    const { models } = useAppStateContext();

    const eventModel = models.getEvent(Number(event.id));
    const eventName = eventModel?.name ?? '';

    return (
        <S_StandardBetLegContent data-testid={`betReceipt-eventId-${event.id}`}>
            <SelectionMarketInfo leg={leg} />

            <S_BetLegInfo>
                <S_EventInfo>
                    <S_EventName data-testid='eventName'>{eventName}</S_EventName>
                </S_EventInfo>
            </S_BetLegInfo>
        </S_StandardBetLegContent>
    );
};

export default observer(MultipleStandardBetLeg);
