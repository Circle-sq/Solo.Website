import Typography from '@mui/material/Typography';

import { typographyColor } from '@sc-ui/system';

import { SpeedBetStatus } from 'src/features/scoreboardWidget/enums';
import { I18n } from 'src/ui/common/Language/I18n';

import { NextBetAnimatedIcon } from './AnimatedIcons/NextBetAnimatedIcon';
import { NoBetsAnimatedIcon } from './AnimatedIcons/NoBetsAnimatedIcon';
import { S_ErrorWrapper } from './styled';

interface Props {
    type?: string;
}

const ErrorWrapper = ({ type }: Props) => {
    if (type === SpeedBetStatus.ComingSoon) {
        return (
            <S_ErrorWrapper>
                <NextBetAnimatedIcon />
                <Typography
                    variant='body1'
                    sx={{
                        marginBottom: '2px',
                    }}
                >
                    <I18n langKey='speedBet.error.nextSpeedBet' defaultText='Next speed bet' />
                </Typography>
                <Typography
                    data-testid='speedBetBetslipAlertMessage'
                    component='p'
                    variant='body3'
                    sx={{
                        color: typographyColor.white,
                    }}
                >
                    <I18n langKey='speedBet.error.commingSoon' defaultText='is coming soon' />
                </Typography>
            </S_ErrorWrapper>
        );
    }

    return (
        <S_ErrorWrapper>
            <NoBetsAnimatedIcon />
            <Typography
                data-testid='speedBetBetslipAlertMessage'
                component='p'
                variant='body3'
                sx={{
                    color: typographyColor.white,
                }}
            >
                <I18n langKey='speedBet.error.notAvailable' defaultText='Sorry, no speed bets are available' />
            </Typography>
        </S_ErrorWrapper>
    );
};

export default ErrorWrapper;
