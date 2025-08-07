import isEmpty from 'lodash/isEmpty';
import getIn from 'lodash/get';
import { selector, selectorFamily } from 'recoil';
import { selectorFromReselect } from 'redux-to-recoil';

import { IconCategory, RequestStatus } from 'src/common/enums';
import { contentIconsSelector } from 'src/modules/content/selectors/icons';
import type { CategoryIcons } from 'src/modules/content/types';

export const iconsSelector = selectorFromReselect(contentIconsSelector);

export const competitionLocationIconsSelector = selector<CategoryIcons>({
    key: 'competitionLocationIconsSelector',
    get: ({ get }) => {
        const icons = get(iconsSelector);

        return getIn(icons, [IconCategory.CompetitionLocations, 'items'], {});
    },
});

export const competitionLocationIconUrlSelectorFamily = selectorFamily<
    string | undefined,
    { tag: string; category: string }
>({
    key: 'competitionLocationIconUrlSelectorFamily',
    get:
        ({ tag, category }) =>
        ({ get }) => {
            const competitionLocationIcons = get(competitionLocationIconsSelector);

            if (tag == null || category == null) {
                return;
            }

            return getIn(competitionLocationIcons, [`${tag}-${category}`, 'url']);
        },
});

export const sportIconsSelector = selector<CategoryIcons>({
    key: 'sportIconsSelector',
    get: ({ get }) => {
        const icons = get(iconsSelector);

        return getIn(icons, [IconCategory.Sports, 'items'], {});
    },
});

export const sportIconUrlSelectorFamily = selectorFamily<string | undefined, string>({
    key: 'sportIconUrlSelectorFamily',
    get:
        (sportId) =>
        ({ get }) => {
            const sportIcons = get(sportIconsSelector);

            if (!sportId) {
                return;
            }

            return getIn(sportIcons, [sportId, 'url']);
        },
});

export const isSportIconsInitialLoadingSelector = selector<boolean>({
    key: 'isSportIconsInitialLoadingSelector',
    get: ({ get }) => {
        const icons = get(iconsSelector);
        const sportIcons = getIn(icons, IconCategory.Sports, { status: RequestStatus.Progress, items: {} });

        const isSportIconsEmpty = isEmpty(sportIcons.items);
        const isProgress = sportIcons.status === RequestStatus.Progress;

        return isSportIconsEmpty && isProgress;
    },
});
