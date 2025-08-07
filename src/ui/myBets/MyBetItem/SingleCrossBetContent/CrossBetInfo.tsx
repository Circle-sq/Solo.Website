import { useRecoilValue } from 'recoil';

import CrossBetLeg from '@sc-betslip/ui/SelectionItem/CrossBet/CrossBetLeg/CrossBetLeg';
import { S_MultiBetEventInfo, S_MultiBetInfo, S_MultiBetTime } from '@sc-buildABet/ui/myBet/BuildABetInfo/styled';
import { S_MultiBetLegEvent, S_SelectionEvent, S_SelectionEventContainer } from '@sc-buildABet/ui/myBet/styled';

import type { EventModel } from 'src/appState/models/models/EventModel';
import type { BetStatus } from 'src/common/enums';
import { RequestStatus } from 'src/common/enums';
import { formatStartTime } from 'src/common/helpers/event';
import type { MyCrossBetLeg } from 'src/common/types/myBet';
import { S_EventInfoColumn } from 'src/ui/common/EventInfographics/styled';
import MyBetEventInfographics from 'src/ui/myBets/MyBetEventInfographics/MyBetEventInfographics';
import { S_MyBetEventInfographics } from 'src/ui/myBets/MyBetItem/styled';
import { isSettledTabSelector } from 'src/ui/myBets/store/selectors';
import { isLiveMyBet, showLegEventTime } from 'src/ui/myBets/utils/helpers';

interface Props {
    leg: MyCrossBetLeg;
    event: EventModel | null;
    betStatus: BetStatus;
}

const CrossBetInfo = ({ leg, event, betStatus }: Props) => {
    const { event: legEvent, marketsAndSelections } = leg;

    const isSettledTab = useRecoilValue(isSettledTabSelector);

    const isLive = isLiveMyBet(legEvent, event) && !isSettledTab;

    if (isLive) {
        const isEventLoading = event?.state === RequestStatus.Progress;

        return (
            <S_MyBetEventInfographics>
                {event !== null && !isEventLoading && (
                    <S_EventInfoColumn>
                        <CrossBetLeg
                            marketsAndSelections={marketsAndSelections}
                            eventScore={event.score}
                            eventId={legEvent.id}
                        />

                        <MyBetEventInfographics event={event} indented />
                    </S_EventInfoColumn>
                )}
            </S_MyBetEventInfographics>
        );
    }

    const { name: eventName = '', startTime, tags = null } = legEvent;
    const showEventTime = showLegEventTime({ tags, startTime });

    return (
        <S_MultiBetInfo>
            <CrossBetLeg betStatus={betStatus} marketsAndSelections={marketsAndSelections} eventId={legEvent.id} />

            <S_MultiBetEventInfo>
                <S_MultiBetLegEvent>
                    <S_SelectionEventContainer>
                        <S_SelectionEvent data-testid='eventName'>{eventName}</S_SelectionEvent>
                        {showEventTime && (
                            <S_MultiBetTime data-testid='startTime'>{`| ${formatStartTime(startTime)}`}</S_MultiBetTime>
                        )}
                    </S_SelectionEventContainer>
                </S_MultiBetLegEvent>
            </S_MultiBetEventInfo>
        </S_MultiBetInfo>
    );
};

export default CrossBetInfo;
