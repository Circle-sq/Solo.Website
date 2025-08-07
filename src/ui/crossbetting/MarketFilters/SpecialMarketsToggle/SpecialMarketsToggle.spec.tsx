import { type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

import { appStateContextMock } from '@sc-tests/unit/mocks/contexts/appStateContextMock';
import { eventsSortContextMock } from '@sc-tests/unit/mocks/contexts/eventsSortContextMock';
import { buildSubUnsubWrapper, renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import SpecialsMarketToggle from './SpecialMarketsToggle';

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useEventsSort: () => eventsSortContextMock,
        useAppStateContext: () => ({
            ...appStateContextMock,
            router: {
                ...appStateContextMock.router,
                route: {
                    name: 'crossbetting',
                    params: { sport: 'football' },
                },
                url: '/crossbetting?sport=football&day=1&countryId=ENG',
            },
        }),
        default: vi.fn(),
    };
});

const renderComponentWToggle = (observer?: ReactElement): RenderResult => {
    return renderWithAppWrapper(
        <RecoilRoot>
            {observer}
            <SpecialsMarketToggle />
        </RecoilRoot>,
        {},
        { wrapper: buildSubUnsubWrapper() },
    );
};

describe('specials toggle', () => {
    it('should display Specials toggle for Football', async () => {
        const { findByTestId } = renderComponentWToggle();
        const toggle = await findByTestId('specialsToggle');

        expect(toggle).toBeInTheDocument();

        const toggleInput = toggle.querySelector('input') as HTMLInputElement;
        expect(toggleInput).toBeChecked();
    });
});
