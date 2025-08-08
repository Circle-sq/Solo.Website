import type { PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';

import BuildABetLeg from '@solo-buildABet/ui/BuildABetLeg/BuildABetLeg';

import type { EventModel } from 'src/appState/models/models/EventModel';
import type { BetStatus } from 'src/common/enums';
import { RequestStatus } from 'src/common/enums';
import { formatStartTime } from 'src/common/helpers/event';
import type { MyBuildABetLeg } from 'src/common/types/myBet';
import { S_EventInfoColumn } from 'src/ui/common/EventInfographics/styled';
import { S_SelectionName } from 'src/ui/common/SelectionMarketName/styled';
import { S_MyBetEventInfographics } from 'src/ui/myBets/MyBetItem/styled';
import { isSettledTabSelector } from 'src/ui/myBets/store/selectors';
import { isLiveMyBet, showLegEventTime } from 'src/ui/myBets/utils/helpers';

import { BuildABetOdds } from '../BuildABetOdds/BuildABetOdds';
import { S_MultiBetLegEvent, S_SelectionEvent, S_SelectionEventContainer } from '../styled';

import BuildABetEventInfographics from './BuildABetEventInfographics/BuildABetEventInfographics';
import { S_BuildABetLiveEventInfo, S_MultiBetEventInfo, S_MultiBetInfo, S_MultiBetTime } from './styled';

interface Props {
    leg: MyBuildABetLeg;
    event: EventModel | null;
    betStatus: BetStatus;
}

const BuildABetInfo = ({ leg, event, betStatus, children }: PropsWithChildren<Props>) => {
    const { event: legEvent, marketsAndSelections, price } = leg;
    const isSettledTab = useRecoilValue(isSettledTabSelector);

    const isLive = isLiveMyBet(legEvent, event) && !isSettledTab;

    if (isLive) {
        const isEventLoading = event?.state === RequestStatus.Progress;

        return (
            <S_MyBetEventInfographics>
                {event !== null && !isEventLoading && (
                    <S_EventInfoColumn>
                        <BuildABetLeg marketsAndSelections={marketsAndSelections} />
                        <BuildABetOdds price={price} />
                        <S_BuildABetLiveEventInfo>
                            {children}
                            <S_SelectionName data-testid='selectionName'>{legEvent.name}</S_SelectionName>
                            <BuildABetEventInfographics event={event} />
                        </S_BuildABetLiveEventInfo>
                    </S_EventInfoColumn>
                )}
            </S_MyBetEventInfographics>
        );
    }

    const { name: eventName = '', startTime, tags = null } = legEvent;
    const showEventTime = showLegEventTime({ tags, startTime });

    return (
        <S_MultiBetInfo>
            <BuildABetLeg marketsAndSelections={marketsAndSelections} betStatus={betStatus} />

            <S_MultiBetEventInfo>
                <S_MultiBetLegEvent>
                    {children}
                    <S_SelectionEventContainer>
                        <S_SelectionEvent data-testid='eventName'>{eventName}</S_SelectionEvent>
                        {showEventTime && (
                            <S_MultiBetTime data-testid='startTime'>{`| ${formatStartTime(startTime)}`}</S_MultiBetTime>
                        )}
                    </S_SelectionEventContainer>
                    <BuildABetOdds price={price} />
                </S_MultiBetLegEvent>
            </S_MultiBetEventInfo>
        </S_MultiBetInfo>
    );
};

export default BuildABetInfo;
