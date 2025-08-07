import Box from '@mui/material/Box';

import { CupIcon } from '@sc-ui/icons/svg';

const DefaultCupIcon = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                mr: '5px',
            }}
        >
            <CupIcon fontSize='xsmall' />
        </Box>
    );
};

export default DefaultCupIcon;
