import isNull from 'lodash/isNull';

import type { Notification } from 'src/appState/redux/types';

export const filterByClientLabel = (popup: Notification) =>
    isNull(popup.clientLabel) || popup.clientLabel === window.$platformId;
