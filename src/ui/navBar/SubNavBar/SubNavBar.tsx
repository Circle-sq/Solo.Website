import { useWindowWidth } from '@solo-hooks';
import { List, Map } from 'immutable';
import get from 'lodash/get';
import includes from 'lodash/includes';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { connect } from 'react-redux';

import { useAppStateContext } from 'src/appState/AppState';
import type { ReduxState } from 'src/appState/redux/types';
import { MyBetsTab, RouteName, SportType } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';
import { getCompetitionsParams } from 'src/utils/breadcrumb';

import NavBarItem from './NavBarItem/NavBarItem';
import { S_LiveLabel, S_NavigationBar } from './styled';
import type { Link, LiveEvent } from './types';

const SubNavBar = ({ events, competitionLocations, competitions }: LiveEvent) => {
    const { isDesktop, isTablet } = useWindowWidth();

    const {
        router: { route },
        reduxState: { normalizedCompetitionLocations },
        eventsCounter,
        language: { getTranslation },
    } = useAppStateContext();

    const { name: routeName, params: routeParam } = route;

    const isRouteAllowed = includes(
        [RouteName.Sport, RouteName.Country, RouteName.Competition, RouteName.AllCountries, RouteName.MyBets],
        routeName,
    );

    const isInPlayRoute = routeName === RouteName.InPlay;
    const isViewEvent = routeName === RouteName.Event;

    const isCounterAllowed = includes([RouteName.Sport, RouteName.Country, RouteName.Competition], routeName);

    const event = isInPlayRoute
        ? Map(events.find((event) => event.getIn(['timeSettings', 'started']) === true))
        : events.get(+routeParam.id, Map());
    const sportEvent = event.get('sport') as string;

    const isLiveEvent = event.getIn(['timeSettings', 'started']) === true;

    const detectSportId = {
        [RouteName.Sport]: routeParam.id,
        [RouteName.Country]: routeParam.sportId,
        [RouteName.Competition]: routeParam.slug,
        [RouteName.AllCountries]: routeParam.sportId,
        [RouteName.Event]: sportEvent,
    };

    const sportId = get(detectSportId, routeName);

    const { isLoading, total } = useMemo(() => {
        if (!isCounterAllowed || !isDesktop) {
            return {
                isLoading: false,
                total: 0,
            };
        }

        return eventsCounter.getEventsCounterList(`in-play-count-${sportId}`, { sport: sportId });
    }, [sportId, isDesktop]);

    const links = useMemo(() => {
        let routeLinks: Link[] = [];

        const detectCompetitionLink = includes(
            [RouteName.Sport, RouteName.Country, RouteName.Competition, RouteName.AllCountries],
            routeName,
        )
            ? {
                  route: RouteName.AllCountries,
                  params: { sportId },
                  label: <I18n langKey='live.bar.link.competitions' defaultText='Competitions' />,
                  testId: 'competition',
              }
            : {};

        const sport = {
            route: RouteName.Sport,
            params: { id: sportId },
            label: <I18n langKey='live.bar.link.featured' defaultText='Featured' />,
            testId: 'featured',
        };

        const live = {
            route: RouteName.InPlay,
            params: { id: sportId },
            icon: 'theme-right',
            label: (
                <S_LiveLabel>
                    <I18n langKey='live.bar.link.live' defaultText='Live' />
                </S_LiveLabel>
            ),
            counter: total,
            testId: 'inPlayLive',
        };

        const myBetsPageLinks = [
            {
                route: RouteName.MyBets,
                params: { id: MyBetsTab.Live },
                label: getTranslation('betslip.tabs.live', 'Live'),
                testId: 'myBetsPageLive',
            },
            {
                route: RouteName.MyBets,
                params: { id: MyBetsTab.CashOut },
                label: getTranslation('betslip.tabs.open', 'Open'),
                testId: 'myBetsPageOpen',
            },
            {
                route: RouteName.MyBets,
                params: { id: MyBetsTab.Settled },
                label: getTranslation('betslip.tabs.settled', 'Settled'),
                testId: 'myBetsPageSettled',
            },
        ];

        switch (routeName) {
            case RouteName.MyBets: {
                routeLinks = [...myBetsPageLinks];

                break;
            }

            case RouteName.Event: {
                const isSportTennis = event.get('sport') === SportType.Tennis;
                const competitionId = event.get('competition');
                const countryCode = isSportTennis
                    ? event.getIn(['tags', 'tennis-tour', 0])
                    : event.getIn(['tags', 'country', 0]);

                routeLinks = [
                    sport,
                    {
                        route: RouteName.Country,
                        params: {
                            sportId,
                            countryId: countryCode,
                            competitionId: competitionId,
                        },
                        label: <I18n langKey='live.bar.link.competitions' defaultText='Competitions' />,
                        testId: 'competitions',
                    },
                ];

                break;
            }

            case RouteName.AllCountries: {
                routeLinks = [sport, detectCompetitionLink];

                break;
            }

            case RouteName.Sport: {
                const { id } = routeParam;
                const { route, ...competitionsConfig } = getCompetitionsParams(normalizedCompetitionLocations, id);

                const competitionLink = isTablet
                    ? detectCompetitionLink
                    : {
                          route: route,
                          params: { ...competitionsConfig },
                          label: <I18n langKey='live.bar.link.competitions' defaultText='Competitions' />,
                          testId: 'competitions',
                      };

                routeLinks = isDesktop ? [sport, competitionLink, live] : [sport, competitionLink];

                break;
            }

            case RouteName.Country: {
                const { sportId, countryId, competitionId } = routeParam;

                const competitionLink = isTablet
                    ? detectCompetitionLink
                    : {
                          route: RouteName.Country,
                          params: { sportId: sportId, countryId: countryId, competitionId: competitionId },
                          label: <I18n langKey='live.bar.link.competitions' defaultText='Competitions' />,
                          testId: 'competitions',
                      };

                routeLinks = isDesktop
                    ? [
                          {
                              route: RouteName.Sport,
                              params: { id: sportId },
                              label: <I18n langKey='live.bar.link.featured' defaultText='Featured' />,
                          },
                          competitionLink,
                          live,
                      ]
                    : [
                          {
                              route: RouteName.Sport,
                              params: { id: sportId },
                              label: <I18n langKey='live.bar.link.featured' defaultText='Featured' />,
                          },
                          competitionLink,
                      ];

                break;
            }

            case RouteName.Competition: {
                const { id, slug } = routeParam;
                const competitionLink = isTablet
                    ? detectCompetitionLink
                    : {
                          route: RouteName.Competition,
                          params: { id: id, slug: slug },
                          label: <I18n langKey='live.bar.link.competitions' defaultText='Competitions' />,
                          testId: 'competitions',
                      };

                routeLinks = isDesktop ? [sport, competitionLink, live] : [sport, competitionLink];

                break;
            }
        }

        return routeLinks;
    }, [
        event,
        competitionLocations,
        competitions,
        routeName,
        sportId,
        isLiveEvent,
        isTablet,
        isDesktop,
        isLoading,
        total,
    ]);

    const showNavigationBar = isRouteAllowed || (isDesktop && (isLiveEvent || isViewEvent));

    if (!showNavigationBar) {
        return null;
    }

    return (
        <S_NavigationBar>
            {links.map((link) => {
                return <NavBarItem key={link.route} link={link} isLiveEvent={isLiveEvent} />;
            })}
        </S_NavigationBar>
    );
};

const mapStateToProps = (state: ReduxState): LiveEvent => {
    const { events, sports, competitions } = state;

    return {
        events: events.get('items', Map()),
        competitions: competitions.get('items', Map()),
        competitionLocations: sports.getIn(['competitionLocations', 'items'], List()),
    };
};

export default connect(mapStateToProps)(observer(SubNavBar));
