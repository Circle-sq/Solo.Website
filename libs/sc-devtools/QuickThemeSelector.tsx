import isNil from 'lodash/isNil';
import { useEffect, useRef } from 'react';

import { type ThemeNames, ThemeSelect, useThemeSwitchContext } from '@sc-ui/system';

import isLocal from 'src/utils/isLocal';
import buildStorageService, { type ValueStorage } from 'src/utils/StorageService';

export function QuickThemeSelector() {
    const { themeName, setThemeName } = useThemeSwitchContext();
    const storage = useRef<ValueStorage<ThemeNames> | null>(null);

    useEffect(() => {
        storage.current = buildStorageService<ThemeNames>('devtools.theme_select');
    }, []);

    useEffect(() => {
        const storedTheme = storage.current?.getItem();

        if (isNil(storedTheme) || !isLocal()) {
            return;
        }

        setThemeName(storedTheme);
    }, [setThemeName]);

    const persistThemeName = (theme: ThemeNames) => {
        setThemeName(theme);
        storage.current?.setItem(theme);
    };

    return <ThemeSelect value={themeName} onChange={persistThemeName} />;
}
