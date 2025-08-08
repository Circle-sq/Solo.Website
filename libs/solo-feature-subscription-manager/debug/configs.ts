import { SubKey } from '../subKeys';
import { EntityType, type SubscribeConfig } from '../types';

export enum DebugColor {
    coral = 'coral',
    blueviolet = 'blueviolet',
    darkviolet = 'darkviolet',
    violet_light = '#b86aff',
    darkorange = 'darkorange',
    darkmagenta = 'darkmagenta',
    darkgray = '#333',
    green = '#006900',
    lightgreen = '#01a401',
    orange = 'orange',
    palepink = '#935454',
    purple = '#ff6969',
    redish = '#9C0606',
    veryorange = '#ff8c69',
    salmon = 'salmon',
    violet = 'violet',
}

export const debugConfigs: Record<SubKey, SubscribeConfig> = {
    [SubKey.av_eoc]: { color: DebugColor.green, entityType: EntityType.Market },
    [SubKey.av_eoc_line]: { color: DebugColor.lightgreen, entityType: EntityType.Market },
    [SubKey.av_event_row]: { color: DebugColor.darkorange, entityType: EntityType.Event },
    [SubKey.test_bet]: { color: DebugColor.violet, entityType: EntityType.Event },
    [SubKey.correct_score]: { color: DebugColor.darkorange, entityType: EntityType.Market },
    [SubKey.esg]: { color: DebugColor.blueviolet, entityType: EntityType.Market },
    [SubKey.event_card]: { color: DebugColor.orange, entityType: EntityType.Event },
    [SubKey.event_card_mob]: { color: DebugColor.redish, entityType: EntityType.Event },
    [SubKey.event_row]: { color: DebugColor.salmon, entityType: EntityType.Event },
    [SubKey.game_lines]: { color: DebugColor.orange, entityType: EntityType.Market },
    [SubKey.in_play_event]: { color: DebugColor.darkviolet, entityType: EntityType.Event },
    [SubKey.in_play_market]: { color: DebugColor.redish, entityType: EntityType.Market },
    [SubKey.o_u_tmpl]: { color: DebugColor.darkorange, entityType: EntityType.Market },
    [SubKey.outright_event]: { color: DebugColor.palepink, entityType: EntityType.Event, align: 'left' },
    [SubKey.outright_market]: { color: DebugColor.palepink, entityType: EntityType.Market },
    [SubKey.market_marquee]: { color: DebugColor.darkviolet, entityType: EntityType.Market, align: 'inline-left' },
    [SubKey.event_marquee]: { color: DebugColor.violet_light, entityType: EntityType.Event, align: 'inline-left' },
    [SubKey.suspended_market]: { color: DebugColor.darkgray, entityType: EntityType.Market },
    [SubKey.selection_item]: { color: DebugColor.darkviolet, entityType: EntityType.Event, align: 'left' },
    [SubKey.speed_bet_market]: { color: DebugColor.veryorange, entityType: EntityType.Market },
    [SubKey.speed_bet_market_hidden]: { color: DebugColor.veryorange, entityType: EntityType.Market },
    [SubKey.spread_tmpl]: { color: DebugColor.darkorange, entityType: EntityType.Market },
    [SubKey.standard_bet]: { color: DebugColor.violet, entityType: EntityType.Market },
    [SubKey.suspended_esg]: { color: DebugColor.darkmagenta, entityType: EntityType.Market },
    [SubKey.xbet_leg]: { color: DebugColor.violet, entityType: EntityType.Market },
    [SubKey.xbet_market]: { color: DebugColor.purple, entityType: EntityType.Market },
    [SubKey.test_event]: { color: DebugColor.purple, entityType: EntityType.Event },
};

const providerDebugStyle = `background: white; color: ${DebugColor.darkviolet}`;
const providerInfoStyle = `background: black; color: lightblue`;

export const loggers = (namespace: string) => {
    return {
        info: (args: { subKey: SubKey; id: number; revision?: number; message: string }) => {
            const { subKey, id, revision, message } = args;

            console.info(`%c WSProvider[${namespace}] ${subKey}:${id}|${revision} ${message}`, providerInfoStyle);
        },
        cancelSub: (key: string) => {
            console.info(
                `%c  > WSProvider[${namespace}] going to CANCEL an unsubscribe process (from: ${key})`,
                providerDebugStyle,
            );
        },
        noId: (subKey: SubKey, id?: number) => {
            const config = debugConfigs[subKey];

            console.info(`%c WSProvider[${namespace}] ${subKey} oops - no id`, `color: ${config.color}`, {
                [`${config.entityType}Id`]: id,
            });
        },
        applyForSubscription: (args: { subKey: SubKey; id: number; revision?: number }) => {
            const { subKey, id, revision } = args;
            const config = debugConfigs[subKey];

            console.info(
                `%c WSProvider[${namespace}] ${subKey} applies for SUB    ${id}:${revision}`,
                `color: ${config.color}`,
            );
        },
        sendUnsub: (subKey: SubKey, id: number) => {
            const config = debugConfigs[subKey];

            console.info(`%c WSProvider[${namespace}] ${subKey} send for UNSUB  ${id}`, `color: ${config.color}`);
        },
        receivedSubRequest: (subKey: SubKey, entities: number[]) => {
            console.info(
                `%c  > WSProvider[${namespace}] received SUB request from ${subKey} ${entities}`,
                providerDebugStyle,
            );
        },
        receivedUnsubRequest: (subKey: SubKey, entities: number[]) => {
            console.info(
                `%c  > WSProvider[${namespace}] received UNSUB request from ${subKey} ---  ${entities}`,
                providerDebugStyle,
            );
        },
        subResponse: (subKey: SubKey, id: number, message: string) => {
            console.info(
                `%c  >> WSProvider[${namespace}] SUB response ${subKey}:${id} ${message}`,
                'background: red; color: white',
            );
        },
        unsub: (subKey: SubKey, entities: number[]) => {
            console.info(`%c  >> WSProvider[${namespace}] actual UNSUB === ${subKey}:${entities}`, providerDebugStyle);
        },
    };
};
