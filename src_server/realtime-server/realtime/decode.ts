import * as t from 'io-ts';

import { buildValidator } from '@sc-webapi/mobx-utils/buildValidator';

const _MessageHeartbeatIO = t.interface({
    type: t.literal('heartbeat'),
    value: t.number,
});

type MessageHeartbeatType = t.TypeOf<typeof _MessageHeartbeatIO>;

export const createMessageHeartbeat = (value: number): MessageHeartbeatType => ({
    type: 'heartbeat',
    value: value,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MessagePingIO = t.interface({
    type: t.literal('ping'),
});

type MessagePingType = t.TypeOf<typeof MessagePingIO>;

export const createMessagePing = (): MessagePingType => ({
    type: 'ping',
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MessageUpdateIO = t.interface({
    type: t.literal('update'),
    path: t.string,
    mode: t.union([t.literal('full'), t.literal('diff')]),
    data: t.unknown,
});

type MessageUpdateType = t.TypeOf<typeof MessageUpdateIO>;

export const createMessageUpdateFull = (path: string, data: unknown): MessageUpdateType => ({
    type: 'update',
    mode: 'full',
    path,
    data,
});

export const createMessageUpdateDiff = (path: string, data: unknown): MessageUpdateType => ({
    type: 'update',
    mode: 'diff',
    path,
    data,
});

const MessageSubscriptionsIO = t.interface({
    type: t.literal('subscriptions'),
    data: t.array(
        t.interface({
            path: t.string,
            active: t.boolean,
        }),
    ),
});

export type MessageSubscriptionsType = t.TypeOf<typeof MessageSubscriptionsIO>;

const MessagePongIO = t.interface({
    type: t.literal('pong'),
});

const MessageFromClientIO = t.union([MessageSubscriptionsIO, MessagePongIO]);

export const decodeMessageFromClient = buildValidator('MessageFromClientIO', MessageFromClientIO);
