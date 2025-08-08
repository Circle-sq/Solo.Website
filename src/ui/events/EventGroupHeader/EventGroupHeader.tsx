import { useWindowWidth } from '@solo-hooks';
import type { ReactElement, MouseEvent } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import CompetitionLocationIcon from 'src/assets/icons/competitionLocationIcon/CompetitionLocationIcon';
import { AMERICAN_SPORTS, SCOREBOARD_SPORTS, SIMULATED_REALITY_LEAGUES } from 'src/config/config';
import { S_CompetitionName, S_CountryName } from 'src/ui/crossbetting/Competitions/styled';
import { COMPETITION_ICON, getSelectionIdentifierLabel, PAGE_ROUTE_NAME } from 'src/utils/constants';
import type { Testable } from 'src/utils/Testable/types';

import ArrowIcon from './ArrowIcon';
import {
    S_CompetitionIcon,
    S_EventsCount,
    S_GroupName,
    S_GroupNameSeparator,
    S_GroupNameWrapper,
    S_GroupSelections,
    S_HeaderGroup,
    S_SelectionColumnLabel,
} from './styled';

interface EventGroupHeaderProps extends Testable {
    columnLabelsGroups: string[][];
    label?: string | string[] | ReactElement;
    isOpen?: boolean;
    sportId: number | string;
    eventsCount?: number;
    onToggle?: (event: MouseEvent) => void;
    showSelections: boolean;
    iconUrl?: string;
    hideChevron?: boolean;
    selectionsSizes: number[];
    originalSportId?: string;
}

const EventGroupHeader = (props: EventGroupHeaderProps) => {
    const {
        columnLabelsGroups,
        eventsCount,
        hideChevron = false,
        iconUrl,
        label,
        onToggle,
        isOpen = false,
        selectionsSizes,
        showSelections,
        sportId,
        testId,
    } = props;
    const { width, isMobileLandscape, isDesktop } = useWindowWidth();

    const isDesktopLandscape = width <= 1440 && isDesktop;

    const isAmericanSports = AMERICAN_SPORTS.includes(String(sportId));
    const isScoreboardSport = SCOREBOARD_SPORTS.includes(String(sportId));
    const {
        language: { getTranslation },
        router: {
            route: { name: routeName },
        },
        reduxState,
    } = useAppStateContext();

    const isGroupedByDate = routeName === PAGE_ROUTE_NAME.competition;

    const translatedLabels = getSelectionIdentifierLabel(getTranslation, String(sportId));

    let categoryLabel, competitionName, category, tag;

    if (Array.isArray(label)) {
        [categoryLabel, competitionName, category, tag] = label;
    }

    const sport = String(sportId);
    const isSimulatedRealityLeague =
        Array.isArray(label) && category !== undefined && SIMULATED_REALITY_LEAGUES.includes(category);

    const sportLabel = isSimulatedRealityLeague ? category : categoryLabel;

    let locationIcon = reduxState.getCompetitionLocationIconUrl(tag, category);

    if (!locationIcon && isSimulatedRealityLeague) {
        locationIcon = COMPETITION_ICON;
    }

    return (
        <S_HeaderGroup onClick={onToggle}>
            {isGroupedByDate ? (
                <S_GroupName isGroupedByDate={isGroupedByDate} data-testid='groupHeader'>
                    {label} {eventsCount !== undefined && `( ${eventsCount} )`}
                </S_GroupName>
            ) : (
                !showSelections && (
                    <S_GroupNameWrapper>
                        <S_GroupName isGroupedByDate={isGroupedByDate} data-testid='groupHeader'>
                            <CompetitionLocationIcon
                                location={category}
                                sport={sport}
                                sportLabel={sportLabel}
                                locationIcon={locationIcon}
                            />
                            <S_CountryName>{categoryLabel}</S_CountryName>
                            <S_GroupNameSeparator />
                            {iconUrl !== undefined && <S_CompetitionIcon src={iconUrl} isLoaded />}
                            <S_CompetitionName title={competitionName}>{competitionName}</S_CompetitionName>
                        </S_GroupName>
                        {eventsCount !== undefined && (
                            <S_EventsCount data-testid='eventsCount'>( {eventsCount} )</S_EventsCount>
                        )}
                    </S_GroupNameWrapper>
                )
            )}

            {isOpen &&
                showSelections &&
                columnLabelsGroups.map((group: string[], index: number) => (
                    <S_GroupSelections
                        key={`selections-${String(index)}`}
                        isAmericanSports={isAmericanSports}
                        isScoreboardSport={isScoreboardSport}
                        cols={selectionsSizes[index]}
                    >
                        {group.map((name: string, key: number) => {
                            const columnLabel = translatedLabels[name] !== undefined ? translatedLabels[name] : name;

                            return (
                                <S_SelectionColumnLabel
                                    key={`selection-column-${String(key)}`}
                                    isAmericanSports={isAmericanSports}
                                    data-testid={testId}
                                >
                                    {(isMobileLandscape || isDesktopLandscape) && columnLabel === 'Money Line'
                                        ? 'Money...'
                                        : columnLabel}
                                </S_SelectionColumnLabel>
                            );
                        })}
                    </S_GroupSelections>
                ))}
            {!hideChevron && <ArrowIcon isOpen={isOpen} />}
        </S_HeaderGroup>
    );
};

export default EventGroupHeader;
