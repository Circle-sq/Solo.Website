import compact from 'lodash/compact';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';

import type { ModelService } from '@solo-features/subscription-manager/ModelSubscribeBridgeService';

import { ReduxState } from '../redux/ReduxState';

import { decodeNumberId } from './decodeNumberId';
import type { CompetitionModel } from './models/CompetitionModel';
import type { EventModel } from './models/EventModel';
import type { MarketModel } from './models/MarketModel';
import type { SelectionModel } from './models/SelectionModel/SelectionModel';
import type { RefreshModel } from './ModelsEventState';
import { ModelsEventState } from './ModelsEventState';

/**
 * description: ModelState implements ModelService getEvent and getMarket methods
 * @implements ModelService
 */
export class ModelsState implements ModelService<MarketModel, EventModel> {
    private readonly modelsEvent: ModelsEventState;

    constructor(reduxState: ReduxState) {
        this.modelsEvent = new ModelsEventState(reduxState);
    }

    public refreshEventModels(list: RefreshModel[]) {
        this.modelsEvent.refresh(list);
    }

    getSelection(idIn: number): SelectionModel | null {
        const id = decodeNumberId(idIn);

        if (id === null) {
            return null;
        }

        return this.modelsEvent.getSelection(id);
    }

    getMarket(idIn: number): MarketModel | null {
        const id = decodeNumberId(idIn);

        if (id === null) {
            return null;
        }

        return this.modelsEvent.getMarket(id);
    }

    getVisibleMarkets(marketIds: number[]): MarketModel[] | null {
        if (isEmpty(marketIds)) {
            return null;
        }

        return filter(compact(map(marketIds, (id) => this.modelsEvent.getMarket(id))), { visible: true });
    }

    getEvent(idIn?: number): EventModel | null {
        if (isUndefined(idIn)) {
            return null;
        }
        const id = decodeNumberId(idIn);

        if (id === null) {
            return null;
        }

        return this.modelsEvent.getEvent(id);
    }

    hasEvent(id: number | null): boolean {
        if (id === null) {
            return false;
        }

        return this.modelsEvent.getEvent(Number(id)) !== null;
    }

    getCompetitionModel(idIn: number): CompetitionModel | null {
        const id = decodeNumberId(idIn);

        if (id === null) {
            return null;
        }

        return this.modelsEvent.getCompetitionModel(id);
    }

    static createForContext(): ModelsState {
        return new ModelsState(ReduxState.createForContext());
    }
}
