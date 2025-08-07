import type { Map as ImmutableMap } from 'immutable';
import { createSelector } from 'reselect';

import type { ReduxState } from 'src/appState/redux/types';
import type { Content } from 'src/modules/content/types';

export const contentSelector = (state: ReduxState): ImmutableMap<string, Content> => state.content;

export const contentJsSelector = createSelector(contentSelector, (content) => content.toJS() as Content);
