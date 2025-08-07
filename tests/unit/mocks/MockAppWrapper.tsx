import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import type { MutableSnapshot } from 'recoil';
import { RecoilRoot } from 'recoil';
import { SyncReduxToRecoil } from 'redux-to-recoil';

import { ThemeSwitchProvider } from '@sc-ui/system';

import type { ReduxState } from 'src/appState/redux/types';

import MockReactQueryProvider from './MockReactQueryProvider';
import MockReduxProvider from './redux/MockReduxProvider';

interface Props {
    store?: ReduxState | Record<string, unknown>;
    recoilState?: (mutableSnapshot: MutableSnapshot) => void;
}

const MockAppWrapper = ({ store, recoilState, children }: PropsWithChildren<Props>) => {
    return (
        <RecoilRoot initializeState={recoilState}>
            <MockReactQueryProvider>
                <BrowserRouter>
                    <MockReduxProvider store={store}>
                        <SyncReduxToRecoil writeEnabled={false} />
                        <ThemeSwitchProvider>{children}</ThemeSwitchProvider>
                    </MockReduxProvider>
                </BrowserRouter>
            </MockReactQueryProvider>
        </RecoilRoot>
    );
};

export default MockAppWrapper;
