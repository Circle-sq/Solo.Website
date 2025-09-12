import type { PropsWithChildren } from 'react';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { ApiWrapper } from 'src/appState/ApiWrapper';
import { LanguagesState } from 'src/appState/LanguagesState';
import TranslationsStore from 'src/appState/TranslationsStore';
import { RouteName } from 'src/common/enums';

import SubHeader from './SubHeader';

vi.mock('src/utils/Router/NewLink', () => ({
    default: (props: PropsWithChildren<{ className: string }>) => {
        return <div className={props.className}>{props.children}</div>;
    },
}));

const translationsStore = new TranslationsStore(LanguagesState.createForContext());

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                apiWrapper: new ApiWrapper(),
                router: { route: { name: RouteName.Homepage, id: RouteName.Betting } },
                language: {
                    getTranslation: vi.fn().mockImplementation((_label, defaultText) => {
                        return defaultText;
                    }),
                },
                translationsStore: translationsStore,
            };
        },
        default: vi.fn(),
    };
});

describe('SubHeader', () => {
    it('should render 2 tabs ("Sports", "Live Sports")', () => {
        const { container } = renderWithAppWrapper(<SubHeader />);

        expect(container.textContent).toBe('SportsLive Sports');
    });
});
