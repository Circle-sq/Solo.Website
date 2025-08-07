import { render, waitFor } from '@testing-library/react';

import { ThemeSwitchProvider, ThemeNames } from '@sc-ui/system';

import ShadowWidget from './ShadowWidget';

window.SDW = {
    mount: vi.fn(),
    unmount: vi.fn(),
    updateWidget: vi.fn(),
    addWidget: vi.fn(),
    removeWidget: vi.fn(),
    initStyles: vi.fn(),
};

const clientId = 'vsUJMaEA42DHViP1o9HsAXHuY9Z7FAiG';

const props = {
    matchId: '1',
    language: 'en',
};

describe('ShadowWidget', () => {
    it('should render ShadowWidget', async () => {
        const { getByTestId } = render(
            <ThemeSwitchProvider initThemeName={ThemeNames.Blue}>
                <ShadowWidget {...props} />
            </ThemeSwitchProvider>,
        );

        await waitFor(() => {
            expect(getByTestId('shadowContainer')).toBeInTheDocument();

            expect(window.SDW.mount).toHaveBeenCalledWith({
                clientId: clientId,
                theme: {
                    primary: '#008ae6',
                    secondary: '#d34f44',
                    'background-dark': '#090c1b',
                    'background-lighter': '#444756',
                    'background-light': '#282a38',
                    'background-content': '#1c1e2c',
                    'text-dark': '#a5a8c0',
                    text: '#FFFFFF',
                    red: '#ff4333',
                    blue: '#0d7ab1',
                    ct: '#5788A8',
                    t: '#C19511',
                    dire: '#E03030',
                    radiant: '#82FF36',
                },
                baseUrl: 'https://widgets.shadow.gg',
                locale: props.language,
            });

            expect(window.SDW.addWidget).toHaveBeenCalledWith({
                containerId: 'shadow-container',
                settings: {
                    groupCalendarByLive: false,
                    showFixtureInfoForMaps: false,
                    bayesTvEnabled: false,
                    dynamicHeight: true,
                    matchId: props.matchId,
                    elements: ['RealtimeMap', 'MapName', 'TeamStats', 'RoundScore', 'Bans'],
                },
                type: 'match',
            });
        });
    });

    it('should render ShadowWidget for neon theme', async () => {
        const { getByTestId } = render(
            <ThemeSwitchProvider initThemeName={ThemeNames.Neon}>
                <ShadowWidget {...props} />
            </ThemeSwitchProvider>,
        );

        await waitFor(() => {
            expect(getByTestId('shadowContainer')).toBeInTheDocument();

            expect(window.SDW.mount).toHaveBeenCalledWith({
                clientId: clientId,
                theme: {
                    primary: '#19B387',
                    secondary: '#E03030',
                    'background-dark': '#081037',
                    'background-lighter': '#3a3f5f',
                    'background-light': '#242a4d',
                    'background-content': '#181f44',
                    'text-dark': '#99A5C2',
                    text: '#d6d6d6',
                    red: '#E03030',
                    blue: '#1580B6',
                    ct: '#5788A8',
                    t: '#C19511',
                    dire: '#E03030',
                    radiant: '#6ecc33',
                },
                baseUrl: 'https://widgets.shadow.gg',
                locale: props.language,
            });

            expect(window.SDW.addWidget).toHaveBeenCalledWith({
                containerId: 'shadow-container',
                settings: {
                    groupCalendarByLive: false,
                    showFixtureInfoForMaps: false,
                    bayesTvEnabled: false,
                    dynamicHeight: true,
                    matchId: props.matchId,
                    elements: ['RealtimeMap', 'MapName', 'TeamStats', 'RoundScore', 'Bans'],
                },
                type: 'match',
            });
        });
    });
});
