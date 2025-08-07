import has from 'lodash/has';

import { eSportsSportType } from './constants';
import type { ESports, AggregatedSport } from './types';

export const isESport = <T1 extends ESports = ESports>(sport: AggregatedSport | T1): sport is T1 => {
    return sport.id === eSportsSportType && has(sport, 'sports');
};
