import type { RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';

import { DevToolsProvider } from '@sc-devtools/DevTools';
import MockComponent from '@sc-tests/unit/mocks/MockComponent';
import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import type { Notification } from 'src/appState/redux/types';

import banners from './__tests__/__fixtures__/banners.json';
import BannerContainer from './BannersContainer';

vi.mock('src/ui/common/Carousel/SwiperCarousel', () => ({ default: MockComponent }));

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                language: { userLang: 'ko-KR', getTranslation: (_key: string, value: string) => value },
                apiWrapper: { getNotifications: () => [...banners] },
                router: {
                    redirect: vi.fn(),
                },
            };
        },
        default: vi.fn(),
    };
});

function renderWithDevTools(ui: ReactElement, debug_banners = false): RenderResult {
    return renderWithAppWrapper(<DevToolsProvider initState={{ debug_banners }}>{ui}</DevToolsProvider>);
}

describe('BannersContainer', () => {
    it('should render Banners by display order (asc)', async () => {
        const { findAllByRole } = renderWithDevTools(<BannerContainer />);

        const bannersLinks = await findAllByRole('link');

        bannersLinks.forEach((banner, index) => {
            expect(banner).toHaveTextContent(`Banner ${index + 1}`);
        });
    });
    it('should render banner by startDate (desc)', async () => {
        // set dateStart for mockup banners by ascending
        banners.forEach((banner, index) => {
            const newStartDate = new Date();
            newStartDate.setDate(newStartDate.getDate() - 5 + index);
            banner.dateStart = newStartDate.toISOString();
            banner.displayOrder = 0;
        });

        const { findAllByRole } = renderWithDevTools(<BannerContainer />);

        const bannersLinks = await findAllByRole('link');

        bannersLinks.forEach((banner, index) => {
            expect(banner).toHaveTextContent(`Banner ${index + 1}`);
        });
    });
    it('should render comtrade banners', async () => {
        window.$platformId = 'comtrade';
        // set clientLabel for banners
        (banners as Notification[]).forEach((banner) => {
            if (banner.clientLabel === null) {
                banner.clientLabel = '';
            }
        });

        const { findAllByRole } = renderWithDevTools(<BannerContainer />);
        const bannersLinks = await findAllByRole('link');

        expect(bannersLinks.length).toEqual(1);
        expect(bannersLinks[0]).toHaveTextContent('Comtrade Banner');
    });
});
