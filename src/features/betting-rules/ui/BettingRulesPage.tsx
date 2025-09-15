import { MemoryRouter } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { ThemeSwitchProvider, cssColor } from '@solo-ui/system';

import LogoNew from 'src/assets/icons/logo/LogoNew';

const BettingRulesPage = () => {
    return (
        <MemoryRouter>
            <ThemeSwitchProvider>
                <Box>
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        pb={2}
                        borderBottom={`1px solid ${cssColor('--divider-primary-color')}`}
                    >
                        <LogoNew />
                        <Typography textAlign='center' variant='h1'>
                            Betting Rules
                        </Typography>
                    </Box>
                </Box>
            </ThemeSwitchProvider>
        </MemoryRouter>
    );
};

export default BettingRulesPage;
