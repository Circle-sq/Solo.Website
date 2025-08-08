import { unleashClient, unleashClientAtom } from '@solo-feature-flags';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FlagProvider } from '@unleash/proxy-client-react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';
import { queryClientAtom } from 'jotai-tanstack-query';
import type { PropsWithChildren } from 'react';

import { queryClient } from '@solo-utils/tanstack';

import { store } from './store';

const HydrateAtoms = ({ children }: PropsWithChildren) => {
    useHydrateAtoms([
        [unleashClientAtom, unleashClient],
        [queryClientAtom, queryClient],
    ]);

    return children;
};

export const StoreProvider = ({ children }: PropsWithChildren) => {
    return (
        <FlagProvider unleashClient={unleashClient} startClient={false}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <HydrateAtoms>{children}</HydrateAtoms>

                    <DevTools store={store} position='bottom-left' />
                    <ReactQueryDevtools />
                </Provider>
            </QueryClientProvider>
        </FlagProvider>
    );
};
