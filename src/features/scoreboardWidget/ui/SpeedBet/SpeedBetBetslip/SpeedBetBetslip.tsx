import Box from '@mui/material/Box';
import { useWindowWidth } from '@solo-hooks';
import isEmpty from 'lodash/isEmpty';
import { useRecoilValue } from 'recoil';

import { MinMaxErrorCode } from '../../../enums';
import usePossibleBets from '../../../hooks/usePossibleBets';
import { speedBetBetslipErrorListAtom } from '../../../store/atoms';

import BackButton from './BackButton/BackButton';
import MarketSelectionResult from './MarketSelectionResult/MarketSelectionResult';
import PlaceBetButton from './PlaceBetButton/PlaceBetButton';
import PossibleWinnings from './PossibleWinnings/PossibleWinnings';
import StakeInput from './StakeInput/StakeInput';
import StakeNumpad from './StakeNumpad/StakeNumpad';
import ValidationError from './ValidationError/ValidationError';

const minMaxErrorCodes = [MinMaxErrorCode.TooHigh, MinMaxErrorCode.BelowMinimum, MinMaxErrorCode.MaxPayout];

const SpeedBetBetslip = () => {
    usePossibleBets();

    const { isTablet } = useWindowWidth();

    const betslipErrorList = useRecoilValue(speedBetBetslipErrorListAtom);

    const hasErrors = !isEmpty(betslipErrorList);

    const minMaxError = betslipErrorList.find((error) => minMaxErrorCodes.includes(error.code as MinMaxErrorCode));

    return (
        <Box
            sx={{
                maxWidth: '326px',
                margin: '0 auto',
            }}
            data-testid='speedBetBetslip'
        >
            <MarketSelectionResult />

            <Box
                sx={{
                    display: 'flex',
                    gap: '8px',
                }}
            >
                {isTablet && <BackButton />}
                <StakeInput hasErrors={hasErrors} />
                {isTablet && <PlaceBetButton />}
            </Box>

            {minMaxError ? <ValidationError error={minMaxError} /> : <PossibleWinnings />}

            <StakeNumpad />

            {!isTablet && (
                <Box
                    sx={{
                        display: 'flex',
                        gap: '8px',
                    }}
                >
                    <BackButton />
                    <PlaceBetButton />
                </Box>
            )}
        </Box>
    );
};

export default SpeedBetBetslip;
