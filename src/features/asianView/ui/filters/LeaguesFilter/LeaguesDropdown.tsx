import { useAtom, useAtomValue } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';
import includes from 'lodash/includes';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import { useCallback, useMemo, useState } from 'react';

import { useJotaiCallback } from '@solo-utils/jotai';

import { getCompetitionLocationInfoFromTags } from 'src/appState/utils';
import { I18n } from 'src/ui/common/Language/I18n';
import { EMPTY_STRING } from 'src/utils/constants';

import type { CompetitionsWithEventsResponse } from '../../../api/competitions/types';
import { queryKeys } from '../../../api/queryKeys';
import { competitionLocationsAtomWithQuery } from '../../../store/competitionLocations';
import { competitionIdsFilterAtom } from '../../../store/filters';
import { competitionsQueryKeyParamsAtom } from '../../../store/keyParams';
import { toggleCompetitionId } from '../helpers';
import { S_ApplyButton, S_Footer, S_LeaguesContent } from '../styled';

import DropdownHeader from './DropdownHeader';
import LeaguesCompetitionItem from './LeaguesCompetitionItem';

interface VisibleCompetition {
    id: number;
    label: string;
}

const LeaguesDropdown = ({ onClose }: { onClose: () => void }) => {
    const [competitionIdsFilter, setCompetitionIdsFilter] = useAtom(competitionIdsFilterAtom);
    const { data: competitionLocations } = useAtomValue(competitionLocationsAtomWithQuery);

    const [selectedCompetitions, setSelectedCompetitions] = useState(competitionIdsFilter);
    const [searchValue, setSearchValue] = useState(EMPTY_STRING);

    const changeSearchValue = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const visibleCompetitionLocations = useMemo(() => {
        const sortedCompetitions = orderBy(competitionLocations?.results.elements, 'displayOrder', 'desc');

        return sortedCompetitions.reduce((acc: VisibleCompetition[], { id, name, tags }) => {
            const { categoryLabel } = getCompetitionLocationInfoFromTags(tags);
            const label = `${categoryLabel} - ${name}`;

            if (searchValue === EMPTY_STRING || includes(label.toLowerCase(), searchValue.toLowerCase())) {
                acc.push({ id, label });
            }

            return acc;
        }, []);
    }, [searchValue, competitionLocations]);

    const selectAll = useJotaiCallback(
        ({ get }) =>
            (isChecked: boolean) => {
                const queryClient = get(queryClientAtom);
                const keyParams = get(competitionsQueryKeyParamsAtom);
                const { queryKey } = queryKeys.competitions.searchWithEvents(keyParams);

                if (isChecked) {
                    setSelectedCompetitions([]);
                } else {
                    const competitionLocations = queryClient.getQueryData<CompetitionsWithEventsResponse>(queryKey);
                    const competitionIds = map(competitionLocations?.results.elements, 'id');

                    setSelectedCompetitions(sortBy(competitionIds));
                }
            },
        [],
    );

    const toggleCompetition = useCallback((id: number) => {
        setSelectedCompetitions(toggleCompetitionId(id));
    }, []);

    const onApply = () => {
        setCompetitionIdsFilter(selectedCompetitions);
        onClose();
    };

    return (
        <>
            <DropdownHeader
                searchValue={searchValue}
                competitionsCount={selectedCompetitions.length}
                changeSearchValue={changeSearchValue}
                selectAll={selectAll}
            />

            <S_LeaguesContent>
                {visibleCompetitionLocations.map((competition) => {
                    const isSelected = includes(selectedCompetitions, competition.id);

                    return (
                        <LeaguesCompetitionItem
                            key={competition.id}
                            competitionId={competition.id}
                            label={competition.label}
                            isSelected={isSelected}
                            toggleCompetition={toggleCompetition}
                        />
                    );
                })}
            </S_LeaguesContent>

            <S_Footer>
                <div onClick={onClose}>
                    <I18n langKey='account.reset-password.cancel.label' defaultText='Cancel' />
                </div>

                <S_ApplyButton onClick={onApply}>
                    <I18n langKey='asianView.buttons.apply' defaultText='Apply' />
                </S_ApplyButton>
            </S_Footer>
        </>
    );
};

export default LeaguesDropdown;
