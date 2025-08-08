import { CircularProgress, Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { betslipBetsCounterSelector } from '@solo-betslip/store/selectors/betslipBets';
import { typographyColor } from '@solo-ui/system';

import { I18n } from 'src/ui/common/Language/I18n';

import { useIsInitializing } from '../hooks/useIsInitializing';

import { S_Counter } from './styled';

const QuickBetTitle = () => {
    const betsCount = useRecoilValue(betslipBetsCounterSelector);
    const isInitializing = useIsInitializing();

    return (
        <Stack
            component='span'
            direction='row'
            spacing={0.5}
            sx={{ overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}
        >
            <Typography noWrap component='span' variant='h2' sx={{ color: typographyColor.white }}>
                <I18n langKey='bets.quick-bet.header' defaultText='Betslip' />
            </Typography>

            <Stack component='span' sx={{ width: 16, height: 16, justifyContent: 'center' }}>
                {isInitializing ? (
                    <CircularProgress disableShrink size={14} thickness={6} sx={{ color: 'white' }} />
                ) : (
                    <S_Counter component='span' variant='h4'>
                        {betsCount}
                    </S_Counter>
                )}
            </Stack>
        </Stack>
    );
};

export default QuickBetTitle;
