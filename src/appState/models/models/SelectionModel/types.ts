import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';
import type { PriceType, PriceForView } from 'src/common/types/selectionPrice';

export interface SuspendedParams {
    selection: SelectionModel;
    sp?: boolean;
    started: boolean;
    tradedInPlay: boolean;
    isSPOnly: boolean;
}

export interface PriceForViewParams {
    selection: SelectionModel;
    started: boolean;
    isSPOnly: boolean;
    priceType?: PriceType;
    sp?: boolean;
}

export interface ForViewResult {
    price?: PriceForView;
    suspended: boolean;
    selected: boolean;
    state: string | undefined;
}
