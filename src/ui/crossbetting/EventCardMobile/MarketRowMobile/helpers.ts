import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';

import { DEFAULT_DECIMAL } from 'src/utils/constants';
import { SelectionIdentifier } from 'src/common/enums';
import type { SelectionGroup } from 'src/common/types/selection';
import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';
import { isHandicap } from 'src/common/helpers/selection';

export const formatHandicapPrice = (line: number): string => {
    if (line === 0) {
        return '0';
    }

    const formattedLine = line.toFixed(DEFAULT_DECIMAL);

    return line > 0 ? `+${formattedLine}` : formattedLine;
};

const getSelectionByIdentifier = (
    selection: SelectionModel,
    identifier: SelectionIdentifier,
): SelectionModel | null => {
    if (identifier === selection.identifier) {
        return selection;
    }

    return null;
};

export const getSelection = (selections: SelectionModel[]) => {
    const { A: away = [], H: home = [], O: over = [], U: under = [] } = groupBy(selections, 'identifier');
    const initSelection = {
        homeSelection: !isEmpty(home) ? home[0] : !isEmpty(over) ? over[0] : null,
        awaySelection: !isEmpty(away) ? away[0] : !isEmpty(under) ? under[0] : null,
        drawSelection: null,
        overSelection: null,
        isHandicap: false,
    };

    return selections.reduce<SelectionGroup<SelectionModel>>((acc, selection) => {
        const drawSelection = getSelectionByIdentifier(selection, SelectionIdentifier.Draw);
        const overSelection = getSelectionByIdentifier(selection, SelectionIdentifier.Over);

        return {
            ...acc,
            ...(!isNull(drawSelection) ? { drawSelection } : {}),
            ...(!isNull(overSelection) ? { overSelection } : {}),
            isHandicap: isHandicap(selection),
        };
    }, initSelection);
};
