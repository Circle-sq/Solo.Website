import type { PropsWithChildren } from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import type { ReduxState } from 'src/appState/redux/types';

import { reduxStateMock } from './reduxStateMock';

const mockStore = configureMockStore([thunk]);

const MockReduxProvider = ({
    store = {},
    children,
}: PropsWithChildren<{ store?: ReduxState | Record<string, unknown> }>) => {
    const storeMock = mockStore({ ...reduxStateMock, ...store });

    return <Provider store={storeMock}>{children}</Provider>;
};

export default MockReduxProvider;
