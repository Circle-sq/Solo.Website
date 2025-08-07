import { useQueries, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { IconCategory } from 'src/common/enums';

import { queryKeys } from '../queryKeys';

import { IconsService } from './services';
import type { CategoryIcons } from './types';

const iconsQuery =
    <T = CategoryIcons>(select?: (data: CategoryIcons) => T) =>
    (category: IconCategory): UseQueryOptions<CategoryIcons, unknown, T> => ({
        queryKey: queryKeys.icons.getByCategory(category).queryKey,
        queryFn: async () => IconsService.getByCategory(category),
        staleTime: Infinity,
        select,
    });

export const useGetCategoryIconsApi = <T = CategoryIcons>(
    category: IconCategory,
    select?: (data: CategoryIcons) => T,
) => {
    return useQuery(iconsQuery(select)(category));
};

export const useGetCategoriesIconsApi = (categories: IconCategory[]) => {
    return useQueries({ queries: categories.map(iconsQuery()) });
};
