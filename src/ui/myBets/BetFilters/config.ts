import { TabStatus } from 'src/ui/myBets/store/types';

export const betStatusFilters = {
    [TabStatus.All]: {
        langKey: 'mybets.filter.button.label.all',
        defaultText: 'All',
        testId: 'filterItem-all',
    },
    [TabStatus.Settled]: {
        langKey: 'mybets.filter.button.label.won',
        defaultText: 'Won',
        testId: 'filterItem-won',
    },
    [TabStatus.Lost]: {
        langKey: 'mybets.filter.button.label.lost',
        defaultText: 'Lost',
        testId: 'filterItem-lost',
    },
    [TabStatus.Cancelled]: {
        langKey: 'mybets.filter.button.label.cannceled',
        defaultText: 'Cancelled',
        testId: 'filterItem-cancelled',
    },
};
