import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useContext,
    useMemo,
    useState,
} from 'react';

import { ThemeNames, getThemeOptions } from './theme-names';

interface ThemeSwitchContextType {
    themeName: ThemeNames;
    setThemeName: Dispatch<SetStateAction<ThemeNames>>;
}

// Context and hook for theme switching
const ThemeSwitchContext = createContext<ThemeSwitchContextType | undefined>(undefined);
const SITE_THEME_ENV = process.env.SITE_THEME as ThemeNames;

export const ThemeSwitchProvider = ({
    initThemeName = SITE_THEME_ENV || ThemeNames.Blue,
    children,
}: PropsWithChildren<{ initThemeName?: ThemeNames }>) => {
    const savedTheme = localStorage.getItem('theme') as ThemeNames | null;
    const [themeName, setThemeName] = useState<ThemeNames>((savedTheme as ThemeNames) || initThemeName);

    const handleThemeChange = (newTheme: SetStateAction<ThemeNames>) => {
        setThemeName(newTheme);
        localStorage.setItem('theme', typeof newTheme === 'function' ? newTheme(themeName) : newTheme);
    };

    if (typeof window !== 'undefined') {
        (window as { setThemeName?: (newTheme: SetStateAction<ThemeNames>) => void }).setThemeName = handleThemeChange;
    }

    const value = useMemo(() => ({ themeName, setThemeName }), [themeName]);

    const theme = useMemo(() => createTheme(getThemeOptions(themeName)), [themeName]);

    return (
        <ThemeSwitchContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeSwitchContext.Provider>
    );
};

export const useThemeSwitchContext = () => {
    const context = useContext(ThemeSwitchContext);

    if (!context) {
        throw new Error('useThemeSwitchContext must be used within a ThemeSwitchProvider');
    }

    return context;
};
