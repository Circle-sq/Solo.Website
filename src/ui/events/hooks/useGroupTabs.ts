import { useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import usePrevious from '@react-hook/previous';

import type { GroupTabsParams } from 'src/ui/events/DisplayTemplates/types';
import { groupTabs } from 'src/ui/events/utils/commonTemplateLogic';
import { getDefaultSelectedTabKey } from 'src/ui/events/utils/helpers';

const useGroupTabs = ({ markets, tabGroupingLogicType }: GroupTabsParams) => {
    const tabs = useMemo(() => groupTabs({ markets, tabGroupingLogicType }), [markets, tabGroupingLogicType]);

    const prevTabs = usePrevious(tabs);
    const areTabsChanged = !isEqual(tabs, prevTabs);

    const defaultSelectedTab = getDefaultSelectedTabKey({ availableTabs: tabs });

    return { tabs, areTabsChanged, defaultSelectedTab };
};

export default useGroupTabs;
