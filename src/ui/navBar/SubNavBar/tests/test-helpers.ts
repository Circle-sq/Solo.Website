export const mockUseAppStateContext = (context: { router: any }, eventsCounter?: any) => {
    return Object.assign(
        {},
        {
            router: {
                buildUrl: (route: string, params: Record<string, string>): string => {
                    if (route === 'country') {
                        return `/${route}/${params.sportId}${`/${params.countryId}/${params.competitionId}`}`;
                    }

                    return `/${route}/${params?.id ?? params?.sportId}${params.slug ? `/${params.slug}` : ''}`;
                },
                ...context.router,
            },
            reduxState: { normalizedCompetitionLocations: [] },
            eventsCounter: eventsCounter ? eventsCounter : null,
            language: { getTranslation: (_key: string, placeholder: string): string => placeholder },
        },
    );
};
