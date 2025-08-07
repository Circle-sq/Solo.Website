import { fireEvent } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';
import { server } from '@sc-tests/unit/mocks/server.setup';

import { ApiWrapper } from 'src/appState/ApiWrapper';

import notifications from './__tests__/__fixtures__/notifications.json';
import Notifications from './Notifications';

localStorage.setItem('funMode', 'true');

vi.mock('src/appState/AppState', async function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                apiWrapper: new ApiWrapper(),
                router: { redirect: vi.fn() },
                language: { userLang: 'en' },
            };
        },
        default: vi.fn(),
    };
});

const handlers = [
    http.post('/api/content/notifications/search', async () => {
        return HttpResponse.json(notifications);
    }),
];

server.use(...handlers);

describe('Notifications', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should display notifications when they are open', async () => {
        const { findByAltText } = renderWithAppWrapper(<Notifications />);

        const notificationImage = await findByAltText('Alt Text');
        expect(notificationImage).toBeInTheDocument();
    });

    it('should trigger event handler on notification click', async () => {
        const { findByTestId } = renderWithAppWrapper(<Notifications />);
        const notificationAnchor = await findByTestId(`notification-anchor-1`);
        const mockClickHandler = vi.fn();
        notificationAnchor.addEventListener('click', mockClickHandler);

        fireEvent.click(notificationAnchor);

        expect(mockClickHandler).toHaveBeenCalled();
    });
    it('should display comtrade notifications', async () => {
        window.$platformId = 'comtrade';
        notifications[0].clientLabel = 'xyz';

        const { findByTestId, queryByTestId } = renderWithAppWrapper(<Notifications />);

        const comtradeNotification = await findByTestId(`notification-anchor-2`);
        expect(comtradeNotification).toBeInTheDocument();

        const xyzNotification = queryByTestId('notification-anchor-1');
        expect(xyzNotification).not.toBeInTheDocument();
    });
});
