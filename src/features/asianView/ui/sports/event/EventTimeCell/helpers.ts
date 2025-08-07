export const translateStatisticsMatchMode = (
    t: (key: string, defaultText: string) => string,
    matchMode: string | undefined,
): string | undefined => {
    if (matchMode === undefined) {
        return undefined;
    }

    return t(`events.row.match-mode.${matchMode}`, matchMode);
};
