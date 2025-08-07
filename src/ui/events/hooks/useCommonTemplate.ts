import { useWindowWidth } from '@sc-hooks';
import filter from 'lodash/filter';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import has from 'lodash/has';
import isUndefined from 'lodash/isUndefined';
import { type MouseEvent, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';
import { isTotalLikeGroup } from 'src/ui/events/DisplayTemplates/OverUnderDisplayTemplate/isGroupTotalLike';
import { marketDescriptionsAtom, marketDescriptionsGroupsAtom } from 'src/ui/events/store/atoms';
import {
    calculateCurrentExpandedStateForCurrentTab,
    isCurrentTabExpanded,
    TEMPLATE_TAB_GROUPING_TYPES,
    useSortedSelections,
} from 'src/ui/events/utils/commonTemplateLogic';
import { COMPETITIONS_TABS, MARKET_TEMPLATE, MARKET_TEMPLATES_SETTINGS } from 'src/utils/constants';
import type { MarketTemplateType } from 'src/utils/types';

import useGroupTabs from './useGroupTabs';

interface CommonTemplateProps {
    groupName?: string;
    markets: Array<MarketModel>;
    marketTemplate: string;
    tabGroupingLogicType?: TEMPLATE_TAB_GROUPING_TYPES;
    type?: string;
}

export const useCommonTemplate = ({
    groupName,
    marketTemplate,
    markets,
    tabGroupingLogicType = TEMPLATE_TAB_GROUPING_TYPES.period,
    type,
}: CommonTemplateProps) => {
    const [isExpandedState, setIsExpanded] = useState<Record<string, boolean>>({});

    const { isMobile } = useWindowWidth();

    const marketTemplateDescriptions = useRecoilValue(marketDescriptionsAtom);
    const [marketDescriptionGroups, setMarketDescriptionGroups] = useRecoilState(marketDescriptionsGroupsAtom);

    const isOutright = type === COMPETITIONS_TABS.outright;
    const validMarkets = useMemo(() => {
        if (marketTemplate === MARKET_TEMPLATE.gamelines) {
            return filter(markets, 'visible');
        }

        return filter(markets, { visible: true, active: true });
    }, [marketTemplate, markets]);

    const { tabs, areTabsChanged, defaultSelectedTab } = useGroupTabs({ markets: validMarkets, tabGroupingLogicType });

    const [selectedTab, setSelectedTab] = useState(defaultSelectedTab);

    const changeTab = (tabName: string) => {
        setSelectedTab(tabName);
    };

    useEffect(() => {
        if (areTabsChanged) {
            changeTab(defaultSelectedTab);
        }
    }, [areTabsChanged]);

    const selectedTabKey = selectedTab !== undefined && has(tabs, selectedTab) ? selectedTab : defaultSelectedTab;

    const visibleMarkets = useMemo(() => tabs[selectedTabKey], [markets, selectedTabKey, tabs]);
    const selectionsViewModel = useSortedSelections(visibleMarkets, marketTemplate);

    const displayedRowsLimit = isOutright
        ? MARKET_TEMPLATES_SETTINGS.rowsDisplayLimit.outright
        : MARKET_TEMPLATES_SETTINGS.rowsDisplayLimit.default;

    const currentTabKey = `${groupName}-${selectedTabKey}`;

    const toggleExpand = (e: MouseEvent): void => {
        e.preventDefault();
        setIsExpanded((expandedState) => {
            return {
                ...expandedState,
                [currentTabKey]: calculateCurrentExpandedStateForCurrentTab(expandedState, currentTabKey),
            };
        });
    };

    const isExpanded = isCurrentTabExpanded(isExpandedState, currentTabKey);

    const getDisplayTemplate = (selections: SelectionModel[], isOutright: boolean): MarketTemplateType => {
        if (marketTemplate === MARKET_TEMPLATE.spread) {
            return MARKET_TEMPLATE.twoColumn;
        }

        let template = selections[0]?.marketDisplayTemplate as MarketTemplateType;

        if (isOutright && !isMobile) {
            template = MARKET_TEMPLATE.threeColumn;
        } else if (isOutright && isMobile) {
            template = MARKET_TEMPLATE.twoColumn;
        }

        return template;
    };

    const displayTemplate = getDisplayTemplate(selectionsViewModel, isOutright);

    const groupedSelections = Object.values(groupBy(selectionsViewModel, 'marketId'));

    const isTotalGroup = isTotalLikeGroup(groupName);

    const currentTabMarketTemplateId = get(tabs[selectedTabKey], `[0].template.id`, '');

    const hasDescription = !isUndefined(marketTemplateDescriptions[currentTabMarketTemplateId]);

    const description =
        hasDescription &&
        !isUndefined(groupName) &&
        marketDescriptionGroups[groupName]?.active &&
        marketTemplateDescriptions[currentTabMarketTemplateId]?.description;

    useEffect(() => {
        if (!isUndefined(groupName)) {
            setMarketDescriptionGroups((prevState) => ({
                ...prevState,
                [groupName]: { ...prevState[groupName], hasDescription },
            }));
        }
    }, [groupName, hasDescription]);

    return {
        displayTemplate,
        displayedRowsLimit,
        groupedSelections,
        isExpanded,
        isOutright,
        isTotalGroup,
        selectedTabKey,
        selectionsViewModel,
        tabs,
        changeTab,
        toggleExpand,
        visibleMarkets,
        description,
    };
};
