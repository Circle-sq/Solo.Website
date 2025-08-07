import type { AppState } from 'src/appState/AppState';
import type { RecursivePartial } from 'src/common/types/main';

export const mockUseAppStateContext = (context: RecursivePartial<AppState>) => {
    return Object.assign(
        {},
        {
            ...context,
            language: {
                userLang: 'en-US',
                getTranslation: (_key: string, defaultText: string): string => defaultText,
                getLanguages: () => [
                    {
                        id: 'en-US',
                        description: 'English (United States)',
                    },
                    {
                        id: 'ja-JP',
                        description: 'Japanese (Japan)',
                    },
                    {
                        id: 'ko-KR',
                        description: 'Korean (Republic of Korea)',
                    },
                ],
                ...context.language,
            },
            models: { ...context.models },
            reduxState: {
                getSportName: (name: string): string => name,
                ...context.reduxState,
            },
            router: {
                redirect: vi.fn(),
                route: { params: {} },
                buildUrl: (route: string, params: Record<string, string>): string =>
                    `/${route}/${params?.id}${params?.slug ? `/${params?.slug}` : ''}`,
                ...context.router,
            },
            sportsList: {
                sports: [],
                ...context.sportsList,
            },
        },
    );
};
