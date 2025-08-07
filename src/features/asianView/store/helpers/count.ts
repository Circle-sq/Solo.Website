export const countCompetitionEvents = <T extends { events: unknown[] }>(groups: T[]) =>
    groups.reduce((count, group) => count + group.events.length, 0);

export const countEventsTotal = <T extends { live: { total: number }; upcoming: { total: number } }>(
    pages: T[] = [],
): { live: number; upcoming: number } =>
    pages.reduce(
        (total, page) => {
            return {
                live: total.live + page.live.total,
                upcoming: total.upcoming + page.upcoming.total,
            };
        },
        { live: 0, upcoming: 0 },
    );
