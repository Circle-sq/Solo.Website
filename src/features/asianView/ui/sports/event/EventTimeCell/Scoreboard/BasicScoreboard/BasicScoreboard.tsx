import type { Score } from 'src/common/types/statistics';

import { S_BasicScoreboard, S_NumberRow, S_RowScore, S_ScoreboardSeparator } from '../styled';

const BasicScoreboard = ({ score }: { score: Score }) => (
    <S_BasicScoreboard>
        <S_NumberRow>
            <S_RowScore>{score.home}</S_RowScore>
        </S_NumberRow>
        <S_ScoreboardSeparator>-</S_ScoreboardSeparator>
        <S_NumberRow>
            <S_RowScore>{score.away}</S_RowScore>
        </S_NumberRow>
    </S_BasicScoreboard>
);

export default BasicScoreboard;
