import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';

import type { CompetitionLocationItem } from 'src/modules/sports/types';
import type { CompetitionLocations } from 'src/utils/types';

export const groupingByProp = (tagPath: string, list: CompetitionLocationItem[] = []): CompetitionLocations => {
    if (isEmpty(list)) {
        return {};
    }

    const groupedList = groupBy(list, tagPath);

    // sort by display order desc
    for (const key in groupedList) {
        groupedList[key] = orderBy(groupedList[key], 'displayOrder', 'desc');
    }

    //sort keys A-Z
    const sortedKeys = Object.keys(groupedList).sort();

    return sortedKeys.reduce((acc: CompetitionLocations, tagKey) => {
        acc[tagKey] = groupedList[tagKey];

        return acc;
    }, {});
};
