import { waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { ReactNode } from 'react';

import { renderWithTheme } from '@sc-tests/unit/mocks/renderMocks';
import { server } from '@sc-tests/unit/mocks/server.setup';

import CardContent from './CardContent';

const handlers = [
    http.get('/api/uniforms/football/player/home', () => {
        return HttpResponse.json([]);
    }),
    http.get('/api/uniforms/football/player/away', () => {
        return HttpResponse.json([]);
    }),
];

server.use(...handlers);

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => ({
            apiWrapper: {
                getUniformsList: vi.fn(),
            },
        }),
        default: vi.fn(),
    };
});

vi.mock('src/utils/Router/NewLink', () => ({
    default: ({ children }: { children: ReactNode }) => {
        return <a href='../../tests#'>{children}</a>;
    },
}));

describe('CardContent', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should display score if event === live && it supports score displaying', () => {
        const props = {
            scoreSupported: true,
            score: { home: 1, away: 1 },
            home: { url: '', name: 'team1' },
            away: { url: '', name: 'team2' },
            isLive: true,
            hasAmericanFormat: false,
        };
        const { getByTestId } = renderWithTheme(<CardContent {...props} />);
        const separator = getByTestId('separator');

        expect(separator).toHaveTextContent('1 : 1');
    });

    it('should not display score if event === live && it doesnt supports score displaying', () => {
        const props = {
            scoreSupported: false,
            score: { home: 1, away: 1 },
            home: { url: '', name: 'team1' },
            away: { url: '', name: 'team2' },
            isLive: true,
            hasAmericanFormat: false,
        };
        const { getByTestId } = renderWithTheme(<CardContent {...props} />);
        const separator = getByTestId('separator');

        expect(separator).toHaveTextContent('vs');
    });

    it('should display separator if event !== live', () => {
        const props = {
            scoreSupported: true,
            score: undefined,
            home: { url: '', name: 'team1' },
            away: { url: '', name: 'team2' },
            isLive: false,
            hasAmericanFormat: false,
        };
        const { getByTestId } = renderWithTheme(<CardContent {...props} />);
        const separator = getByTestId('separator');

        expect(separator).toHaveTextContent('vs');
    });

    it('should display american format separator if event !== live', () => {
        const props = {
            scoreSupported: false,
            score: undefined,
            home: { url: '', name: 'team1' },
            away: { url: '', name: 'team2' },
            isLive: false,
            hasAmericanFormat: true,
        };
        const { getByTestId } = renderWithTheme(<CardContent {...props} />);
        const separator = getByTestId('separator');

        expect(separator).toHaveTextContent('@');
    });

    it('should display uniform if both participants have it', async () => {
        server.use(
            http.get('/api/uniforms/football/player/home', async () => {
                return HttpResponse.json([{ playerId: 1, image: { url: '/football/player/1/home' } }]);
            }),
            http.get('/api/uniforms/football/player/away', async () => {
                return HttpResponse.json([{ playerId: 2, image: { url: '/football/player/2/away' } }]);
            }),
        );

        const props = {
            scoreSupported: false,
            score: { home: 1, away: 1 },
            home: { url: '/football/player/1/home', name: 'team1' },
            away: { url: '/football/player/2/away', name: 'team2' },
            isLive: true,
            hasAmericanFormat: false,
        };
        const { queryAllByRole } = renderWithTheme(<CardContent {...props} />);

        await waitFor(() => {
            const imgs = queryAllByRole('img');
            expect(imgs.length).toBe(2);
        });
    });

    it('should hide uniform if one of the participants does not have one', () => {
        const props = {
            scoreSupported: false,
            score: { home: 1, away: 1 },
            home: { url: '/football/player/1/home', name: 'team1' },
            away: { url: '/football/player/2/home', name: 'team2' },
            isLive: true,
            hasAmericanFormat: false,
        };
        const { queryAllByRole } = renderWithTheme(<CardContent {...props} />);

        const imgs = queryAllByRole('img');
        expect(imgs.length).toBe(0);
    });
});
