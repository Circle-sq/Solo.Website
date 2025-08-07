import type { RefreshModel } from 'src/appState/models/ModelsEventState';
import { remapSport } from 'src/utils/sportRemapping';

export const cloneItem = (item: any): any => {
    return JSON.parse(JSON.stringify(item));
};

const parseId = (value: any): number | null => {
    if (typeof value === 'number') {
        return value;
    }

    if (typeof value === 'string') {
        const valueParse = parseInt(value, 10);

        if (!isNaN(valueParse)) {
            return valueParse;
        }
    }

    return null;
};

const refreshSelection = (listToRefresh: RefreshModel[], eventId: number, marketId: number, selection: any) => {
    const selectionId = parseId(selection.id);

    if (selectionId === null) {
        console.error('selection.id error', selection);

        return;
    }

    listToRefresh.push({
        type: 'selection',
        selectionId: selectionId,
        data: {
            ...selection,
            id: selectionId,
            eventId: eventId,
            marketId: marketId,
        },
    });
};

const processMarket = (itemIn: any): [any, any[]] => {
    const itemClone = cloneItem(itemIn);
    const selectionsId: Record<number, true> = {};
    const selectionsModel: any[] = [];

    if (itemClone.selections) {
        for (const market of Object.values(itemClone.selections)) {
            const id = parseId((market as any).id);

            if (id === null) {
                console.error('market.id error', market);
            } else {
                selectionsId[id] = true;

                selectionsModel.push(market);
            }
        }

        itemClone.selections = selectionsId;
    }

    return [itemClone, selectionsModel];
};

export const refreshMarket = (listToRefresh: RefreshModel[], eventId: number, market: any) => {
    //console.info('refresh market', eventId, market);

    const marketId = parseId(market.id);

    if (marketId === null) {
        console.error('market.id error', market);

        return;
    }

    const [marketClone, selectionModels] = processMarket(market);

    listToRefresh.push({
        type: 'market',
        marketId: marketId,
        data: {
            ...marketClone,
            id: marketId,
            eventId,
        },
    });

    for (const selection of selectionModels) {
        refreshSelection(listToRefresh, eventId, marketId, selection);
    }
};

const processEvent = (itemIn: any): [any, any[]] => {
    const itemClone = cloneItem(itemIn);
    const marketsId: Record<number, true> = {};
    const marketsModels: any[] = [];

    if (itemClone.markets) {
        for (const market of Object.values(itemClone.markets)) {
            const marketId = parseId((market as any).id);

            if (marketId !== null) {
                marketsId[marketId] = true;

                marketsModels.push(market);
            }
        }

        itemClone.markets = marketsId;
    }

    return [itemClone, marketsModels];
};

export const refreshEvent = (listToRefresh: RefreshModel[], itemIn: any) => {
    const eventId = itemIn.id;

    itemIn.sport = remapSport(itemIn.sport);

    const [eventToUpdate, marketsToUpdate] = processEvent(itemIn);

    listToRefresh.push({
        type: 'event',
        eventId: eventId,
        data: {
            ...eventToUpdate,
            id: eventId,
        },
    });

    for (const market of marketsToUpdate) {
        refreshMarket(listToRefresh, eventId, market);
    }
};
