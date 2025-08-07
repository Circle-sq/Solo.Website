import type { RefObject } from 'react';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import type { MarketTemplateType } from 'src/utils/types';
import type { TEMPLATE_TAB_GROUPING_TYPES } from 'src/ui/events/utils/commonTemplateLogic';

export interface SimpleDisplayTemplateProps {
    markets: MarketModel[];
    eventId: number | null;
    groupName?: string;
    type?: string;
}

export interface S_SimpleDisplayTemplateProps {
    displayTemplate: MarketTemplateType;
    selectionLength: number;
}

export interface S_SelectionProps {
    displayTemplate: MarketTemplateType;
}

export interface ShouldShowMoreBtnProps {
    numberOfSelections: number;
    displayTemplate: MarketTemplateType;
    displayedRowsLimit: number;
    threeLineAlways?: boolean;
}

export type SelectionsRefsType = Record<string, RefObject<HTMLDivElement>>[];

export interface GroupTabsParams {
    markets: MarketModel[];
    tabGroupingLogicType: TEMPLATE_TAB_GROUPING_TYPES;
}

export type MarketTemplateTabs = Record<string, MarketModel[]>;
