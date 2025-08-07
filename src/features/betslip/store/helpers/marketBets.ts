import type { EventTemplateMarketsIds } from 'src/ui/events/store/types';

export const updateMarketLineEntity =
    (eventId: number, templateId: string, marketId: number) => (atomState: EventTemplateMarketsIds) => {
        return {
            ...atomState,
            [eventId]: {
                ...atomState[eventId],
                [templateId]: marketId,
            },
        };
    };
