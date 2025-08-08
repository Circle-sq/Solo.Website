import { useWindowWidth } from '@solo-hooks';
import includes from 'lodash/includes';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppStateContext } from 'src/appState/AppState';
import { getCompetitionLocation, getCompetitionLocationLabel } from 'src/appState/utils';
import { RouteName, SportType } from 'src/common/enums';
import { competitionLocationItemsSelector } from 'src/modules/sports/selectors';
import { I18n } from 'src/ui/common/Language/I18n';
import Panel from 'src/ui/common/Panel';
import EventsList from 'src/ui/events/EventsList';
import Outrights from 'src/ui/events/Outrights/Outrights';
import { getCompetitionsParams } from 'src/utils/breadcrumb';
import { isValidCountry } from 'src/utils/common';
import { COMPETITIONS_TABS, DASH, NUMBERS, TAGS } from 'src/utils/constants';
import { getItemByCompetitionLocation } from 'src/utils/detectGroupFormat';
import type { CompetitionLocation } from 'src/utils/types';

import { S_TabButton, S_CountEvents, S_HeaderControls, Content, Container } from './styles';

const General = () => {
    const competitionLocations = useSelector(competitionLocationItemsSelector);
    const [matchesOutright, setMatchesOutright] = useState<{ id?: string; countryId?: string; tab?: string }>({});

    const { isMobile } = useWindowWidth();

    const topRef = useRef<HTMLDivElement>(null);

    const {
        router,
        eventsCounter,
        language: { getTranslation, getTranslationsReverse },
        reduxState: { normalizedCompetitionLocations: detectedGroupCustomList },
    } = useAppStateContext();

    const { params: routeParams, name: routeName } = router.route;
    const { popup, ...params } = routeParams;

    const sportId = {
        [RouteName.Sport]: params.id,
        [RouteName.Competition]: params.slug,
        [RouteName.Country]: params.sportId,
    }[routeName];

    const competitionId = {
        [RouteName.Country]: params.competitionId,
        [RouteName.Competition]: params.id,
    }[routeName];

    const countryId = {
        [RouteName.Country]: params.countryId,
    }[routeName];

    const isAllowedHeaderName = includes([RouteName.Country, RouteName.Competition], routeName);
    const isSportGolf = sportId === SportType.Golf;
    let competitionLocation: CompetitionLocation;

    if (countryId && !isValidCountry(countryId)) {
        competitionLocation = getCompetitionLocation(sportId, true);
    } else {
        competitionLocation = getCompetitionLocation(sportId);
    }

    const additionalParams = useMemo(() => {
        let dynamicParams = {};

        if (includes(RouteName.Country, routeName) && countryId !== undefined) {
            if (countryId === DASH) {
                dynamicParams = { ...dynamicParams, [`tags.${TAGS.Country}`]: countryId };
            } else {
                dynamicParams = { ...dynamicParams, [competitionLocation.querySelector]: countryId };
            }
        }

        if (includes(RouteName.Competition, routeName) && competitionId) {
            dynamicParams = { ...dynamicParams, competition: competitionId };
        }

        if (sportId) {
            dynamicParams = { ...dynamicParams, sport: sportId };
        }

        return dynamicParams;
    }, [JSON.stringify(params)]);

    const collectionCompetitionId = competitionId ? competitionId : 0;

    const {
        isLoading: isLoadingMatches,
        total: totalMatches,
        currentLoadedPageNumber: currentLoadedPageNumberMatches,
    } = useMemo(() => {
        return eventsCounter.getEventsCounterList(`${sportId}-${collectionCompetitionId}-count-matches`, {
            ...additionalParams,
        });
    }, [JSON.stringify(params)]);

    const { isLoading: isLoadingOutrights, total: totalOutrights } = useMemo(() => {
        if (includes(RouteName.Sport, routeName)) {
            return {
                isLoading: false,
                total: 0,
            };
        }

        return eventsCounter.getEventsCounterList(`${sportId}-${collectionCompetitionId}-count-outright`, {
            ...additionalParams,
        });
    }, [JSON.stringify(params)]);

    const tabs = [
        {
            key: 'matches',
            label: getTranslation('events.list.tabs.matches.label', 'Matches'),
            shouldRender: true,
            content: (
                <section>
                    <EventsList
                        key={`${routeName}-sport-${sportId}-${collectionCompetitionId}-${countryId}`}
                        query={{ ...additionalParams }}
                        collectionId={`sport-${sportId}-${collectionCompetitionId}-${countryId}`}
                        allowLoadMore
                        testId='matchesSection'
                        showSort={routeName !== RouteName.Competition}
                    />
                </section>
            ),
            testId: 'matches',
        },
        {
            key: 'outright',
            label: getTranslation('events.list.tabs.outright.label', 'Outright'),
            shouldRender: !isLoadingOutrights && totalOutrights > NUMBERS.zero,
            content: (
                <Outrights
                    key={`${routeName}-sport-${sportId}-${collectionCompetitionId}-${countryId}-outright`}
                    collectionId={`${sportId}-${collectionCompetitionId}-outright`}
                    query={{ ...additionalParams }}
                />
            ),
            testId: 'outright',
        },
    ];

    let pageContent: ReactElement | undefined;
    let HeaderPanel: string | null = null;

    if (routeName === RouteName.Country) {
        const { locationKey, locationLabel } = getItemByCompetitionLocation(
            competitionLocations,
            competitionLocation,
            routeName,
            params.countryId,
        );

        HeaderPanel = getTranslationsReverse([
            getTranslation('eventlist.tab.outright', 'All'),
            ' ',
            getCompetitionLocationLabel(getTranslation, locationKey, locationLabel),
        ]).join('');
    } else if (routeName === RouteName.Competition) {
        const { competitionName } = getItemByCompetitionLocation(
            competitionLocations,
            competitionLocation,
            routeName,
            competitionId,
        );

        HeaderPanel = competitionName;
    }

    const activeTab = matchesOutright?.tab || tabs[NUMBERS.zero].key;

    const setActiveTab = (activeTab: string) => {
        setMatchesOutright({ tab: activeTab, id: params.id, countryId: params.countryId });
    };

    useEffect(() => {
        if (
            !isLoadingMatches &&
            !isLoadingOutrights &&
            (totalMatches === NUMBERS.zero || isSportGolf) &&
            totalOutrights > NUMBERS.zero
        ) {
            setActiveTab(tabs[NUMBERS.one].key);
        } else if (matchesOutright?.id !== params.id || matchesOutright?.countryId !== params.countryId) {
            setActiveTab(tabs[NUMBERS.zero].key);
        }
    }, [sportId, competitionId, countryId, totalMatches, totalOutrights, isLoadingMatches, isLoadingOutrights]);

    useEffect(() => {
        if (
            includes(RouteName.Sport, routeName) &&
            !isLoadingMatches &&
            totalMatches === NUMBERS.zero &&
            currentLoadedPageNumberMatches !== null
        ) {
            const { id } = params;
            const { route, ...competitionsConfig } = getCompetitionsParams(detectedGroupCustomList, id);

            if (competitionsConfig?.sportId) {
                router.redirect(route, {
                    ...competitionsConfig,
                });
            }
        }
    }, [sportId, totalMatches, isLoadingMatches, currentLoadedPageNumberMatches, detectedGroupCustomList]);

    useEffect(() => {
        if (!isMobile && topRef.current !== null && typeof topRef.current.scrollIntoView === 'function') {
            topRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [sportId, countryId, competitionId, isMobile]);

    const isOutrightTabSelected = activeTab === COMPETITIONS_TABS.outright;

    return (
        <>
            <div ref={topRef} style={{ position: 'absolute', top: 0, left: 0 }} />

            <Container>
                <Panel
                    testId={HeaderPanel ?? 'panelTitleTestId'}
                    title={
                        HeaderPanel ? HeaderPanel : <I18n langKey='event.list.header.title' defaultText='Highlights' />
                    }
                    disabled
                />
                {isAllowedHeaderName ? (
                    <S_HeaderControls hasMarginBottom={isOutrightTabSelected}>
                        {tabs.map((tab) => {
                            const { label, key, shouldRender, content, testId } = tab;

                            if (!shouldRender) {
                                return;
                            }

                            const isActive = key === activeTab;

                            if (isActive) {
                                pageContent = content;
                            }

                            return (
                                <S_TabButton
                                    key={key}
                                    data-testid={testId}
                                    onClick={() => setActiveTab(key)}
                                    active={isActive}
                                >
                                    {label}
                                    <S_CountEvents key={`counter-${key}`} data-testid='counter'>
                                        {key === 'outright' ? totalOutrights : totalMatches}
                                    </S_CountEvents>
                                </S_TabButton>
                            );
                        })}
                    </S_HeaderControls>
                ) : null}

                <Content>{isAllowedHeaderName ? pageContent : tabs[NUMBERS.zero].content}</Content>
            </Container>
        </>
    );
};

export default observer(General);
