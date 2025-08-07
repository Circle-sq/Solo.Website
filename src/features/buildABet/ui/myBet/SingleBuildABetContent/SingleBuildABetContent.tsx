import get from 'lodash/get';
import { observer } from 'mobx-react-lite';
import { useRecoilCallback } from 'recoil';

import { BetStatus } from 'src/common/enums';
import type { MyBuildABetLeg, MyBet } from 'src/common/types/myBet';
import { useAppStateContext } from 'src/appState/AppState';
import BetContentLink from 'src/ui/myBets/MyBetItem/BetContentLink/BetContentLink';
import { S_BetHeader, S_SingleBetHeader, S_ContentDetails, S_SingleBetInfo } from 'src/ui/myBets/MyBetItem/styled';
import { closeMyBetsAndQuickBetTask } from 'src/ui/betting/store/tasks';

import BuildABetInfo from '../BuildABetInfo/BuildABetInfo';

import BuildABetHeader from './BuildABetHeader/BuildABetHeader';

interface Props {
    bet: MyBet<MyBuildABetLeg>;
    betStatus: BetStatus;
}

const SingleBuildABetContent = ({ bet, betStatus }: Props) => {
    const leg: MyBuildABetLeg = get(bet, 'legs.0');
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
                    <BuildABetHeader leg={leg} betStatus={betStatus} />
                </S_BetHeader>
            </S_SingleBetHeader>

            <S_ContentDetails>
                <S_SingleBetInfo data-testid={`myBets-eventId-${eventId}`}>
                    <BetContentLink eventId={eventId} eventName={eventName} disabled={isDisabled} onClick={handleClick}>
                        <BuildABetInfo leg={leg} event={event} betStatus={betStatus} />
                    </BetContentLink>
                </S_SingleBetInfo>
            </S_ContentDetails>
        </>
    );
};

export default observer(SingleBuildABetContent);
