import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import sortBy from 'lodash/sortBy';
import { useMemo } from 'react';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';
import type { GroupTabsParams, MarketTemplateTabs, ShouldShowMoreBtnProps } from 'src/ui/events/DisplayTemplates/types';
import { DEFAULT_TAB_NAME } from 'src/ui/events/EventMarkets/types';
import { MARKET_TEMPLATE, MARKET_TEMPLATES_SETTINGS, MARKETS_DISPLAY_ORDER, NUMBERS } from 'src/utils/constants';
import { SortCriteriaType, sortSelectionsByCriteria } from 'src/utils/sortNew';
import type { MarketTemplateType } from 'src/utils/types';

const { columns } = MARKET_TEMPLATES_SETTINGS;

export enum TEMPLATE_TAB_GROUPING_TYPES {
    period,
    goalscorer,
}

export function shouldShowMoreBtn({
    numberOfSelections,
    displayTemplate = MARKET_TEMPLATE.default,
    displayedRowsLimit,
    threeLineAlways = false,
}: ShouldShowMoreBtnProps): boolean {
    switch (true) {
        case threeLineAlways:
            return numberOfSelections > MARKET_TEMPLATES_SETTINGS.rowsDisplayed.three;

        case columns.two.includes(displayTemplate):
            return Math.ceil(numberOfSelections / MARKET_TEMPLATES_SETTINGS.rowsDisplayed.two) > displayedRowsLimit;

        case columns.three.includes(displayTemplate):
            return Math.ceil(numberOfSelections / MARKET_TEMPLATES_SETTINGS.rowsDisplayed.three) > displayedRowsLimit;

        default:
            return numberOfSelections > displayedRowsLimit;
    }
}

export function getSortedLineSelections(groupedSelections: SelectionModel[][], isExpanded: boolean): SelectionModel[] {
    const sortedGroupedSelection = sortBy(groupedSelections, ([selection]) => Number(selection.line));

    if (groupedSelections.length > NUMBERS.three && !isExpanded) {
        const [bestLineGroup] = getBestLineGroup(groupedSelections);
        const [bestLineItem] = bestLineGroup;
        const previousMarket = [...sortedGroupedSelection]
            .reverse()
            .find(([selection]) => Number(selection.line) < Number(bestLineItem.line));
        const nextMarket = sortedGroupedSelection.find(
            ([selection]) => Number(selection.line) > Number(bestLineItem.line),
        );

        if (previousMarket !== undefined && nextMarket !== undefined) {
            return [previousMarket, bestLineGroup, nextMarket].flat();
        } else {
            return sortedGroupedSelection.filter((_element, index) => index <= NUMBERS.three).flat();
        }
    } else {
        return sortedGroupedSelection.flat();
    }
}

export function getBestLineGroup(groupedSelection: SelectionModel[][]): SelectionModel[][] {
    return sortBy(groupedSelection, ([firstSelection, secondSelection]: SelectionModel[]) => {
        if (
            firstSelection !== undefined &&
            secondSelection !== undefined &&
            firstSelection.price &&
            secondSelection.price
        ) {
            if (firstSelection.price.d < secondSelection.price.d) {
                return secondSelection.price.d - firstSelection.price.d;
            }

            return firstSelection.price.d - secondSelection.price.d;
        }
    });
}

export function getNumberOfSelectionsForView(
    displayTemplate: MarketTemplateType = MARKET_TEMPLATE.default,
    displayedRowsLimit: number,
    threeLineAlways = false,
): number {
    switch (true) {
        case threeLineAlways:
            return MARKET_TEMPLATES_SETTINGS.rowsDisplayed.three;

        case columns.two.includes(displayTemplate):
            return displayedRowsLimit * MARKET_TEMPLATES_SETTINGS.rowsDisplayed.two;

        case columns.three.includes(displayTemplate):
            return displayedRowsLimit * MARKET_TEMPLATES_SETTINGS.rowsDisplayed.three;

        default:
            return displayedRowsLimit;
    }
}

export const groupTabs = ({ markets, tabGroupingLogicType }: GroupTabsParams): MarketTemplateTabs => {
    const defaultTabs: MarketTemplateTabs = { [DEFAULT_TAB_NAME]: markets };

    // If this template uses period Tab grouping, we put different periods in different groups
    switch (tabGroupingLogicType) {
        case TEMPLATE_TAB_GROUPING_TYPES.period: {
            const marketsWithPeriod = markets.filter((market) => market.template.period);

            if (marketsWithPeriod.length > 0) {
                return groupBy(markets, (market) => market.template.period);
            }

            return defaultTabs;
        }

        case TEMPLATE_TAB_GROUPING_TYPES.goalscorer: {
            const tabs: MarketTemplateTabs = {};

            for (const market of markets) {
                // Assumption is that if first selection identifier is of this type, all market selections are
                // Checked on a big data chunk and rule checked out

                if (['SF', 'SL', 'SA'].includes(`${market.selections[0].identifier}`)) {
                    tabs.singleGoal = tabs.singleGoal ?? [];
                    tabs.singleGoal.push(market);
                } else if (['S2M', 'S3M'].includes(`${market.selections[0].identifier}`)) {
                    tabs.multipleGoals = tabs.multipleGoals ?? [];
                    tabs.multipleGoals.push(market);
                } else {
                    tabs.goalscorer = tabs.goalscorer ?? [];
                    tabs.goalscorer.push(market);
                }
            }

            return tabs;
        }

        default:
            return defaultTabs;
    }
};

export function useSortedSelections(markets: MarketModel[], marketTemplate: string): SelectionModel[] {
    return useMemo(() => {
        const insideSortedSelections = {} as Record<string, SelectionModel[]>;

        // Sort inside markets
        markets?.forEach((currMarket: MarketModel) => {
            const { displayOrderTag } = currMarket;
            const visibleSelections = currMarket.selections;
            let finalDisplayOrder = SortCriteriaType.CREATION;

            if (isString(displayOrderTag) && displayOrderTag !== MARKETS_DISPLAY_ORDER.displayOrderDefault) {
                finalDisplayOrder = displayOrderTag as SortCriteriaType;
            }
            insideSortedSelections[currMarket.id] = sortSelectionsByCriteria(visibleSelections, finalDisplayOrder);
        });

        // Sort between markets -- not sure if first one has any effect. Has to be thoroughly checked at later points, this used to be legacy code
        // but they were chained in this way. For cleanup needs deeper checks

        let finalSortedSelections = ([] as SelectionModel[]).concat(...Object.values(insideSortedSelections));

        finalSortedSelections = sortBy(finalSortedSelections, (selection: SelectionModel) => selection.displayOrder);
        finalSortedSelections = sortBy(finalSortedSelections, (selection) => -get(selection, 'marketDisplayOrder', 0));

        if (marketTemplate === MARKET_TEMPLATE.spread) {
            return finalSortedSelections;
        } else {
            return sortBy(finalSortedSelections, (selection) => !selection.active);
        }
    }, [markets]);
}

export function isCurrentTabExpanded(isExpandedState: Record<string, boolean>, currentTabKey: string) {
    return isExpandedState[currentTabKey] !== undefined ? isExpandedState[currentTabKey] : false;
}

export function calculateCurrentExpandedStateForCurrentTab(
    isExpandedState: Record<string, boolean>,
    currentTabKey: string,
) {
    return isExpandedState[currentTabKey] !== undefined ? !isExpandedState[currentTabKey] : true;
}

export const getDisplayOrderCriteria = (
    criteria: SortCriteriaType | undefined | (typeof MARKETS_DISPLAY_ORDER)[keyof typeof MARKETS_DISPLAY_ORDER],
    isOutright = false,
): SortCriteriaType => {
    if (!isEmpty(criteria) && criteria !== MARKETS_DISPLAY_ORDER.displayOrderDefault) {
        return criteria as SortCriteriaType;
    }

    if (isOutright) {
        return SortCriteriaType.PRICE;
    }

    return SortCriteriaType.CREATION;
};
