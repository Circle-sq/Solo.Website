import { useRecoilValue } from 'recoil';

import { penaltyScoreSelector } from 'src/ui/events/store/selectors/statistics';

import { S_PenaltyScoreSeparator, S_PenaltyScore, S_PenaltyScoreWrapper } from './styled';

interface Props {
    eventId: number;
}

const PenaltyShootout = ({ eventId }: Props) => {
    const { home: homePenaltyScore, away: awayPenaltyScore } = useRecoilValue(penaltyScoreSelector(eventId));

    return (
        <S_PenaltyScoreWrapper data-testid='penalty-score-area'>
            <S_PenaltyScore>{homePenaltyScore}</S_PenaltyScore>
            <S_PenaltyScoreSeparator>{'-'}</S_PenaltyScoreSeparator>
            <S_PenaltyScore>{awayPenaltyScore}</S_PenaltyScore>
        </S_PenaltyScoreWrapper>
    );
};

export default PenaltyShootout;
