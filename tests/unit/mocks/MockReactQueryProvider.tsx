import * as ReactQuery from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

const queryClient = new ReactQuery.QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const MockReactQueryProvider = ({ children }: PropsWithChildren) => {
    return <ReactQuery.QueryClientProvider client={queryClient}>{children}</ReactQuery.QueryClientProvider>;
};

export default MockReactQueryProvider;
