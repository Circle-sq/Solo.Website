import type { CallbackParams } from '@solo-utils/jotai';

import { eventItemAtomFamily } from 'src/store/events/entities';
import { marketsByIdsMutationAtom } from 'src/store/events/queries/markets';
import { addMarketToEventTask, setMarketTask } from 'src/store/events/tasks/entities';

import { hasMainLineMarket } from '../helpers/mainLine';
import { sportConfigAtom } from '../sportConfig';

import { updateMainLineMarketIdTask } from './mainLine';

export const addMarketTask = (p: CallbackParams) => (eventId: number, marketId: number, marketTemplateId: string) => {
    const sportConfig = p.get(sportConfigAtom);
    const eventItem = p.get(eventItemAtomFamily(eventId));

    if (sportConfig === null || eventItem === null) {
        return;
    }

    const { isInPrimaryGroup, isInSecondaryGroup } = hasMainLineMarket(marketTemplateId, sportConfig);

    if (!isInPrimaryGroup && !isInSecondaryGroup) {
        return;
    }

    const { mutate } = p.get(marketsByIdsMutationAtom);

    mutate(
        {
            eventId,
            eventTranslationData: eventItem.translationData,
            marketIds: [marketId],
        },
        {
            onSuccess: ([market]) => {
                if (market === undefined) {
                    return;
                }

                setMarketTask(p)(market, eventItem.active);
                addMarketToEventTask(p)(market);
                updateMainLineMarketIdTask(p)(market.event.id, market.template.id);
            },
        },
    );
};
