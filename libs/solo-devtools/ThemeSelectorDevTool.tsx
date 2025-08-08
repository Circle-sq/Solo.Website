import { type ChangeEvent, useEffect, useRef } from 'react';

import { ThemeNames, useThemeSwitchContext } from '@solo-ui/system';

import buildStorageService, { type ValueStorage } from 'src/utils/StorageService';

import { S_DevToolItem } from './styled';

export function ThemeSelectorDevTool() {
    const { themeName, setThemeName } = useThemeSwitchContext();
    const storage = useRef<ValueStorage<ThemeNames> | null>(null);

    useEffect(() => {
        storage.current = buildStorageService<ThemeNames>('devtools.theme_select');
    }, []);

    const onChangeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
        setThemeName(e.target.value as ThemeNames);
        storage.current?.setItem(e.target.value as ThemeNames);
    };

    return (
        <S_DevToolItem>
            <label>
                <span>theme select: </span>
                <select value={themeName} onChange={onChangeTheme}>
                    <option value={ThemeNames.Blue}>DarkBlue - beteast</option>
                    <option value={ThemeNames.Neon}>Neon - beteast.io</option>
                    <option value={ThemeNames.Contrast}>Contrast - debug</option>
                </select>
            </label>
        </S_DevToolItem>
    );
}
