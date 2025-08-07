import isEqual from 'lodash/isEqual';
import { memo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import ESoccerCompetitionGroupName from 'src/ui/events/EventGroupHeader/ESoccerCompetitionGroupName';
import ESoccerSportGroupName from 'src/ui/events/EventGroupHeader/ESoccerSportGroupName';
import {
    S_EventsCount,
    S_GroupNameWrapper,
    S_GroupSelections,
    S_HeaderGroup,
    S_SelectionColumnLabel,
} from 'src/ui/events/EventGroupHeader/styled';
import type { EventGroupHeaderProps } from 'src/ui/events/EventGroupHeader/types';
import { getSelectionIdentifierLabel, SPORT_TYPE } from 'src/utils/constants';

import ArrowIcon from './ArrowIcon';

const arePropsEqual = (prevProps: EventGroupHeaderProps, nextProps: EventGroupHeaderProps): boolean => {
    return (
        prevProps.hideChevron === nextProps.hideChevron &&
        prevProps.isOpen === nextProps.isOpen &&
        prevProps.eventsCount === nextProps.eventsCount &&
        prevProps.showSelections === nextProps.showSelections &&
        isEqual(prevProps.label, nextProps.label) &&
        isEqual(prevProps.selectionsSizes, nextProps.selectionsSizes) &&
        isEqual(prevProps.columnLabelsGroups, nextProps.columnLabelsGroups)
    );
};

const EventGroupHeaderESoccer = (props: EventGroupHeaderProps) => {
    const {
        columnLabelsGroups,
        eventsCount,
        hideChevron = false,
        categoryIconUrl,
        competitionIconUrl,
        label,
        onToggle,
        isOpen = false,
        selectionsSizes,
        showSelections,
        testId,
    } = props;

    const {
        router: { route },
        language: { getTranslation },
    } = useAppStateContext();

    const translatedLabels = getSelectionIdentifierLabel(getTranslation, String(SPORT_TYPE.football));

    let countryName = '';
    let competitionName = '';

    if (Array.isArray(label)) {
        [countryName, competitionName] = label;
    }

    const isCompetitionSelected = route?.name === RouteName.Competition;

    return (
        <S_HeaderGroup onClick={onToggle}>
            {!showSelections && (
                <S_GroupNameWrapper>
                    {isCompetitionSelected ? (
                        <ESoccerCompetitionGroupName
                            countryName={countryName}
                            competitionName={competitionName}
                            categoryIconUrl={categoryIconUrl}
                            competitionIconUrl={competitionIconUrl}
                        />
                    ) : (
                        <ESoccerSportGroupName
                            countryName={countryName}
                            competitionName={competitionName}
                            categoryIconUrl={categoryIconUrl}
                        />
                    )}
                    {eventsCount !== undefined && (
                        <S_EventsCount data-testid='eventsCount'>( {eventsCount} )</S_EventsCount>
                    )}
                </S_GroupNameWrapper>
            )}

            {isOpen &&
                showSelections &&
                columnLabelsGroups.map((group: string[], index: number) => (
                    <S_GroupSelections
                        key={`selections-${String(index)}`}
                        isAmericanSports={false}
                        isScoreboardSport={false}
                        cols={selectionsSizes[index]}
                    >
                        {group.map((name: string, key: number) => {
                            const columnLabel = translatedLabels[name] !== undefined ? translatedLabels[name] : name;

                            return (
                                <S_SelectionColumnLabel
                                    key={`selection-column-${String(key)}`}
                                    isAmericanSports={false}
                                    data-testid={testId}
                                >
                                    {columnLabel}
                                </S_SelectionColumnLabel>
                            );
                        })}
                    </S_GroupSelections>
                ))}

            {!hideChevron && <ArrowIcon isOpen={isOpen} />}
        </S_HeaderGroup>
    );
};

export default memo(EventGroupHeaderESoccer, arePropsEqual);
