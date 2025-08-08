import { computed, makeObservable } from 'mobx';
import { getRecoil } from 'recoil-nexus';

import { betslipSelectionSelectorFamily } from '@solo-betslip/store/selectors/selections';

import type { ModelBoxContext } from 'src/appState/models/ModelWrapper';

import type { EventModel } from '../EventModel';
import type { MarketModel } from '../MarketModel';

import { getPriceForView, isSelected, isSuspended } from './helpers';
import type { SelectionModel } from './SelectionModel';
import type { ForViewResult } from './types';

export class SelectionViewModel {
    readonly modelBoxContext: ModelBoxContext;
    readonly event: EventModel;
    readonly market: MarketModel;
    readonly selection: SelectionModel;
    readonly sp: boolean | undefined;

    constructor(
        modelBoxContext: ModelBoxContext,
        event: EventModel,
        market: MarketModel,
        selection: SelectionModel,
        sp: boolean | undefined,
    ) {
        makeObservable(this, {
            forView: computed.struct,
            price: computed.struct,
            suspended: computed.struct,
            state: computed.struct,
            selected: computed.struct,
        });

        this.modelBoxContext = modelBoxContext;

        this.event = event;

        this.market = market;

        this.selection = selection;

        this.sp = sp;
    }

    get forView(): ForViewResult {
        const isSPOnly = this.market.spOnly;
        const started = this.event.timeSettingsStarted;
        const tradedInPlay = this.event.timeSettingsTradedInPlay && this.market.tradedInPlay;

        const sp = this.sp;
        const selection = this.selection;
        const betslipSelection = getRecoil(betslipSelectionSelectorFamily(this.selection.id));
        const priceType = betslipSelection?.priceType;

        const suspended = isSuspended({ selection, sp, started, isSPOnly, tradedInPlay });
        const price = getPriceForView({ selection, sp, started, isSPOnly, priceType });
        const selected = isSelected(priceType, price);

        return {
            price,
            selected,
            suspended,
            state: selection.state,
        };
    }

    get price(): ForViewResult['price'] {
        return this.forView.price;
    }

    get suspended(): boolean {
        return this.forView.suspended;
    }

    get state(): string | undefined {
        return this.forView.state;
    }

    get selected(): boolean {
        return this.forView.selected;
    }
}
