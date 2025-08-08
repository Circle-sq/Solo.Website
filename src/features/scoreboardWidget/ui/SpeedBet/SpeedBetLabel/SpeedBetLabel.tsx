import { Box } from '@mui/material';
import { useWindowWidth } from '@solo-hooks';

import { I18n } from 'src/ui/common/Language/I18n';

import { SpeedBetLabelIcon } from '../../../assets/icons/index';

import { S_LabelText, S_LabelWrapper } from './styled';

export const SpeedBetLabel = ({ isMarqueeCard = false }: { isMarqueeCard?: boolean }) => {
    const { isMobile } = useWindowWidth();

    if (isMobile || isMarqueeCard) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center'>
                <SpeedBetLabelIcon fontSize='xsmall' />
            </Box>
        );
    }

    return (
        <S_LabelWrapper>
            <SpeedBetLabelIcon fontSize='xsmall' />
            <S_LabelText>
                <I18n langKey='speedBet.tabs.speedBet' defaultText='Speed bet' />
            </S_LabelText>
        </S_LabelWrapper>
    );
};

export default SpeedBetLabel;
