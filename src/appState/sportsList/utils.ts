import { v4 as uuidv4 } from 'uuid';

import { SPORT_ICONS } from 'src/config/sport-icons';
import type { SportLinkType, SportModelType } from './types';

export const getSportsLinks = (sports: SportModelType[]): SportLinkType[] => {
    return sports.map((sport: SportModelType) => {
        const { id, label, testId } = sport;

        return {
            route: 'sport',
            params: { id },
            label,
            iconName: SPORT_ICONS[id] || 'sports-globe',
            testId: testId,
            uuid: uuidv4(),
        };
    });
};
