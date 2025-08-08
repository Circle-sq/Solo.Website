import Box from '@mui/material/Box';

import { GenericColors } from '@solo-ui/system';

function ServingIndicator({ serving }: { serving: boolean }) {
    return (
        <Box
            sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: serving ? 'rgb(0, 122, 204)' : GenericColors.transparent,
                margin: 'auto',
                position: 'relative',
            }}
        />
    );
}

export default ServingIndicator;
