import { useAtomValue } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';
import { RESET } from 'jotai/utils';
import type { MouseEvent } from 'react';

import { useJotaiCallback } from '@solo-utils/jotai';

import { I18n } from 'src/ui/common/Language/I18n';

import { queryKeys } from '../../../api/queryKeys';
import type { AggregatedSport } from '../../../api/sports/types';
import { LHNTimeTab } from '../../../enums';
import { getFirstSport } from '../../../helpers';
import LiveDotIcon from '../../../icons/LiveDotIcon';
import { timePeriodFilterAtom } from '../../../store/filters';
import { lhnSportAtom, lhnTimeTabAtom } from '../../../store/lhn';
import { sportTabs } from '../configs';

import { S_LiveDotIconWrapper, S_SportTab, S_SportTabs } from './styled';

const SportTabs = () => {
    const lhnTimeTab = useAtomValue(lhnTimeTabAtom);

    const changeTimeTab = useJotaiCallback(
        ({ get, set }) =>
            ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
                const timeTab = currentTarget.getAttribute('data-action') as LHNTimeTab;
                const lhnSport = get(lhnSportAtom);

                if (timeTab !== LHNTimeTab.Upcoming) {
                    set(timePeriodFilterAtom, RESET);
                }

                const { queryKey } = queryKeys.sports.aggregate(timeTab, lhnSport);
                const queryClient = get(queryClientAtom);
                const sports = queryClient.getQueryData<AggregatedSport[]>(queryKey) ?? [];

                set(lhnTimeTabAtom, timeTab);
                set(lhnSportAtom, (sport) => getFirstSport(sports, sport));
            },
        [],
    );

    return (
        <S_SportTabs>
            {sportTabs.map(({ tab, langKey, defaultText, testId }) => (
                <S_SportTab
                    key={testId}
                    data-testid={testId}
                    data-action={tab}
                    isSelected={lhnTimeTab === tab}
                    onClick={changeTimeTab}
                >
                    {tab === LHNTimeTab.Live && (
                        <S_LiveDotIconWrapper>
                            <LiveDotIcon />
                        </S_LiveDotIconWrapper>
                    )}

                    <I18n langKey={langKey} defaultText={defaultText} />
                </S_SportTab>
            ))}
        </S_SportTabs>
    );
};

export default SportTabs;
