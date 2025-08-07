import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';

import { TurnValue } from 'src/common/enums';
import {
    currentPeriodCountSelector,
    eventTurnValueSelector,
    periodScoresSelector,
} from 'src/ui/events/store/selectors/statistics';

import {
    S_ScoreboardDetailsWrapper,
    S_HomeAway,
    S_ScoreboardDetailsPeriod,
    S_ServeHomeAway,
    S_IconWrapper,
} from './styled';

const ScoreboardDetails = ({ eventId }: { eventId: number }) => {
    const currentTurn = useRecoilValue(eventTurnValueSelector(eventId));
    const currentPeriod = useRecoilValue(currentPeriodCountSelector(eventId));
    const periodScores = useRecoilValue(periodScoresSelector(eventId));

    if (currentPeriod === 0) {
        return null;
    }

    const listInnings = periodScores.map(({ period, home, away }) => {
        const isCurrentPeriod = currentPeriod === period;

        return (
            <Box key={period}>
                <S_ScoreboardDetailsPeriod isCurrentPeriod={isCurrentPeriod}>{period}</S_ScoreboardDetailsPeriod>
                <S_HomeAway isCurrentPeriod={isCurrentPeriod}>{home}</S_HomeAway>
                <S_HomeAway isCurrentPeriod={isCurrentPeriod}>{away}</S_HomeAway>
            </Box>
        );
    });

    return (
        <S_ScoreboardDetailsWrapper>
            <Box>
                <Box sx={{ height: '16px' }} />
                <S_IconWrapper>
                    <S_ServeHomeAway isServe={currentTurn === TurnValue.Team01} />
                </S_IconWrapper>
                <S_IconWrapper>
                    <S_ServeHomeAway isServe={currentTurn === TurnValue.Team02} />
                </S_IconWrapper>
            </Box>
            {listInnings}
        </S_ScoreboardDetailsWrapper>
    );
};

export default ScoreboardDetails;
