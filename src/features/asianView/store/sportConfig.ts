import { atom } from 'jotai';

import { atomWithQueryCbk, jotaiCallback } from '@solo-utils/jotai';

import { SportType } from 'src/common/enums';

import { CmsService } from '../api/cms/services';
import type { AsianViewSportConfig } from '../api/cms/types';
import { queryKeys } from '../api/queryKeys';

import { lhnSportAtom } from './lhn';
import { aggregateSportsAtomWithQuery } from './sports';

type SportConfigs = {
    [key in SportType]?: AsianViewSportConfig | null;
};

export const sportConfigsAtom = atom<SportConfigs>({ [SportType.Football]: null });

export const sportConfigAtom = atom<AsianViewSportConfig | null>((get) => {
    const lhnSport = get(lhnSportAtom);

    return get(sportConfigsAtom)[lhnSport] ?? null;
});

const onSportConfigQuerySuccess = jotaiCallback(({ get, set }) => (sportConfig: AsianViewSportConfig) => {
    const lhnSport = get(lhnSportAtom);

    set(sportConfigsAtom, (state) => ({ ...state, [lhnSport]: sportConfig }));
});

export const sportConfigAtomWithQuery = atomWithQueryCbk((get) => {
    const lhnSport = get(lhnSportAtom);
    const sportConfig = get(sportConfigAtom);
    const { isFetching: isFetchingSports } = get(aggregateSportsAtomWithQuery);

    return {
        queryKey: queryKeys.cms.getAsianViewSportConfig(lhnSport).queryKey,
        queryFn: async () => CmsService.getAsianViewSportConfig(lhnSport),
        gcTime: 0,
        enabled: !isFetchingSports && sportConfig === null,
        onSuccess: onSportConfigQuerySuccess,
    };
});
