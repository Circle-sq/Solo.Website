import { useAtomValue } from 'jotai';
import get from 'lodash/get';

import { getParticipantInfo } from '@sc-asianView/helpers';
import { hasDrawSelectionAtomFamily } from '@sc-asianView/store/mainLine';

import { SportType } from 'src/common/enums';
import {
    eventInPlaySelectorFamily,
    eventParticipantsSelectorFamily,
    eventSportSelectorFamily,
    eventStatisticsSelectorFamily,
} from 'src/store/events/selectors/event';
import { uniformUrlSelectorFamily } from 'src/store/uniforms/selectors';
import { I18n } from 'src/ui/common/Language/I18n';

import { S_CommonCell, S_CommonCellLive } from '../styled';

import EventMediaIcons from './EventMediaIcons';
import {
    AsianViewTeamShirt,
    S_DrawLabel,
    S_ParticipantName,
    S_RedCardScore,
    S_TableEventCellRow,
    S_TableEventCellRowNoPadding,
} from './styled';

const participantWithRedCardStyles = {
    marginRight: '8px',
};

const EventNameCell = ({ eventId }: { eventId: number }) => {
    const [homeTeam, awayTeam] = useAtomValue(eventParticipantsSelectorFamily(eventId));
    const statistics = useAtomValue(eventStatisticsSelectorFamily(eventId));
    const hasDrawSelection = useAtomValue(hasDrawSelectionAtomFamily(eventId));
    const sport = useAtomValue(eventSportSelectorFamily(eventId));
    const isLive = useAtomValue(eventInPlaySelectorFamily(eventId));

    const { name: homeTeamName, url: homeUniformUrl } = getParticipantInfo(homeTeam);
    const { name: awayTeamName, url: awayUniformUrl } = getParticipantInfo(awayTeam);

    const homeUrl = useAtomValue(uniformUrlSelectorFamily(homeUniformUrl));
    const awayUrl = useAtomValue(uniformUrlSelectorFamily(awayUniformUrl));
    const hasUniform = homeUrl !== undefined && awayUrl !== undefined;

    const isFootballEvent = sport === SportType.Football;

    const redCard = get(statistics, 'red-cards', { home: 0, away: 0 });
    const yellowRedCard = get(statistics, 'yellow-red-cards', { home: 0, away: 0 });

    const countHomeCards = Number(redCard.home) + Number(yellowRedCard.home);
    const countAwayCards = Number(redCard.away) + Number(yellowRedCard.away);

    const showHomeRedCards = isFootballEvent && countHomeCards > 0;
    const showAwayRedCards = isFootballEvent && countAwayCards > 0;

    const homeParticipantWithRedCardStyles = showHomeRedCards ? participantWithRedCardStyles : null;
    const awayParticipantWithRedCardStyles = showAwayRedCards ? participantWithRedCardStyles : null;

    const CommonCell = isLive ? S_CommonCellLive : S_CommonCell;

    return (
        <CommonCell data-testid='eventNameCell'>
            <S_TableEventCellRowNoPadding>
                <div>
                    <S_TableEventCellRow>
                        {hasUniform && <AsianViewTeamShirt src={homeUrl} />}
                        <S_ParticipantName title={homeTeamName} css={homeParticipantWithRedCardStyles}>
                            {homeTeamName}
                        </S_ParticipantName>
                        {showHomeRedCards && (
                            <S_RedCardScore>
                                <span>{countHomeCards}</span>
                            </S_RedCardScore>
                        )}
                    </S_TableEventCellRow>
                    <S_TableEventCellRow>
                        {hasUniform && <AsianViewTeamShirt src={awayUrl} />}
                        <S_ParticipantName title={awayTeamName} css={awayParticipantWithRedCardStyles}>
                            {awayTeamName}
                        </S_ParticipantName>
                        {showAwayRedCards && (
                            <S_RedCardScore>
                                <span>{countAwayCards}</span>
                            </S_RedCardScore>
                        )}
                    </S_TableEventCellRow>
                    <S_TableEventCellRow>
                        {hasDrawSelection && (
                            <S_DrawLabel hasUniform={hasUniform}>
                                <I18n langKey='asianView.event.markets.draw' defaultText='DRAW' />
                            </S_DrawLabel>
                        )}
                    </S_TableEventCellRow>
                </div>

                <EventMediaIcons eventId={eventId} />
            </S_TableEventCellRowNoPadding>
        </CommonCell>
    );
};

export default EventNameCell;
