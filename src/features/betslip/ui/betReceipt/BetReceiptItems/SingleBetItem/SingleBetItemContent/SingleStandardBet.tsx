import { observer } from 'mobx-react-lite';

import { useAppStateContext } from 'src/appState/AppState';

import type { PlacedStandardBetLeg } from '../../../../../api/types/placedBet';
import SelectionMarketInfo from '../../../SelectionMarketInfo/SelectionMarketInfo';
import { S_EventInfo, S_BetLegInfo, S_EventName, S_StandardBetLegContent } from '../../styled';
import BetReceiptLegStakeInfo from '../BetReceiptLegStakeInfo/BetReceiptLegStakeInfo';
import { S_LegStakeInfo } from '../styled';

const SingleStandardBet = ({ leg }: { leg: PlacedStandardBetLeg }) => {
    const { event, potentialReturns, stakePerLine = null } = leg;

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

                <S_LegStakeInfo>
                    <BetReceiptLegStakeInfo stakePerLine={stakePerLine} potentialReturns={potentialReturns} />
                </S_LegStakeInfo>
            </S_BetLegInfo>
        </S_StandardBetLegContent>
    );
};

export default observer(SingleStandardBet);
