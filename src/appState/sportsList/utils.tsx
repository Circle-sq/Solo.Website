import { v4 as uuidv4 } from 'uuid';
import SportIcon from '@solo-ui/icons/config/SportIcon';

import type { SportLinkType, SportModelType } from './types';

export const getSportsLinks = (sports: SportModelType[]): SportLinkType[] => {
    return sports.map((sport: SportModelType) => {
        const { id, label, testId } = sport;

        return {
            route: 'sport',
            params: { id },
            label,
            Icon: <SportIcon fontSize='small' sport={id} />,
            testId: testId,
            uuid: uuidv4(),
        };
    });
};
