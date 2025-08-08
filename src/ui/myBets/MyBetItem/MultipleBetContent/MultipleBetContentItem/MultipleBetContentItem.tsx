import { observer } from 'mobx-react-lite';
import { useRecoilCallback } from 'recoil';

import { isCrossBetLegType } from '@solo-betslip/typeGuards/leg';
import { MultipleBuildABetContent } from '@solo-buildABet/ui/myBet';
import { isBuildABetLegType } from '@solo-buildABet/utils/typeGuards';

import { useAppStateContext } from 'src/appState/AppState';
import BetStatusIcon from 'src/assets/icons/betStatusIcon/BetStatusIcon';
import type { BetStatus } from 'src/common/enums';
import type { MyBetLeg, MyBuildABetLeg, MyCrossBetLeg } from 'src/common/types/myBet';
import { closeMyBetsAndQuickBetTask } from 'src/ui/betting/store/tasks';
import BetContentLink from 'src/ui/myBets/MyBetItem/BetContentLink/BetContentLink';
import { getBetLegStatus } from 'src/ui/myBets/utils/helpers';

import { S_BetLegDivider, S_MultipleBetContentItem, S_MultipleBetStatus } from '../styled';

import CrossBetLegInfo from './CrossBetLegInfo';
import StandardBetLegInfo from './StandardBetLegInfo';

interface Props {
    leg: MyBetLeg;
    betStatus: BetStatus;
    isLastLeg: boolean;
    isSettledBet: boolean;
}

const MultipleBetContentItem = ({ leg, betStatus, isLastLeg, isSettledBet }: Props) => {
    const { id: eventId, name: eventName = '' } = leg.event;
    const testId = `myBets-eventId-${eventId}`;

    const { models } = useAppStateContext();
    const event = models.getEvent(Number(eventId));

    const isDisplayed = event?.display ?? false;
    const isDisabled = !isDisplayed || isSettledBet;

    const closeMyBetsAndQuickBet = useRecoilCallback(closeMyBetsAndQuickBetTask, []);

    const handleClick = () => {
        if (!isDisabled) {
            return closeMyBetsAndQuickBet();
        }
    };

    if (isBuildABetLegType<MyBuildABetLeg>(leg)) {
        return (
            <MultipleBuildABetContent
                leg={leg}
                event={event}
                betStatus={betStatus}
                isLastLeg={isLastLeg}
                isSettledBet={isSettledBet}
            />
        );
    }

    if (isCrossBetLegType<MyCrossBetLeg>(leg)) {
        return (
            <S_MultipleBetContentItem data-testid={testId}>
                <BetContentLink eventId={eventId} eventName={eventName} disabled={isDisabled} onClick={handleClick}>
                    <CrossBetLegInfo leg={leg} event={event} betStatus={betStatus} />

                    {isLastLeg && <S_BetLegDivider />}
                </BetContentLink>
            </S_MultipleBetContentItem>
        );
    }

    const status = getBetLegStatus(betStatus, leg.result);

    return (
        <S_MultipleBetContentItem data-testid={testId}>
            <S_MultipleBetStatus>
                <BetStatusIcon status={status} />
            </S_MultipleBetStatus>

            <BetContentLink eventId={eventId} eventName={eventName} disabled={isDisabled} onClick={handleClick}>
                <StandardBetLegInfo leg={leg} event={event} />

                {isLastLeg && <S_BetLegDivider />}
            </BetContentLink>
        </S_MultipleBetContentItem>
    );
};

export default observer(MultipleBetContentItem);
