import { useEffect } from 'react';

import { ThemeNames, useThemeSwitchContext, darkBlue, ioDarkBlue, grey, lightBlue, red } from '@sc-ui/system';

const clientId = 'vsUJMaEA42DHViP1o9HsAXHuY9Z7FAiG';

const widgetThemes = {
    [ThemeNames.Blue]: {
        primary: lightBlue[300],
        secondary: red[500],
        'background-dark': darkBlue[900],
        'background-lighter': darkBlue[500],
        'background-light': darkBlue[700],
        'background-content': darkBlue[800],
        'text-dark': '#a5a8c0',
        text: '#FFFFFF',
        red: red[600],
        blue: lightBlue[400],
        ct: '#5788A8',
        t: '#C19511',
        dire: '#E03030',
        radiant: '#82FF36',
    },
    [ThemeNames.Neon]: {
        primary: '#19B387',
        secondary: '#E03030',
        'background-dark': ioDarkBlue[900],
        'background-lighter': ioDarkBlue[400],
        'background-light': ioDarkBlue[600],
        'background-content': ioDarkBlue[800],
        'text-dark': '#99A5C2',
        text: grey[50],
        red: '#E03030',
        blue: '#1580B6',
        ct: '#5788A8',
        t: '#C19511',
        dire: '#E03030',
        radiant: '#6ecc33',
    },
    [ThemeNames.Contrast]: {
        primary: lightBlue[300],
        secondary: red[500],
        'background-dark': darkBlue[900],
        'background-lighter': darkBlue[500],
        'background-light': darkBlue[700],
        'background-content': darkBlue[800],
        'text-dark': '#a5a8c0',
        text: '#FFFFFF',
        red: red[600],
        blue: lightBlue[400],
        ct: '#5788A8',
        t: '#C19511',
        dire: '#E03030',
        radiant: '#82FF36',
    },
};

interface Props {
    matchId: string;
    language: string;
}

const ShadowWidget = ({ matchId, language }: Props) => {
    const { themeName } = useThemeSwitchContext();

    useEffect(() => {
        window.SDW.mount({
            clientId,
            theme: widgetThemes[themeName] as SDWThemeObject,
            baseUrl: 'https://widgets.shadow.gg',
            locale: language,
        });
        window.SDW.addWidget({
            containerId: 'shadow-container',
            settings: {
                groupCalendarByLive: false,
                showFixtureInfoForMaps: false,
                bayesTvEnabled: false,
                dynamicHeight: true,
                matchId,
                elements: ['RealtimeMap', 'MapName', 'TeamStats', 'RoundScore', 'Bans'],
            },
            type: 'match',
        });

        return () => {
            window.SDW.removeWidget('shadow-container');
            window.SDW.unmount();
        };
    }, [matchId, themeName]);

    return <div id='shadow-container' data-testid='shadowContainer'></div>;
};

export default ShadowWidget;
