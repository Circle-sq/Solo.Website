import includes from 'lodash/includes';
import isNull from 'lodash/isNull';
import isNil from 'lodash/isNil';

import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';

export const isHandicap = (selection: SelectionModel | null): boolean => {
    if (isNull(selection) || isNil(selection.line)) {
        return false;
    }

    const { line } = selection;

    return includes(line, '+') || includes(line, '-') || line === '0';
};
