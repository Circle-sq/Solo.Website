export const eventsSortContextMock = {
    onSortChange: vi.fn(),
    options: [
        {
            id: 'sortbycompetitions',
            label: 'League',
        },
        {
            id: 'sortbytime',
            label: 'Time',
        },
    ],
    sortValue: 'sortbytime',
    sortReqParams: [
        'timeSettings.startTime',
        '-sport.displayOrder',
        '-competition.globalDisplayOrder',
        'competition.name',
        'name',
    ],
};
