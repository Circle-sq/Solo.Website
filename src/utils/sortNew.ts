import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';

export enum SortCriteriaType {
    // Careful, these string keywords exist in business DOMAIN/api
    PRICE = 'by-price',
    DISPLAY_ORDER = 'by-display-order',
    SELECTION_NAME = 'by-selection-name',
    TAG = 'by-tag',
    CREATION = 'by-creation',
}

export const price = (selection: SelectionModel): string | number =>
    selection.resultType === 'void'
        ? 100000
        : selection.templateId === 'NG'
        ? 99999
        : selection.templateId === 'unnamed-favourite'
        ? 99999
        : (selection.price && selection.price.d) || 99998;

const isCriteria = (data: string): data is SortCriteriaType => {
    return (
        data === 'by-price' ||
        data === 'by-display-order' ||
        data === 'by-selection-name' ||
        data === 'by-tag' ||
        data === 'by-creation'
    );
};

export const sortSelectionsByCriteria = (selections: SelectionModel[], criteria: SortCriteriaType) => {
    //TODO - switch criteria to type SortCriteriaType
    if (!isCriteria(criteria)) {
        console.warn(`sortSelectionsByCriteria - unknown criteria ${criteria}`);

        return selections;
    }

    const SELECTIONS_SORTING = {
        [SortCriteriaType.PRICE]: (prev: SelectionModel, next: SelectionModel): number => {
            const pricePrev = price(prev);
            const priceNext = price(next);

            return pricePrev === priceNext
                ? SELECTIONS_SORTING['by-selection-name'](prev, next)
                : pricePrev < priceNext
                ? -1
                : 1;
        },
        [SortCriteriaType.DISPLAY_ORDER]: (prev: SelectionModel, next: SelectionModel): number => {
            const orderPrev = prev.displayOrder;
            const orderNext = next.displayOrder;

            return orderPrev === orderNext
                ? SELECTIONS_SORTING['by-selection-name'](prev, next)
                : prev.displayOrder > next.displayOrder
                ? -1
                : 1;
        },
        [SortCriteriaType.SELECTION_NAME]: (prev: SelectionModel, next: SelectionModel): number => {
            return prev.name > next.name ? 1 : -1;
        },
        [SortCriteriaType.TAG]: (prev: SelectionModel, next: SelectionModel): number => {
            const tagNamePrev = prev.identifier;
            const tagNameNext = next.identifier;

            // Undefined tags or tags without a correct identifier should be placed at the bottom
            // and sorted by the selection name
            const selectionIdentifierPrev = !tagNamePrev || tagNamePrev === '-' ? 99997 : tagNamePrev;
            const selectionIdentifierNext = !tagNameNext || tagNameNext === '-' ? 99997 : tagNameNext;

            return selectionIdentifierPrev === selectionIdentifierNext
                ? SELECTIONS_SORTING['by-selection-name'](prev, next)
                : selectionIdentifierPrev > selectionIdentifierNext
                ? 1
                : -1;
        },
        [SortCriteriaType.CREATION]: (prev: SelectionModel, next: SelectionModel): number => {
            return prev && next && prev.id - next.id;
        },
    };
    const sorted = selections.sort(SELECTIONS_SORTING[criteria]);

    // Move selections without a price at the end of the list
    const newList: SelectionModel[] = [];
    const noPriceSelections: SelectionModel[] = [];

    for (const item of sorted) {
        const price = item && item.price;

        if (price === undefined) {
            noPriceSelections.push(item);
        } else {
            newList.push(item);
        }
    }

    return newList.concat(noPriceSelections);
};
