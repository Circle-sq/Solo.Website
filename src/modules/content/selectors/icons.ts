import get from 'lodash/get';
import { createSelector } from 'reselect';

import type { ReduxState } from 'src/appState/redux/types';
import type { IconCategory } from 'src/common/enums';
import { contentJsSelector } from 'src/modules/content/selectors';
import type { ContentIcons } from 'src/modules/content/types';

export const contentIconsSelector = createSelector(contentJsSelector, (content) => content.icons);

export const categoryIconsSelector = createSelector(
    [contentIconsSelector, (_state: ReduxState, category: IconCategory): IconCategory => category],
    (icons, category): ContentIcons['items'] => get(icons, [category, 'items']),
);

export const iconUrlSelector = createSelector(
    [
        (state: ReduxState, { category }: { category: IconCategory }): ContentIcons['items'] =>
            categoryIconsSelector(state, category),
        (_state: ReduxState, { platformObjectId }: { platformObjectId: string | null }) => platformObjectId,
    ],
    (icons, platformObjectId) => {
        if (!platformObjectId) {
            return null;
        }

        return get(icons, [platformObjectId, 'url'], null);
    },
);
