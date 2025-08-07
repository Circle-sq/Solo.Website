import Box from '@mui/material/Box';

import { S_ScoreWrapper } from './styled';

interface Props {
    homeScore: string | null;
    awayScore: string | null;
}

const INIT_SCORE = 0;

const ScoreCard = ({ homeScore, awayScore }: Props) => (
    <S_ScoreWrapper data-testid='score-area'>
        {homeScore !== null && (
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                {homeScore || INIT_SCORE}
            </Box>
        )}
        <Box
            sx={{
                display: 'flex',
            }}
        >
            {'-'}
        </Box>
        {awayScore !== null && (
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                {awayScore || INIT_SCORE}
            </Box>
        )}
    </S_ScoreWrapper>
);

export default ScoreCard;
