import { fromJS, Map } from 'immutable';

import { WsMessageType } from 'src/utils/socket-io/enums';

import { refreshMarket } from './modelsHelper';

function hasDisplayedSelection(selections) {
    for (const id of selections.keySeq().toArray()) {
        const selection = selections.get(id);

        if (selection.get('display')) {
            return true;
        }
    }

    return false;
}

export function EVENTS_UPDATE_MARKET(state, { eventId, market, messageType }) {
    const { selections: newSelections } = market;
    const oldMarket = state.getIn(['items', eventId, 'markets', market.id], Map());
    const oldSelections = oldMarket.get('selections', Map());

    const isValidMessageType =
        messageType === WsMessageType.MarketStatusUpdate || messageType === WsMessageType.SelectionStatusUpdate;

    try {
        //console.info(`ACTION update market ${eventId}`, market);
        const listToRefresh = [];

        refreshMarket(listToRefresh, eventId, market);

        $appState.models.refreshEventModels(listToRefresh);
    } catch (err) {
        console.error(err);
    }

    let updatedMarket = oldMarket.mergeDeep(fromJS(market));

    updatedMarket.get('selections').forEach((selection, id) => {
        if (updatedMarket.get('display') !== null && isValidMessageType) {
            updatedMarket = updatedMarket.set(
                'displayed',
                updatedMarket.get('display') && hasDisplayedSelection(updatedMarket.get('selections', Map())),
            );
        }

        if (newSelections && newSelections[id] && newSelections[id].price) {
            const oldPrice = oldSelections.getIn([id, 'price']);

            if (oldPrice && newSelections[id].price.d !== oldPrice.get('d') && selection.get('priceHistory')) {
                const priceHistory = selection.get('priceHistory').unshift(
                    Map({
                        t: new Date().toISOString(),
                        p: oldPrice,
                    }),
                );

                updatedMarket = updatedMarket.setIn(['selections', id, 'priceHistory'], priceHistory);
            }
        }
    });

    return state.setIn(['items', eventId, 'markets', updatedMarket.get('id')], updatedMarket);
}
