import type { CallbackParams } from '@solo-utils/jotai';

import { replace } from 'src/common/updaters/array';
import { eventItemAtomFamily } from 'src/store/events/entities';

import { getMarketsByTemplateId } from '../helpers/getters';
import { findGroupTemplateIdIndexes, getIdealMarketId } from '../helpers/mainLine';
import { mainLineMarketIdsAtomFamily } from '../mainLine';
import { sportConfigAtom } from '../sportConfig';

export const updateMainLineMarketIdTask =
    ({ get, set }: CallbackParams) =>
    (eventId: number, templateId: string) => {
        const eventItem = get(eventItemAtomFamily(eventId));
        const sportConfig = get(sportConfigAtom);

        if (eventItem === null || sportConfig == null) {
            return;
        }

        const { primaryGroupTemplateIdIndex, secondaryGroupTemplateIdIndex } = findGroupTemplateIdIndexes(
            templateId,
            sportConfig,
        );

        const isInPrimaryGroup = primaryGroupTemplateIdIndex !== -1;
        const isInSecondaryGroup = secondaryGroupTemplateIdIndex !== -1;

        if (!isInPrimaryGroup && !isInSecondaryGroup) {
            return;
        }

        const markets = getMarketsByTemplateId(get)(eventItem.markets, templateId);
        const idealMarketId = getIdealMarketId(markets);

        if (idealMarketId < 0) {
            return;
        }

        if (isInPrimaryGroup) {
            set(mainLineMarketIdsAtomFamily(eventId), ({ primaryGroup, secondaryGroup }) => ({
                primaryGroup: replace(primaryGroup, idealMarketId, primaryGroupTemplateIdIndex),
                secondaryGroup,
            }));
        } else if (isInSecondaryGroup) {
            set(mainLineMarketIdsAtomFamily(eventId), ({ primaryGroup, secondaryGroup }) => ({
                primaryGroup,
                secondaryGroup: replace(secondaryGroup, idealMarketId, secondaryGroupTemplateIdIndex),
            }));
        }
    };
