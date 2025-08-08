import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import includes from 'lodash/includes';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';

import { server } from '@solo-tests/unit/mocks/server.setup';

import { mockUseAppStateContext } from 'src/ui/common/SubNavigation/tests/test-helper';

import { liveHighlightCompetitionsResponse, highlightCompetitionsResponse } from './test/mocks';
import useHighlightCompetitions from './useHighlightCompetitions';

const postMock = vi.fn();

const sportSelectedAppState = mockUseAppStateContext({});

vi.mock('src/appState/AppState', () => {
    return { __esModule: true, useAppStateContext: () => sportSelectedAppState, default: vi.fn() };
});

const handlers = [
    http.post(
        '/api/competitions/search/event',
        postMock.mockImplementation(async ({ params }) => {
            const isLiveHighlightsQuery = includes(
                JSON.stringify(params),
                '"timeSettings.started":{"type":"match","value":"true"}',
            );
            const response = isLiveHighlightsQuery ? liveHighlightCompetitionsResponse : highlightCompetitionsResponse;

            return HttpResponse.json(response);
        }),
    ),
];

server.use(...handlers);

const queryClient = new QueryClient();
const wrapper = ({ children }: PropsWithChildren) => (
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RecoilRoot>
);

describe('useHighlightCompetitions', () => {
    it(
        'should transform the BE response into a flat object instead of having nested objects for each property,' +
            ' sorted by display order DESC, then by count. Keep only top 10. Add live prop if they are found in the live highlights response',
        async () => {
            renderHook(() => useHighlightCompetitions(), {
                wrapper,
            });

            await waitFor(() => {
                expect(postMock).toHaveBeenCalledTimes(2);
            });
        },
    );
});
