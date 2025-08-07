import get from 'lodash/get';
import { useCallback } from 'react';

import { IconCategory } from 'src/common/enums';

import { useGetCategoryIconsApi } from './queries';
import type { CategoryIcons } from './types';

export const useCompetitionIcons = <T = CategoryIcons>(select?: (data: CategoryIcons) => T) => {
    return useGetCategoryIconsApi(IconCategory.Competitions, select);
};

export const useCompetitionIconUrlQuerySelector = (platformObjectId: string | number) => {
    const { data } = useCompetitionIcons<string | undefined>(
        useCallback((icons: CategoryIcons) => get(icons, [platformObjectId, 'url']), [platformObjectId]),
    );

    return data;
};

export const useCompetitionLocationIcons = <T = CategoryIcons>(select?: (data: CategoryIcons) => T) => {
    return useGetCategoryIconsApi(IconCategory.CompetitionLocations, select);
};

export const useCompetitionLocationIconUrlQuerySelector = (tag: string | undefined, category: string | undefined) => {
    const { data } = useCompetitionLocationIcons<string | undefined>(
        useCallback(
            (icons: CategoryIcons) => {
                if (tag == null || category == null) {
                    return;
                }

                return get(icons, [`${tag}-${category}`, 'url']);
            },
            [tag, category],
        ),
    );

    return data;
};

export const useSportIcons = <T = CategoryIcons>(select?: (data: CategoryIcons) => T) => {
    return useGetCategoryIconsApi(IconCategory.Sports, select);
};

export const useSportIconUrlQuerySelector = (sportId: string) => {
    const { data } = useSportIcons<string | undefined>(
        useCallback((icons: CategoryIcons) => get(icons, [sportId, 'url']), [sportId]),
    );

    return data;
};
