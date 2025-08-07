import * as t from 'io-ts';

import { buildValidator } from '@sc-webapi/mobx-utils/buildValidator';

import type { ServerTimeState } from 'src/appState/models/ServerTimeState';

import type { ReduxState } from '../redux/ReduxState';

import { MobxValueLite } from './MobixValueLite';
import type { EventModel } from './models/EventModel';
import type { MarketModel } from './models/MarketModel';
import type { SelectionModel } from './models/SelectionModel/SelectionModel';

const RawModelIO = t.record(t.string, t.any);
export type RawModelType = t.TypeOf<typeof RawModelIO>;

const decodeRawModel = buildValidator('RawModelIO', RawModelIO);

export function isObject(item: unknown): item is Record<string, unknown> {
    return item != null && typeof item === 'object' && !Array.isArray(item);
}

export function mergeDeep(current: Record<string, unknown>, diff: Record<string, unknown>): Record<string, unknown> {
    const out: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(current)) {
        if (diff[key] === undefined) {
            out[key] = value;
        }
    }

    for (const [key, value] of Object.entries(diff)) {
        const currentValue = current[key];

        if (isObject(value) && isObject(currentValue)) {
            out[key] = mergeDeep(currentValue, value);
        } else {
            out[key] = value;
        }
    }

    return out;
}

interface ModelBase {
    getRawData: () => RawModelType; //TODO - to remove
}

export class ModelWrapper<Model extends ModelBase> {
    constructor(
        readonly model: Model,
        readonly setData: (data: Record<string, unknown>) => void,
    ) {}
}

export interface ModelBoxContext {
    serverTime: ServerTimeState;
    reduxState: ReduxState;
    getEvent: (id: number) => EventModel | null;
    getMarket: (id: number) => MarketModel | null;
    getSelection: (id: number) => SelectionModel | null;
}

export class ModelBox<Model extends ModelBase> {
    value: MobxValueLite<ModelWrapper<Model> | null>;

    constructor(
        private readonly id: number,
        private readonly modelBoxContext: ModelBoxContext,
        private readonly createModel: (context: ModelBoxContext, data: Record<string, unknown>) => ModelWrapper<Model>,
    ) {
        this.value = new MobxValueLite<ModelWrapper<Model> | null>(null);
    }

    setData(data: RawModelType) {
        const dataDecode = decodeRawModel(data);

        if (dataDecode instanceof Error) {
            console.error(`Error data for ${this.id}`);

            console.error(dataDecode);

            return;
        }

        const currentModel = this.value.get();

        if (currentModel === null) {
            this.value.set(this.createModel(this.modelBoxContext, dataDecode));
        } else {
            currentModel.setData(mergeDeep(currentModel.model.getRawData(), dataDecode));
        }
    }

    getModel(): Model | null {
        const innerData = this.value.get();

        if (innerData === null) {
            return null;
        }

        return innerData.model;
    }
}
