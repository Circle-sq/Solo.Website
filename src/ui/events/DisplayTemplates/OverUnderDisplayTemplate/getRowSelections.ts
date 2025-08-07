import uniqBy from 'lodash/uniqBy';
import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';

export enum SELECTION_ROW_IDENTIFIERS {
    LINE = '-',
    OVER = 'O',
    UNDER = 'U',
}

export const getRowSelections = (
    selections: SelectionModel[],
    identifier: SELECTION_ROW_IDENTIFIERS,
): SelectionModel[] => {
    switch (identifier) {
        case SELECTION_ROW_IDENTIFIERS.LINE:
            return uniqBy(selections, 'line');

        case SELECTION_ROW_IDENTIFIERS.OVER:
            return selections.filter(
                (selection: SelectionModel) => selection.identifier === SELECTION_ROW_IDENTIFIERS.OVER,
            );

        case SELECTION_ROW_IDENTIFIERS.UNDER:
            return selections.filter(
                (selection: SelectionModel) => selection.identifier === SELECTION_ROW_IDENTIFIERS.UNDER,
            );

        default:
            return [];
    }
};
