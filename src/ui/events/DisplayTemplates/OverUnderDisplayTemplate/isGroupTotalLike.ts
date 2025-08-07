import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import some from 'lodash/some';
import toLower from 'lodash/toLower';

import { MARKET_TEMPLATE_GROUP } from 'src/utils/constants';

export const variationsOfMarketTotalLabels: string[] = map(
    [MARKET_TEMPLATE_GROUP.totals_KO, MARKET_TEMPLATE_GROUP.totals, MARKET_TEMPLATE_GROUP.total],
    toLower,
);

export const isTotalLikeGroup = (groupName?: string, possibleTotalLabels = variationsOfMarketTotalLabels): boolean => {
    if (isEmpty(groupName)) {
        return false;
    }

    const exactMatch = includes(possibleTotalLabels, toLower(groupName));

    if (exactMatch) {
        return true;
    }

    return some(possibleTotalLabels, (label) => includes(toLower(groupName), label));
};
