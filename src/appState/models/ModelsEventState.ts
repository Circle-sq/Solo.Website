import { action, makeObservable } from 'mobx';

import { assertNever } from '@sc-webapi/mobx-utils/assertNever';
import { MobxMapAutoNew } from '@sc-webapi/mobx-utils/MobxMapAutoNew';

import { ServerTimeState } from 'src/appState/models/ServerTimeState';

import type { ReduxState } from '../redux/ReduxState';

import { CompetitionModel } from './models/CompetitionModel';
import { EventModel } from './models/EventModel';
import { MarketModel } from './models/MarketModel';
import { SelectionModel } from './models/SelectionModel/SelectionModel';
import type { RawModelType, ModelBoxContext } from './ModelWrapper';
import { ModelBox } from './ModelWrapper';

interface RefreshEvent {
    type: 'event';
    eventId: number;
    data: RawModelType;
}

interface RefreshMarket {
    type: 'market';
    marketId: number;
    data: RawModelType;
}

interface RefreshSelection {
    type: 'selection';
    selectionId: number;
    data: RawModelType;
}

interface RefreshCompetition {
    type: 'competition';
    competitionId: number;
    data: RawModelType;
}

export type RefreshModel = RefreshEvent | RefreshMarket | RefreshSelection | RefreshCompetition;

export class ModelsEventState {
    private readonly selectionMap: MobxMapAutoNew<number, ModelBox<SelectionModel>>;
    private readonly marketMap: MobxMapAutoNew<number, ModelBox<MarketModel>>;
    private readonly eventMap: MobxMapAutoNew<number, ModelBox<EventModel>>;
    private readonly competitionMap: MobxMapAutoNew<number, ModelBox<CompetitionModel>>;

    private subscribeTimer: NodeJS.Timeout | null = null;
    private toRefresh: RefreshModel[];

    constructor(reduxState: ReduxState) {
        makeObservable<ModelsEventState, 'updateModels' | 'updateItem'>(this, {
            updateModels: action,
            updateItem: action,
        });

        const serverTime = new ServerTimeState();

        const modelBoxContext: ModelBoxContext = {
            serverTime: serverTime,
            reduxState: reduxState,
            getEvent: this.getEvent,
            getMarket: this.getMarket,
            getSelection: this.getSelection,
        };

        this.selectionMap = new MobxMapAutoNew((id: number): ModelBox<SelectionModel> => {
            return new ModelBox(id, modelBoxContext, SelectionModel.create);
        });

        this.marketMap = new MobxMapAutoNew((id: number): ModelBox<MarketModel> => {
            return new ModelBox(id, modelBoxContext, MarketModel.create);
        });

        this.eventMap = new MobxMapAutoNew((id): ModelBox<EventModel> => {
            return new ModelBox(id, modelBoxContext, EventModel.create);
        });

        this.competitionMap = new MobxMapAutoNew((id): ModelBox<CompetitionModel> => {
            return new ModelBox(id, modelBoxContext, CompetitionModel.create);
        });

        this.toRefresh = [];
    }

    public refresh(list: RefreshModel[]) {
        for (const item of list) {
            this.toRefresh.push(item);
        }

        if (this.subscribeTimer !== null) {
            clearTimeout(this.subscribeTimer);
        }

        this.subscribeTimer = setTimeout(() => {
            this.subscribeTimer = null;

            this.updateModels();
        }, 0);
    }

    private updateModels() {
        const toRefresh = this.toRefresh;

        this.toRefresh = [];

        for (const item of toRefresh) {
            this.updateItem(item);
        }
    }

    private updateItem(item: RefreshModel) {
        if (item.type === 'event') {
            this.eventMap.get(item.eventId).setData(item.data);

            return;
        }

        if (item.type === 'market') {
            this.marketMap.get(item.marketId).setData(item.data);

            return;
        }

        if (item.type === 'selection') {
            this.selectionMap.get(item.selectionId).setData(item.data);

            return;
        }

        if (item.type === 'competition') {
            this.competitionMap.get(item.competitionId).setData(item.data);

            return;
        }

        return assertNever('ModelsEvent.updateItem', item);
    }

    getSelection = (id: number): SelectionModel | null => {
        return this.selectionMap.get(id).getModel();
    };

    getMarket = (id: number): MarketModel | null => {
        return this.marketMap.get(id).getModel();
    };

    getEvent = (id: number): EventModel | null => {
        return this.eventMap.get(id).getModel();
    };

    getCompetitionModel(id: number): CompetitionModel | null {
        return this.competitionMap.get(id).getModel();
    }
}
