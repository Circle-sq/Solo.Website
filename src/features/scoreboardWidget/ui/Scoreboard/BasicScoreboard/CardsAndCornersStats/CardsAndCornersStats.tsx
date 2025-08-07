import Box from '@mui/material/Box';

import { S_CardsAndCornersStatsWrapper, S_IconStats, S_LabelStats } from './styled';

interface StatsItem {
    id: number;
    type: string;
    icon: string;
    count: number;
}

interface Props {
    stats: StatsItem[];
}

const CardsAndCornersStats = ({ stats }: Props) => {
    const statsItems = stats.map(({ id, icon, count }) => (
        <Box
            key={id}
            sx={{
                display: 'flex',
            }}
        >
            <S_IconStats src={icon} />
            <S_LabelStats data-testid={`stats-count-${id}`}>{count}</S_LabelStats>
        </Box>
    ));

    return (
        <S_CardsAndCornersStatsWrapper data-testid='cardsAndCornersStats'>{statsItems}</S_CardsAndCornersStatsWrapper>
    );
};

export default CardsAndCornersStats;
