import get from 'lodash/get';
import { observer } from 'mobx-react-lite';

import { useAppStateContext } from 'src/appState/AppState';
import { BetStatus } from 'src/common/enums';
import type { MyBet, MyCrossBetLeg } from 'src/common/types/myBet';
import BetContentLink from 'src/ui/myBets/MyBetItem/BetContentLink/BetContentLink';
import { S_BetHeader, S_SingleBetHeader, S_ContentDetails, S_SingleBetInfo } from 'src/ui/myBets/MyBetItem/styled';

import CrossBetHeader from './CrossBetHeader';
import CrossBetInfo from './CrossBetInfo';

const SingleCrossBetContent = ({ bet, betStatus }: { bet: MyBet<MyCrossBetLeg>; betStatus: BetStatus }) => {
    const leg: MyCrossBetLeg = get(bet, 'legs.0');
    const { id: eventId, name: eventName = '' } = leg.event;

    const { models } = useAppStateContext();
    const event = models.getEvent(eventId);

    const isDisplayed = event?.display ?? false;
    const isSettledBet = bet.status === BetStatus.Settled;
    const isDisabled = isSettledBet || !isDisplayed;

    return (
        <>
            <S_SingleBetHeader>
                <S_BetHeader data-testid='betHeader'>
                    <CrossBetHeader leg={leg} betStatus={betStatus} />
                </S_BetHeader>
            </S_SingleBetHeader>

            <S_ContentDetails>
                <S_SingleBetInfo data-testid={`myBets-eventId-${eventId}`}>
                    <BetContentLink eventId={eventId} eventName={eventName} disabled={isDisabled}>
                        <CrossBetInfo leg={leg} event={event} betStatus={betStatus} />
                    </BetContentLink>
                </S_SingleBetInfo>
            </S_ContentDetails>
        </>
    );
};

export default observer(SingleCrossBetContent);
