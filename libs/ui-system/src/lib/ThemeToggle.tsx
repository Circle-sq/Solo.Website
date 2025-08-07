import Contrast from '@mui/icons-material/Contrast';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PaletteIcon from '@mui/icons-material/Palette';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

import { ThemeNames } from './theme-names';
import { useThemeSwitchContext } from './ThemeProvider';

const themes = [ThemeNames.Blue, ThemeNames.Neon, ThemeNames.Contrast];

const icons = {
    [ThemeNames.Blue]: <PaletteIcon fontSize='medium' color='primary' />,
    [ThemeNames.Neon]: <OfflineBoltIcon fontSize='medium' color='primary' />,
    [ThemeNames.Contrast]: <Contrast fontSize='medium' color='primary' />,
};
const titles = {
    [ThemeNames.Blue]: 'Switch to neon theme',
    [ThemeNames.Neon]: 'Switch to contrast theme',
    [ThemeNames.Contrast]: 'Switch to blue theme',
};

export function ThemeToggle() {
    const { themeName, setThemeName } = useThemeSwitchContext();
    const [index, setIndex] = useState(0);

    const switchTheme = () => {
        const nextIndex = (index + 1) % themes.length;
        setIndex(nextIndex);
        setThemeName(themes[nextIndex]);
    };

    return (
        <Tooltip title={titles[themeName]}>
            <IconButton
                onClick={switchTheme}
                sx={{
                    position: 'fixed',
                    top: 16,
                    left: '50%',
                    zIndex: 1000,
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.action.hover,
                    },
                }}
            >
                {icons[themeName]} <Typography color='white'>{themeName}</Typography>
            </IconButton>
        </Tooltip>
    );
}
