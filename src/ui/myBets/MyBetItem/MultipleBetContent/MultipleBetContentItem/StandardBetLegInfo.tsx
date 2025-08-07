import { format } from 'date-fns';
import { useRecoilValue } from 'recoil';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { RequestStatus } from 'src/common/enums';
import type { MyStandardBetLeg } from 'src/common/types/myBet';
import { S_EventInfoColumn } from 'src/ui/common/EventInfographics/styled';
import SelectionMarketName from 'src/ui/common/SelectionMarketName/SelectionMarketName';
import MyBetEventInfographics from 'src/ui/myBets/MyBetEventInfographics/MyBetEventInfographics';
import { S_BetTime } from 'src/ui/myBets/MyBetItem/BetId/styled';
import SelectionOdd from 'src/ui/myBets/MyBetItem/SelectionOdd/SelectionOdd';
import { S_MyBetEventInfographics, S_MyBetEventName } from 'src/ui/myBets/MyBetItem/styled';
import { isSettledTabSelector } from 'src/ui/myBets/store/selectors';
import { isLiveMyBet, showLegEventTime } from 'src/ui/myBets/utils/helpers';
import { DATE_FORMAT } from 'src/utils/constants';

import { S_StandardBetSelectionMarket } from '../styled';

const StandardBetLegInfo = ({ leg, event }: { leg: MyStandardBetLeg; event: EventModel | null }) => {
    const { event: legEvent, price, market, selection } = leg;

    const isSettledTab = useRecoilValue(isSettledTabSelector);

    const isLive = isLiveMyBet(legEvent, event) && !isSettledTab;

    if (isLive) {
        const isEventLoading = event?.state === RequestStatus.Progress;

        return (
            <>
                <S_StandardBetSelectionMarket>
                    <SelectionOdd price={price} />

                    <SelectionMarketName marketName={market.name} selectionName={selection.name} />
                </S_StandardBetSelectionMarket>

                {event !== null && !isEventLoading && (
                    <S_MyBetEventInfographics>
                        <S_EventInfoColumn>
                            <MyBetEventInfographics event={event} />
                        </S_EventInfoColumn>
                    </S_MyBetEventInfographics>
                )}
            </>
        );
    }

    const { name: eventName = '', startTime, tags = null } = legEvent;
    const showEventTime = showLegEventTime({ tags, startTime });

    return (
        <>
            <S_StandardBetSelectionMarket>
                <SelectionOdd price={price} />

                <SelectionMarketName marketName={market.name} selectionName={selection.name} />
            </S_StandardBetSelectionMarket>

            <S_MyBetEventName data-testid='eventName'>{eventName}</S_MyBetEventName>

            {showEventTime && (
                <S_BetTime data-testid='startTime' timeSettings='startTime'>
                    {format(new Date(startTime), DATE_FORMAT.NUMERIC_FULL_DATE_TIME_W_SEPARATOR)}
                </S_BetTime>
            )}
        </>
    );
};

export default StandardBetLegInfo;
