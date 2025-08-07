import type { SelectionViewModel } from 'src/appState/models/models/SelectionModel/SelectionViewModel';
import type { ModelsState } from 'src/appState/models/ModelsState';
import { PriceType } from 'src/common/types/selectionPrice';

import type { Leg, MultiBetLeg } from '../api/types/leg';

export const selectionView = (
    models: ModelsState,
    selectionId?: number | string,
    isSP?: boolean,
): SelectionViewModel | null => {
    if (selectionId !== undefined) {
        const selectionModel = models.getSelection(Number(selectionId));

        if (selectionModel !== null) {
            return selectionModel.forView(selectionModel.sp ?? isSP);
        }
    }

    return null;
};

export const getLegModelView = (models: ModelsState, leg: Leg): SelectionViewModel | null => {
    const selectionId = leg.selectionId ?? leg.id;
    const isSP = leg.priceType === PriceType.SP;

    return selectionView(models, selectionId, isSP);
};

export const getMultiBetLegModelsView = (
    models: ModelsState,
    { priceType, marketsAndSelections = [] }: MultiBetLeg,
): (SelectionViewModel | null)[] => {
    const isSP = priceType === PriceType.SP;

    return marketsAndSelections.map(({ selection }) => selectionView(models, selection.id, isSP));
};
