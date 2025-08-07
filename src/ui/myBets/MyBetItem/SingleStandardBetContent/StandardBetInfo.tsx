import { Typography } from '@mui/material';
import { format } from 'date-fns';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { useRecoilValue } from 'recoil';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { RequestStatus, SelectionIdentifier } from 'src/common/enums';
import type { MarketItem } from 'src/common/types/market';
import type { MyStandardBetLeg } from 'src/common/types/myBet';
import { useSpeedMarketTranslations } from 'src/features/scoreboardWidget/hooks/useSpeedMarketTranslations';
import { marketSelector } from 'src/modules/events/selectors';
import { S_EventInfoColumn } from 'src/ui/common/EventInfographics/styled';
import SelectionMarketName from 'src/ui/common/SelectionMarketName/SelectionMarketName';
import MyBetEventInfographics from 'src/ui/myBets/MyBetEventInfographics/MyBetEventInfographics';
import { S_BetTime } from 'src/ui/myBets/MyBetItem/BetId/styled';
import { S_MyBetEventInfographics, S_MyBetEventName } from 'src/ui/myBets/MyBetItem/styled';
import { isSettledTabSelector } from 'src/ui/myBets/store/selectors';
import { isLiveMyBet, showLegEventTime } from 'src/ui/myBets/utils/helpers';
import { DATE_FORMAT } from 'src/utils/constants';

import { S_StandardBetSelectionMarket } from '../MultipleBetContent/styled';

const StandardBetInfo = ({ leg, event }: { leg: MyStandardBetLeg; event: EventModel | null }) => {
    const { event: legEvent, market, selection } = leg;

    const isSettledTab = useRecoilValue(isSettledTabSelector);

    const isLive = isLiveMyBet(legEvent, event) && !isSettledTab;

    const reduxMarket: MarketItem = useSelector(marketSelector(event?.id || 0, market.id));

    const { marketName = market.name, yesSelectionLabel, noSelectionLabel } = useSpeedMarketTranslations(reduxMarket);

    const isSpeedBetEvent = get(legEvent, 'tags.speed-bet[0]') === 'yes';
    const constraintNote = isSpeedBetEvent ? market.constraint : '';

    const getSelectionName = () => {
        const selectionIdentifier = get(reduxMarket, ['selections', selection.id, 'tags', 'selection-identifier', 0]);

        if (selectionIdentifier === SelectionIdentifier.Yes && yesSelectionLabel) {
            return yesSelectionLabel;
        }

        if (selectionIdentifier === SelectionIdentifier.No && noSelectionLabel) {
            return noSelectionLabel;
        }

        return selection.name;
    };

    const selectionName = getSelectionName();

    if (isLive) {
        const isEventLoading = event?.state === RequestStatus.Progress;

        return (
            <>
                <S_StandardBetSelectionMarket>
                    <SelectionMarketName marketName={marketName} selectionName={selectionName} />
                </S_StandardBetSelectionMarket>

                {constraintNote && (
                    <Typography variant='body3' sx={{ paddingTop: '8px' }}>
                        {constraintNote}
                    </Typography>
                )}

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

    const { startTime, tags = null } = legEvent;

    const showEventTime = showLegEventTime({ tags, startTime });
    const betEventTime = startTime ? format(new Date(startTime), DATE_FORMAT.NUMERIC_FULL_DATE_TIME_W_SEPARATOR) : '';

    return (
        <>
            <S_StandardBetSelectionMarket>
                <SelectionMarketName marketName={marketName} selectionName={selectionName} />
            </S_StandardBetSelectionMarket>

            {constraintNote && (
                <Typography variant='body3' sx={{ padding: '4px 0 4px' }}>
                    {constraintNote}
                </Typography>
            )}

            <S_MyBetEventName data-testid='eventName'>{event?.name}</S_MyBetEventName>

            {showEventTime && (
                <S_BetTime data-testid='startTime' timeSettings='startTime'>
                    {betEventTime}
                </S_BetTime>
            )}
        </>
    );
};

export default StandardBetInfo;
