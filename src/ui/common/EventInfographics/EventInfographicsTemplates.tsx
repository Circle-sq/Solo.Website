import get from 'lodash/get';

import type { SportType } from 'src/common/enums';
import type { Score, Statistics } from 'src/common/types/statistics';
import ActiveSportIcon from 'src/ui/common/ActiveSportIcon/ActiveSportIcon';

import { NumberRow, EventRowActiveIcon, BasicEventScore, S_Score, S_RedCard } from './styled';

export const FootballCardsScore = ({ score, stats }: { score: Score; stats: Statistics }) => {
    const redCard = get(stats, 'red-cards', { home: 0, away: 0 });
    const yellowRedCard = get(stats, 'yellow-red-cards', { home: 0, away: 0 });

    const countHomeCards = Number(redCard.home) + Number(yellowRedCard.home);
    const countAwayCards = Number(redCard.away) + Number(yellowRedCard.away);

    return (
        <BasicEventScore>
            <NumberRow>
                {countHomeCards > 0 && <S_RedCard>{countHomeCards}</S_RedCard>}
                <S_Score>{score.home}</S_Score>
            </NumberRow>
            <NumberRow>
                {countAwayCards > 0 && <S_RedCard>{countAwayCards}</S_RedCard>}
                <S_Score>{score.away}</S_Score>
            </NumberRow>
        </BasicEventScore>
    );
};

export const ActiveSportIconRow = ({ sport, turnValue }: { sport?: SportType; turnValue?: string }) => (
    <span>
        <NumberRow>
            <ActiveSportIcon sport={sport} hasTeam={turnValue === 'Team01'} icon={EventRowActiveIcon} />
        </NumberRow>
        <NumberRow>
            <ActiveSportIcon sport={sport} hasTeam={turnValue === 'Team02'} icon={EventRowActiveIcon} />
        </NumberRow>
    </span>
);
