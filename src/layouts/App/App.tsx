import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import { SyncReduxToRecoil } from 'redux-to-recoil';

import { SubscriptionsStorageProvider } from '@sc-data/subscriptions-storage';
import { DevToolsProvider } from '@sc-devtools/DevTools';
import { QuickThemeSelector } from '@sc-devtools/QuickThemeSelector';
import { WebsocketSubscriptionsInspector } from '@sc-devtools/WebsocketSubscriptionsInspector';
import { ThemeSwitchProvider } from '@sc-ui/system';
import { StoreProvider } from '@sc-utils/jotai';

import { Provider as AppStateProvider } from 'src/appState/AppState';
import AppContent from 'src/layouts/AppContent/AppContent';
import DebugPanel from 'src/ui/common/DebugPanel/DebugPanel';

import { isProduction, isStandalone } from '../../infra.client';
import isLocal from '../../utils/isLocal';

import WebsocketLayer from './WebsocketLayer';

const App = () => {
    const isEnabledThemeSelect = isLocal() && !isProduction() && !isStandalone();

    return (
        <StoreProvider>
            <RecoilRoot>
                <RecoilNexus />
                <AppStateProvider value={window.$appState}>
                    <ThemeSwitchProvider initThemeName={window.$theme as ThemeNames | undefined}>
                        {/*     ***   T E M P O R A R Y  ***    */}
                        {isEnabledThemeSelect && <QuickThemeSelector />}
                        <DevToolsProvider>
                            <Provider store={window.$app.store}>
                                <SyncReduxToRecoil writeEnabled={false} />

                                <SubscriptionsStorageProvider>
                                    <WebsocketLayer>
                                        <AppContent />
                                        <WebsocketSubscriptionsInspector />
                                    </WebsocketLayer>
                                </SubscriptionsStorageProvider>
                            </Provider>
                            <DebugPanel />
                        </DevToolsProvider>
                    </ThemeSwitchProvider>
                </AppStateProvider>
            </RecoilRoot>
        </StoreProvider>
    );
};

export default App;
