import type { LinesRange } from '@solo-asianView/types';

import { IconCategory, SelectionIdentifier } from 'src/common/enums';

import { Lines } from './enums';

export const LOAD_MORE_THRESHOLD = 0.8;

export const sidebarScrollbar = {
    verticalBarPosition: { right: '-12px' },
};

export const sportListScrollbar = {
    horizontalBarPosition: { bottom: '0', visibility: 'visible!important', display: 'block!important' },
    verticalBarPosition: { right: '3px' },
    viewPortStyles: { marginRight: '0' },
};

export const asianViewThreeWayWinnerSelectionOrder = [
    SelectionIdentifier.Home,
    SelectionIdentifier.Away,
    SelectionIdentifier.Draw,
];

export const iconCategories = [IconCategory.Competitions, IconCategory.CompetitionLocations, IconCategory.Sports];

const OFFSET_ONE = 1;
const OFFSET_TWO = 2;

export const linesRange: LinesRange = {
    [Lines.One]: {
        top: [],
        bottom: [],
    },
    [Lines.Three]: {
        top: [OFFSET_ONE],
        bottom: [OFFSET_ONE],
    },
    [Lines.Five]: {
        top: [OFFSET_TWO, OFFSET_ONE],
        bottom: [OFFSET_ONE, OFFSET_TWO],
    },
};
