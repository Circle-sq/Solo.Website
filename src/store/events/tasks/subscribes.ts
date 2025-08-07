import forEach from 'lodash/forEach';
import { getRecoil, setRecoil } from 'recoil-nexus';

import { updateSelectionStatuses } from '@sc-asianView/store/helpers/updaters';
import { updateMainLineMarketIdTask } from '@sc-asianView/store/tasks/mainLine';
import { addMarketTask } from '@sc-asianView/store/tasks/market';
import { syncPriceChangeTransaction } from '@sc-betslip/store/transactions/betslip';
import { eventMediaAtom } from '@sc-media/store/atoms';
import type { CallbackParams } from '@sc-utils/jotai';

import { WsMessageType } from 'src/utils/socket-io/enums';
import type { WsPayloadGeneral } from 'src/utils/socket-io/types';

import { eventItemAtomFamily, marketItemAtomFamily, selectionItemAtomFamily } from '../entities';
import { normalizeBody } from '../helpers/parse';

import { updateSelectionsPriceTask } from './entities';
import { marketStatusesUpdateTask } from './market';
import { eventTimeSettingsUpdateTask } from './timeSettings';
import type {
    EventFeedStatisticsUpdateBody,
    EventMarketCreatedBody,
    EventMediaUpdateBody,
    EventStatusUpdateBody,
    EventTimeSettingsUpdateBody,
    MarketStatusUpdateBody,
    SelectionPriceChangeBody,
    SelectionStatusUpdateBody,
} from './types';

export const subscribeToEventTask =
    ({ get, set }: CallbackParams) =>
    (payload: WsPayloadGeneral) => {
        const body = normalizeBody(payload.body);

        const eventItem = get(eventItemAtomFamily(body.event?.id as number));

        if (eventItem === null) {
            return;
        }

        switch (payload.header.type) {
            case WsMessageType.EventMediaUpdate: {
                const { event, media } = <EventMediaUpdateBody>body;

                set(eventItemAtomFamily(event.id), { ...eventItem, media, revision: eventItem.revision + 1 });

                const eventMedia = getRecoil(eventMediaAtom);

                if (eventMedia?.id == null || Number(eventMedia.id) !== event.id) {
                    return;
                }

                setRecoil(eventMediaAtom, (state) => ({ ...state, media }));

                break;
            }

            case WsMessageType.EventMarketCreated: {
                const { event, market, template } = <EventMarketCreatedBody>body;

                if ('id' in market) {
                    addMarketTask({ get, set })(event.id, market.id, template.id);
                }

                break;
            }

            case WsMessageType.MarketStatusUpdate: {
                const { display, event, market, template } = <MarketStatusUpdateBody>body;

                if (display) {
                    const marketItem = get(marketItemAtomFamily(market.id));

                    if (marketItem === null) {
                        addMarketTask({ get, set })(event.id, market.id, template.id);
                    } else {
                        marketStatusesUpdateTask({ get, set })(<MarketStatusUpdateBody>body);
                    }
                }

                break;
            }

            case WsMessageType.EventStatusUpdate: {
                const { active, display, event } = <EventStatusUpdateBody>body;

                set(eventItemAtomFamily(event.id), {
                    ...eventItem,
                    active,
                    display,
                    revision: eventItem.revision + 1,
                });

                break;
            }

            case WsMessageType.EventFeedStatisticsUpdate: {
                const { event, statistics } = <EventFeedStatisticsUpdateBody>body;

                set(eventItemAtomFamily(event.id), {
                    ...eventItem,
                    statistics,
                    revision: eventItem.revision + 1,
                });

                break;
            }

            case WsMessageType.EventTimeSettingsUpdate: {
                eventTimeSettingsUpdateTask({ get, set })(<EventTimeSettingsUpdateBody>body);

                break;
            }

            default: {
                break;
            }
        }
    };

export const subscribeToMarketTask =
    ({ get, set }: CallbackParams) =>
    (payload: WsPayloadGeneral) => {
        const body = normalizeBody(payload.body);

        const marketItem = get(marketItemAtomFamily(body.market?.id as number));

        if (marketItem === null) {
            return;
        }

        switch (payload.header.type) {
            case WsMessageType.SelectionPriceChange: {
                const { selections } = <SelectionPriceChangeBody>body;

                updateSelectionsPriceTask({ get, set })(selections);
                updateMainLineMarketIdTask({ get, set })(marketItem.event.id, marketItem.template.id);

                syncPriceChangeTransaction(selections)({ get: getRecoil, set: setRecoil });

                break;
            }

            case WsMessageType.SelectionStatusUpdate: {
                const { selections } = <SelectionStatusUpdateBody>body;

                forEach(selections, (selection) => {
                    set(
                        selectionItemAtomFamily(selection.id),
                        updateSelectionStatuses(selection.active, selection.display),
                    );
                });

                break;
            }

            case WsMessageType.MarketStatusUpdate: {
                marketStatusesUpdateTask({ get, set })(<MarketStatusUpdateBody>body);

                break;
            }

            default: {
                break;
            }
        }
    };
