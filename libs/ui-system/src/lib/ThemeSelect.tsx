import ContrastIcon from '@mui/icons-material/Contrast';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PaletteIcon from '@mui/icons-material/Palette';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

import { ThemeNames } from './theme-names';

const themeSelectStyles = {
    position: 'fixed',
    zIndex: 100,
    height: '40px',
    mt: '8px',
    left: '50%',
    minWidth: '230px',
    backgroundColor: `background.paper`,
};

const valueStyles = {
    display: 'flex',
    gap: '10px',
    color: 'white',
    alignItems: 'center',
    padding: '0',
};

export function ThemeSelect({ value, onChange }: { value: ThemeNames; onChange: (themeName: ThemeNames) => void }) {
    const renderValue = (value: ThemeNames) => {
        if (value === ThemeNames.Neon) {
            return (
                <Box sx={valueStyles}>
                    <PaletteIcon fontSize='small' color='primary' />
                    <Typography variant='body4' sx={{ fontWeight: 'bold' }}>
                        Neon - solo.IO
                    </Typography>
                </Box>
            );
        }

        if (value === ThemeNames.Contrast) {
            return (
                <Box sx={valueStyles}>
                    <ContrastIcon fontSize='small' color='primary' />
                    <Typography variant='body4' sx={{ fontWeight: 'bold' }}>
                        Contrast - debug
                    </Typography>
                </Box>
            );
        }

        return (
            <Box sx={valueStyles}>
                <OfflineBoltIcon fontSize='small' color='primary' />
                <Typography variant='body4' sx={{ fontWeight: 'bold' }}>
                    DarkBlue - solo
                </Typography>
            </Box>
        );
    };

    const onChangeTheme = (e: SelectChangeEvent<ThemeNames>) => {
        onChange(e.target.value as ThemeNames);
    };

    return (
        <Select renderValue={renderValue} sx={themeSelectStyles} value={value} onChange={onChangeTheme}>
            <MenuItem value={ThemeNames.Blue}>{renderValue(ThemeNames.Blue)}</MenuItem>
            <MenuItem value={ThemeNames.Neon}>{renderValue(ThemeNames.Neon)}</MenuItem>
            <MenuItem value={ThemeNames.Contrast}>{renderValue(ThemeNames.Contrast)}</MenuItem>
        </Select>
    );
}
