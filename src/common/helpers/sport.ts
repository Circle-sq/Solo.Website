import isUndefined from 'lodash/isUndefined';
import includes from 'lodash/includes';

import { sportsWithSimpleTimer, sportsWithTimer } from 'src/utils/constants';

export const isSportWithLiveTimer = (sport: string | undefined, period: string) => {
    if (!isUndefined(sport) && includes(sportsWithTimer, sport)) {
        return /^\d/.test(period);
    }

    return false;
};

export const isSportWithSimpleTimer = (sport: string | undefined) =>
    !isUndefined(sport) && includes(sportsWithSimpleTimer, sport);
