/* eslint-disable @typescript-eslint/no-explicit-any */
import { List, Map as ImmutableMap, OrderedMap } from 'immutable';
import * as t from 'io-ts';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import { action, computed, makeObservable, observable } from 'mobx';
import { batch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { buildValidator } from '@sc-webapi/mobx-utils/buildValidator';

// Actions Creators
import type { ReduxState as ReduxStateType } from 'src/appState/redux/types';
import { getCompetitionLocation } from 'src/appState/utils';
import type { CurrencyType } from 'src/config/types';
import { IconCategory, RouteName } from 'src/common/enums';
import { LHN_SPORTS_ORDER } from 'src/utils/constants';
import { groupingByProp } from 'src/utils/grouping';
import type { CompetitionLocations } from 'src/utils/types';

import type { LinkItemEl, NestedItem } from './ReduxStateTypes';
import type { AggregationItem, CompetitionType, CompetitionViewType, SportModel } from './types';

const CompetitionIO = t.type({
    id: t.number,
    name: t.string,
    displayOrder: t.union([t.string, t.number]),
    tags: t.unknown,
});

const decodeCompetitionList = buildValidator('Array<CompetitionIO>', t.record(t.string, CompetitionIO), true);

export class ReduxState {
    _state: null | ReduxStateType = null;

    private readonly reduxStoreRaw: any;
    private batchInProgress: boolean;
    private readonly subscribeList: ((state: ReduxStateType | null) => void)[];

    constructor(reduxStoreRaw: any) {
        makeObservable<ReduxState, 'triggerSubscribeReduxState'>(this, {
            _state: observable.ref,
            triggerSubscribeReduxState: action,
            accountComputed: computed,
            currency: computed,
            getContentFilter: computed,
            getContent: computed,
            acumulatedItems: computed,
            items: computed,
            allEvents: computed,
            eventsListIds: computed.struct,
            sportsItems: computed,
            competitionsItemsRecord: computed.struct,
            competitionsItems: computed,
            normalizedCompetitionLocations: computed,
            competitionLocations: computed,
            recentlyViewedSports: computed.struct,
            state: computed,
            userId: computed,
            userCountry: computed,
            competitionIcons: computed,
            competitionLocationIcons: computed,
        });

        this.reduxStoreRaw = reduxStoreRaw;

        this.batchInProgress = false;

        this.subscribeList = [];

        this.reduxStoreRaw.subscribe(() => {
            this.triggerSubscribeReduxState();
        });
    }

    dispatch = (actionBody: unknown) => {
        this.reduxStoreRaw.dispatch(actionBody);
    };

    batchDispatch(actionToRun: unknown[]) {
        this.batchInProgress = true;

        batch(() => {
            for (const actionItem of actionToRun) {
                this.dispatch(actionItem);
            }
        });

        this.batchInProgress = false;

        this.triggerSubscribeReduxState();
    }

    getEventsCounter(collectionId: string): [] {
        const state = this.state;
        let counters: [] = [];

        if (state !== null && state.events !== undefined) {
            const eventCounters = state.events.getIn(['collections', collectionId, 'counters'], List()).toJS() as [];
            counters = eventCounters.map(({ id, ...res }: { id: string; count: number }) => ({
                ...state.sports.getIn(['sports', 'items', id], List()).toJS(),
                ...res,
            })) as [];
        }

        return counters;
    }

    getEventsCountryCounter(collectionId: string): [] {
        const state = this.state;

        let counters: [] = [];

        if (state !== null && state.events !== undefined) {
            counters = state.events.getIn(['collections', collectionId, 'country'], List()).toJS() as [];
        }

        return counters;
    }

    getEventsCompetitionsCounter(collectionId: string): [] {
        const state = this.state;

        let counters: [] = [];

        if (state !== null && state.events !== undefined) {
            counters = state.events.getIn(['collections', collectionId, 'competitions'], List()).toJS() as [];
        }

        return counters;
    }

    getEventsCollectionIds(collectionId: string): number[] {
        const state = this.state;

        let ids: number[] = [];

        if (state !== null && state.events !== undefined) {
            ids = state.events.getIn(['collections', collectionId, 'items'], List()).toJS() as number[];
        }

        return ids;
    }

    getAggregations(collectionId: string, aggregation: string): Map<string, AggregationItem> {
        const state = this.state;

        let agg: Map<string, AggregationItem> = new Map();

        if (state !== null) {
            agg = state.events
                .getIn(['collections', collectionId, 'aggregations', aggregation], List())
                .reduce((acc: Map<string, AggregationItem>, item: ImmutableMap<string, any>) => {
                    const id = item.get('id');

                    return acc.set(id, {
                        id: item.get('id'),
                        name: item.get('name'),
                        displayOrder: item.get('displayOrder'),
                        tags: item.get('tags'),
                    });
                }, new Map());
        }

        return agg;
    }

    getLastAggregations(collectionId: string, aggregation: string): Map<string, AggregationItem> {
        const state = this.state;

        let agg: Map<string, AggregationItem> = new Map();

        if (state !== null) {
            agg = state.events
                .getIn(['collections', collectionId, 'lastAggregations', aggregation], List())
                .reduce((acc: Map<string, AggregationItem>, item: ImmutableMap<string, any>) => {
                    const id = item.get('id');

                    return acc.set(id, {
                        id: item.get('id'),
                        name: item.get('name'),
                        displayOrder: item.get('displayOrder'),
                        tags: item.get('tags'),
                    });
                }, new Map());
        }

        return agg;
    }

    getSportTemplates(sportId: string): OrderedMap<string, List<string>> | null {
        const events = get(this.state, 'events', ImmutableMap());

        if (!events.hasIn(['marketTemplates', sportId])) {
            return null;
        }

        const sportTemplates = events.getIn(['marketTemplates', sportId], ImmutableMap());

        return sportTemplates.get('items', OrderedMap());
    }

    getCompetitionIconUrl(competition: any): string | undefined {
        const platformObjectId = competition?.platformObject?.id;
        const elementId = competition?.id;
        const iconIdentifier = platformObjectId !== undefined ? platformObjectId.toString() : elementId?.toString();

        if (typeof this.competitionIcons.getIn === 'function') {
            return this.competitionIcons.getIn([iconIdentifier, 'url']);
        }

        return undefined;
    }

    getCompetitionLocationIconUrl(locationKey?: string | null, locationLabel?: string | null): string | undefined {
        if (
            locationKey !== undefined &&
            locationKey !== null &&
            locationLabel !== undefined &&
            locationLabel !== null
        ) {
            return this.competitionLocationIcons.getIn([`${locationKey}-${locationLabel}`, 'url']);
        } else {
            return undefined;
        }
    }

    private triggerSubscribeReduxState() {
        setTimeout(() => {
            if (this.batchInProgress === true) {
                return;
            }

            this._state = this.reduxStoreRaw.getState();

            const subscribeList = this.subscribeList.concat([]);
            const state = this.reduxStoreRaw.getState();

            for (const callbackToRun of subscribeList) {
                callbackToRun(state);
            }
        }, 0);
    }

    static createForContext() {
        return new ReduxState({
            subscribe: () => {},
            dispatch: () => {},
        });
    }

    getFrom<T>(
        mainKey: keyof ReduxStateType,
        getFromState: (data: any) => unknown,
        decode: (data: unknown) => T | Error,
        defaultValue: T,
    ): T {
        const state = this._state;

        if (state !== null) {
            try {
                if (state[mainKey]) {
                    const subStateRawData = getFromState(state[mainKey]);

                    if (subStateRawData === undefined) {
                        return defaultValue;
                    }

                    if (subStateRawData && typeof (subStateRawData as ImmutableMap<string, any>).toJS === 'function') {
                        const subStateData = decode((subStateRawData as ImmutableMap<string, any>).toJS());

                        if (subStateData instanceof Error) {
                            return defaultValue;
                        }

                        return subStateData;
                    }

                    const subStateData = decode(subStateRawData);

                    if (subStateData instanceof Error) {
                        return defaultValue;
                    }

                    return subStateData;
                }
            } catch (err) {
                console.error(err);
            }
        }

        return defaultValue;
    }

    get accountComputed(): null | ImmutableMap<string, any> {
        const state = this._state;

        if (state != null) {
            try {
                return state.account;
            } catch (err) {
                console.error(err);
            }
        }

        return null;
    }

    get currency(): CurrencyType | null {
        const state = this._state;

        if (state != null) {
            try {
                if (state.account.get('authenticated')) {
                    return state.account.getIn(['data', 'wallet', 'currency']) as CurrencyType;
                }
            } catch (err) {
                console.error(err);
            }
        }

        return null;
    }

    get getContentFilter(): ImmutableMap<string, any> {
        return this.getContent.get('filters', ImmutableMap());
    }

    get getContent(): ImmutableMap<string, any> {
        const state = this._state;

        if (state !== null) {
            try {
                return state.content;
            } catch (err) {
                console.error(err);
            }
        }

        return ImmutableMap();
    }

    get acumulatedItems(): any[] {
        const state = this._state;

        if (state !== null) {
            try {
                return state.events.getIn(['collections', 'next-off-horseracing', 'acumulatedItems'])
                    ? state.events.getIn(['collections', 'next-off-horseracing', 'acumulatedItems'])
                    : [];
            } catch (err) {
                console.error(err);
            }
        }

        return [];
    }

    get items(): any[] {
        const state = this._state;

        if (state !== null) {
            try {
                return state.events.getIn(['collections', 'next-off-horseracing', 'items'])
                    ? state.events.getIn(['collections', 'next-off-horseracing', 'items'])
                    : [];
            } catch (err) {
                console.error(err);
            }
        }

        return [];
    }

    get allEvents(): any[] {
        const state = this._state;

        if (state !== null) {
            try {
                return state.events.get('items') ? state.events.get('items') : [];
            } catch (err) {
                console.error(err);
            }
        }

        return [];
    }

    get eventsListIds(): number[] {
        const state = this._state;

        if (state !== null) {
            try {
                if (state.events.get('items')) {
                    const eventsIds: Set<number> = new Set();

                    state.events.get('items').forEach((event: ImmutableMap<string, any>) => {
                        if (event && event.get('id')) {
                            eventsIds.add(event.get('id'));
                        }
                    });

                    return Array.from(eventsIds);
                }

                return [];
            } catch (err) {
                console.error(err);
            }
        }

        return [];
    }

    get sportsItems(): ImmutableMap<string, SportModel> {
        const state = this.state;

        return state !== null
            ? ImmutableMap(Object.entries(state.sports.getIn(['sports', 'items'], ImmutableMap()).toJS()))
            : ImmutableMap();
    }

    get competitionsItemsRecord(): Record<string, CompetitionType> {
        const competitionList = this.getFrom('competitions', (state) => state.get('items'), decodeCompetitionList, {});

        const outMap: Record<string, CompetitionType> = {};

        for (const item of Object.values(competitionList)) {
            const { id, name, displayOrder, tags } = item;
            const modifyItem: CompetitionType = {
                id,
                name,
                displayOrder: typeof displayOrder === 'number' ? displayOrder : parseInt(displayOrder, 10),
                tags,
            };

            outMap[modifyItem.id] = modifyItem;
        }

        return outMap;
    }

    get competitionsItems(): Map<string, CompetitionViewType> {
        const competitionsMap: Map<string, CompetitionViewType> = new Map();

        for (const [id, competitionsItemsRecord] of Object.entries(this.competitionsItemsRecord)) {
            competitionsMap.set(id, {
                id: competitionsItemsRecord.id.toString(),
                name: competitionsItemsRecord.name,
                displayOrder: competitionsItemsRecord.displayOrder,
            });
        }

        return competitionsMap;
    }

    get competitionItems(): List<ImmutableMap<string, any>> {
        const items = this.state?.competitions.getIn(['items'], List());

        return !isEmpty(items) ? items : List();
    }

    get normalizedCompetitionLocations(): NestedItem[] {
        const data = this.competitionLocations;
        const prepared: NestedItem[] = [];

        for (const key in data) {
            const value = data[key];

            let eventInCountry = 0;
            let countryId: string | null = null;
            let locationKey: string | null = null;
            let locationLabel: string | null = null;
            let competitions = 0;
            let sport: string | null = null;
            const childs: LinkItemEl[] = [];

            for (const elem of value) {
                sport = get(elem, 'sport');
                const { tagSelector, labelSelector } = getCompetitionLocation(sport);
                const parsedTotal = parseInt(String(elem.total)) || 0;

                eventInCountry += parsedTotal;
                countryId = get(elem, tagSelector);
                locationKey = get(elem, tagSelector);
                locationLabel = get(elem, labelSelector);
                competitions += 1;

                const link: LinkItemEl = {
                    id: elem.id,
                    eventNumber: parsedTotal,
                    elem,
                };

                childs.push(link);
            }

            const nested = {
                countryId: countryId as string,
                eventNumber: eventInCountry,
                competitions: competitions,
                children: childs,
                key,
                uuid: uuidv4(),
                sport,
                locationKey: locationKey,
                locationLabel,
                label: String(locationLabel),
            } satisfies NestedItem;

            prepared.push(nested);
        }

        prepared.sort((a, b) => b.eventNumber - a.eventNumber);

        const getIdentifier = (a: any) => (a.countryId !== undefined ? a.countryId : '');

        const byCustomCountry = Object.keys(LHN_SPORTS_ORDER)
            .map((sport) => prepared.filter((a) => sport === getIdentifier(a)))
            .reduce((acc, item) => {
                return item.length > 0 ? [...acc, item[0]] : acc;
            }, []);
        const filtered = prepared.filter((a) => !Object.keys(LHN_SPORTS_ORDER).includes(getIdentifier(a)));

        return [...byCustomCountry, ...filtered];
    }

    get competitionLocations(): CompetitionLocations {
        const competitionLocations = this.state?.sports.getIn(['competitionLocations', 'items'], List()).toJS();
        const sportId = get(competitionLocations, '0.sport');
        const { tagSelector } = getCompetitionLocation(sportId);

        return groupingByProp(tagSelector, competitionLocations);
    }

    get recentlyViewedSports(): string[] {
        const state = this.state;

        if (state !== null) {
            const recently = state.content.get('recentlyViewed', List());

            return recently.reduce((acc: string[], item: ImmutableMap<string, any>) => {
                if (item.get('route') === RouteName.Sport) {
                    return [...acc, item.getIn(['params', 'id'])];
                }

                return acc;
            }, []);
        }

        return [];
    }

    get state(): null | ReduxStateType {
        return this._state;
    }

    // ------------------- move to account ----------------------------

    get userId(): number | null {
        const state = this._state;

        if (state !== null) {
            try {
                if (state.account.get('authenticated')) {
                    if (state.account.getIn(['data', 'id'])) {
                        return state.account.getIn(['data', 'id']);
                    }
                }

                return null;
            } catch (err) {
                console.error(err);
            }
        }

        return null;
    }

    get userCountry(): string | null {
        const state = this._state;

        if (state !== null) {
            try {
                if (state.account.get('authenticated')) {
                    if (state.account.getIn(['data', 'country'])) {
                        return state.account.getIn(['data', 'country']);
                    }
                }

                return null;
            } catch (err) {
                console.error(err);
            }
        }

        return null;
    }

    // ------------------- move to account ----------------------------

    getSportName(sportId: string): string | null {
        const state = this._state;

        if (state !== null) {
            try {
                return state.sports.getIn(['all', 'items', sportId, 'name'], null);
            } catch (err) {
                console.error(err);
            }
        }

        return null;
    }

    getSport(sportId: string): SportModel | null {
        if (isNull(this.state)) {
            return null;
        }

        return this.state.sports.getIn(['sports', 'items', sportId], null);
    }

    get competitionIcons(): List<ImmutableMap<string, unknown>> {
        if (isNull(this.state)) {
            return List();
        }

        if (isEmpty(this.state.content) || isNil(this.state.content)) {
            return List();
        }

        return this.state.content.getIn(['icons', IconCategory.Competitions, 'items'], List());
    }

    get competitionLocationIcons(): List<ImmutableMap<string, unknown>> {
        return this.state?.content.getIn(['icons', IconCategory.CompetitionLocations, 'items'], List());
    }
}
