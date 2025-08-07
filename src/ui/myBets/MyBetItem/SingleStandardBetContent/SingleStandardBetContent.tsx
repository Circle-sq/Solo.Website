import get from 'lodash/get';
import { observer } from 'mobx-react-lite';
import { useRecoilCallback } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import { BetStatus } from 'src/common/enums';
import type { MyBet, MyStandardBetLeg } from 'src/common/types/myBet';
import { closeMyBetsAndQuickBetTask } from 'src/ui/betting/store/tasks';
import { S_BetHeader, S_SingleBetHeader, S_ContentDetails, S_SingleBetInfo } from 'src/ui/myBets/MyBetItem/styled';

import BetContentLink from '../BetContentLink/BetContentLink';

import StandardBetHeader from './StandardBetHeader';
import StandardBetInfo from './StandardBetInfo';

const SingleStandardBetContent = ({ bet, betStatus }: { bet: MyBet<MyStandardBetLeg>; betStatus: BetStatus }) => {
    const leg: MyStandardBetLeg = get(bet, 'legs.0');
    const { id: eventId, name: eventName = '' } = leg.event;

    const { models } = useAppStateContext();
    const event = models.getEvent(eventId);

    const isDisplayed = event?.display ?? false;
    const isSettledBet = bet.status === BetStatus.Settled;
    const isDisabled = isSettledBet || !isDisplayed;

    const closeMyBetsAndQuickBet = useRecoilCallback(closeMyBetsAndQuickBetTask, []);

    const handleClick = () => {
        if (!isDisabled) {
            return closeMyBetsAndQuickBet();
        }
    };

    return (
        <>
            <S_SingleBetHeader>
                <S_BetHeader data-testid='betHeader'>
                    <StandardBetHeader leg={leg} betStatus={betStatus} />
                </S_BetHeader>
            </S_SingleBetHeader>

            <S_ContentDetails>
                <S_SingleBetInfo data-testid={`myBets-eventId-${eventId}`}>
                    <BetContentLink eventId={eventId} eventName={eventName} disabled={isDisabled} onClick={handleClick}>
                        <StandardBetInfo leg={leg} event={event} />
                    </BetContentLink>
                </S_SingleBetInfo>
            </S_ContentDetails>
        </>
    );
};

export default observer(SingleStandardBetContent);
