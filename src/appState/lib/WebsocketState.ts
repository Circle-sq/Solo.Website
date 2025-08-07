import type { Map as ImmutableMap } from 'immutable';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import { getRecoil, setRecoil } from 'recoil-nexus';

import { updateMarketLineEntity } from '@sc-betslip/store/helpers/marketBets';
import { syncPriceChangeTransaction, syncPriceDirectionTransaction } from '@sc-betslip/store/transactions/betslip';
import { getUniqueMonitorInstance } from '@sc-features/subscription-manager/SubscribeMonitor';
import type { PubSubService } from '@sc-features/subscription-manager/types';

import type { ReduxState } from 'src/appState/redux/ReduxState';
import type { MarketItem } from 'src/common/types/market';
import {
    speedBetEventAtom,
    speedBetMarketsAtom,
    speedBetSelectedMarketAtom,
} from 'src/features/scoreboardWidget/store/atoms';
import { updateSpeedBetMarkets, updateSpeedBetSelectedMarket } from 'src/features/scoreboardWidget/store/markets';
import { request as getMarketById } from 'src/modules/events/actions/get-market-by-id';
import { update as updateEvent, updateMedia } from 'src/modules/events/actions/update';
import { update as updateMarkets, updateSuspendedLeg } from 'src/modules/events/actions/update-market';
import { marketMainLinesAtom } from 'src/ui/events/store/atoms';
import { buildEventChannel, buildMarketChannel } from 'src/utils/socket-io/buildChannel';
import { socketIoClientGeneral } from 'src/utils/socket-io/clients';
import { WsMessageType } from 'src/utils/socket-io/enums';
import { WebsocketNamespace, type WsPayloadGeneral } from 'src/utils/socket-io/types';

import type { MarketHandler } from './types';

const TIMEOUT_DELAY = 1000;
const SPEEDBET_MISSING_REVISION = -19;

const getNow = (): number => new Date().getTime();

type ParticipantType = Record<string, Record<string, unknown>>;

export class WebsocketState implements PubSubService {
    action: unknown[] = [];
    lastFlush: number | null = null;

    private readonly reduxState: ReduxState;

    private timer: number | null = null;
    private timerRunning = false;
    private websocketMonitor = getUniqueMonitorInstance();

    constructor(reduxState: ReduxState) {
        this.reduxState = reduxState;
    }

    startTimer = () => {
        if (!this.timerRunning) {
            this.timer = window.setTimeout(this.flushQuery, TIMEOUT_DELAY);
        }
    };

    addToRun = (action: unknown) => {
        this.action.push(action);
        this.startTimer();
    };

    onDefaultEventReceived = (eventId: number, { body }: WsPayloadGeneral) => {
        const {
            competition,
            event: { name, ...eventRest },
            ...rest
        } = body;

        const data = {
            ...eventRest,
            ...rest,
            event: undefined,
        };

        const speedBetEvent = getRecoil(speedBetEventAtom);

        if (data.id === speedBetEvent?.id) {
            setRecoil(speedBetEventAtom, {
                ...speedBetEvent,
                active: data.active ?? speedBetEvent?.active,
                display: data.display ?? speedBetEvent?.display,
                tags: data.tags ?? speedBetEvent?.tags,
            });
        }

        if (data.participants) {
            data.participants = data.participants.map((participant: ParticipantType) => {
                const p = {
                    ...participant.participant,
                    ...participant,
                };

                delete p.participant;

                return p;
            });
        }

        this.addToRun(updateEvent(eventId, data));
    };

    onEventMediaUpdate = (eventId: number, { body }: WsPayloadGeneral) => {
        const {
            event: { name, ...eventRest },
            ...rest
        } = body;

        const data = {
            ...eventRest,
            ...rest,
            event: undefined,
        };

        this.addToRun(updateMedia(eventId, data));
    };

    onEventMarketCreated = (eventId: number, { body, updated }: WsPayloadGeneral) => {
        const { market } = body;

        const { ids: speedBetIds } = getRecoil(speedBetMarketsAtom);

        if (body?.speedBetContext || speedBetIds.has(body?.market?.id)) {
            setRecoil(
                speedBetMarketsAtom,
                updateSpeedBetMarkets({
                    ...body,
                    revision: updated?.revision ?? body?.revision ?? SPEEDBET_MISSING_REVISION,
                } as MarketItem),
            );
        }

        const speedBetSelectedMarket = getRecoil(speedBetSelectedMarketAtom);

        if (speedBetSelectedMarket && body?.selections?.[speedBetSelectedMarket?.selection?.id]) {
            setRecoil(speedBetSelectedMarketAtom, updateSpeedBetSelectedMarket(body as MarketItem));
        }

        if (isEmpty(market)) {
            return;
        }

        const event = (this.reduxState.allEvents as unknown as ImmutableMap<number, unknown>).get(
            eventId,
        ) as ImmutableMap<string, unknown>;
        this.addToRun(getMarketById(eventId, market.id, event?.get('translationData')));
    };

    onEventMarketMainLineUpdate = (eventId: number, { body: { marketMainLine } }: WsPayloadGeneral) => {
        if (isEmpty(marketMainLine)) {
            return;
        }

        const marketId = marketMainLine.marketId;
        const templateId: string = marketMainLine.marketTemplateId;

        if ('get' in this.reduxState.allEvents) {
            const event = (this.reduxState.allEvents as unknown as ImmutableMap<number, unknown>).get(
                eventId,
            ) as ImmutableMap<string, unknown>;

            const markets = event?.get('markets') as ImmutableMap<string, unknown>;

            if ('has' in markets && !markets.has(marketId)) {
                this.addToRun(getMarketById(eventId, marketId, event?.get('translationData')));
            }
        }

        setRecoil(marketMainLinesAtom, updateMarketLineEntity(eventId, templateId, marketId));
    };

    handleEventNotification = (response: WsPayloadGeneral) => {
        const id = response.body.event.id;

        switch (response.header.type) {
            case WsMessageType.EventStreamUpdate:
                return;

            case WsMessageType.EventMediaUpdate: {
                this.onEventMediaUpdate(id, response);

                break;
            }

            // TODO - @VA add test case SC-13461
            case WsMessageType.MarketStatusUpdate:

            // eslint-disable-next-line no-fallthrough
            case WsMessageType.EventMarketCreated: {
                this.onEventMarketCreated(id, response);

                break;
            }

            case WsMessageType.EventMarketMainLineUpdate: {
                this.onEventMarketMainLineUpdate(id, response);

                break;
            }

            default: {
                this.onDefaultEventReceived(id, response);
            }
        }
    };

    subscribeToEvent(id: number, version: number) {
        socketIoClientGeneral.then((clientIo) => {
            const eventChannel = buildEventChannel(id);

            if (this.websocketMonitor.has(eventChannel)) {
                return;
            }

            clientIo?.socket.nsSubscribe(this.handleEventNotification, {
                channel: eventChannel,
                version,
                namespace: WebsocketNamespace.SB,
            });
            this.websocketMonitor.add(eventChannel);
        });
    }

    marketHandler =
        ({ eventId, marketId }: MarketHandler) =>
        ({ body, header }: WsPayloadGeneral) => {
            const {
                market: { name, ...marketRest },
                selections,
                active,
                display,
                tradedInPlay,
                displayOrder,
                spOnly,
                sp,
                cashoutAvailable,
            } = body;

            const modifiedSelections: Record<string, unknown> = {};

            for (const selection in selections) {
                modifiedSelections[selection] = omit(selections[selection], ['name', 'nameWithoutLine', 'oldPrice']);
            }

            const data = {
                ...marketRest,
                selections: modifiedSelections,
                event: null,
                market: null,
                ...(active !== undefined ? { active } : {}),
                ...(display !== undefined ? { display } : {}),
                ...(tradedInPlay !== undefined ? { tradedInPlay } : {}),
                ...(cashoutAvailable !== undefined ? { cashoutAvailable } : {}),
                displayOrder,
                spOnly,
                sp,
            };

            if (header.type === WsMessageType.SelectionPriceChange) {
                const syncPriceChange = syncPriceChangeTransaction(selections);
                const syncPriceDirection = syncPriceDirectionTransaction(selections, {
                    eventId,
                    marketId,
                });

                this.addToRun(() => {
                    syncPriceDirection({ get: getRecoil, set: setRecoil });
                    syncPriceChange({ get: getRecoil, set: setRecoil });
                });
            }

            if (header.type === WsMessageType.MarketStatusUpdate) {
                this.addToRun(updateSuspendedLeg(marketId, body));
            }

            const { ids: speedBetIds } = getRecoil(speedBetMarketsAtom);

            if (speedBetIds.has(body?.market?.id)) {
                setRecoil(speedBetMarketsAtom, updateSpeedBetMarkets(body as MarketItem));
            }

            const speedBetSelectedMarket = getRecoil(speedBetSelectedMarketAtom);

            if (speedBetSelectedMarket && body?.selections?.[speedBetSelectedMarket?.selection?.id]) {
                setRecoil(speedBetSelectedMarketAtom, updateSpeedBetSelectedMarket(body as MarketItem));
            }

            this.addToRun(updateMarkets(eventId, marketId, data, header.type));
        };

    subscribeToMarket = (eventId: number, marketId: number, version: number) => {
        socketIoClientGeneral.then((clientIo) => {
            const marketChannel = buildMarketChannel(marketId);

            if (this.websocketMonitor.has(marketChannel)) {
                return;
            }

            clientIo?.socket.nsSubscribe(this.marketHandler({ eventId, marketId }), {
                channel: marketChannel,
                version,
                namespace: WebsocketNamespace.SB,
            });
            this.websocketMonitor.add(marketChannel);
        });
    };

    unsubscribeEvents = (eventIds: number[]) => {
        socketIoClientGeneral.then((clientIo) => {
            forEach(eventIds, (eventId) => {
                const eventChannel = buildEventChannel(eventId);

                clientIo?.socket.nsUnsubscribe({ channel: eventChannel, namespace: WebsocketNamespace.SB });
                this.websocketMonitor.remove(eventChannel);
            });
        });
    };

    unsubscribeMarkets = (marketIds: number[]) => {
        socketIoClientGeneral.then((clientIo) => {
            forEach(marketIds, (marketId) => {
                const marketChannel = buildMarketChannel(marketId);

                clientIo?.socket.nsUnsubscribe({ channel: marketChannel, namespace: WebsocketNamespace.SB });
                this.websocketMonitor.remove(marketChannel);
            });
        });
    };

    private flushQuery = () => {
        if (this.lastFlush === null || this.lastFlush + TIMEOUT_DELAY < getNow()) {
            const actionToRun = this.action.concat([]);

            this.action = [];

            if (actionToRun.length > 0) {
                clearTimeout(this.timer as number);
                //const messageTime = ` -------------- batch run ${actionToRun.length}`;
                //console.time(messageTime);
                this.reduxState.batchDispatch(actionToRun);
                //console.timeEnd(messageTime);

                this.lastFlush = getNow();

                this.timerRunning = false;
                this.startTimer();
            }
        }
    };
}
