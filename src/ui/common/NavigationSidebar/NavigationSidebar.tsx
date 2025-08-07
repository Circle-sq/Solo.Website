import { Box } from '@mui/material';
import classNames from 'classnames';
import { Map as ImmutableMap } from 'immutable';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import orderBy from 'lodash/orderBy';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';

import { useAppStateContext } from 'src/appState/AppState';
import type { NestedItem, NestedItemChildren, PreparedNestedItem } from 'src/appState/redux/ReduxStateTypes';
import type { SportLinkType } from 'src/appState/sportsList/types';
import { getCompetitionLocation, getCompetitionLocationLabel } from 'src/appState/utils';
import { SportType } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';
import NavigationPanel from 'src/ui/common/NavigationPanel/NavigationPanel';
import { useBetlinkGolf } from 'src/ui/sports/useBetlinkGolfFlag';
import { NUMBERS, PAGE_ROUTE_NAME, SPORTS_WITH_TOURNAMENTS } from 'src/utils/constants';

import CustomScrollbar from '../CustomScrollbar';
import type { LinkItem } from '../NavigationPanel/types';

import { AsideWrapper, CloseSidebarButton, CloseSidebarIcon } from './styled';

interface Props {
    popular?: LinkItem[];
    sport?: string;
    shouldRenderOnlyListOrGroups?: boolean;
}

const NavigationSidebar = (props: Props) => {
    const { popular, sport = '', shouldRenderOnlyListOrGroups } = props;
    const {
        language: { getTranslation, getTranslationsReverse },
        reduxState,
        router: {
            route: { name: routeName },
        },
        sportsList: { sportsLinks },
    } = useAppStateContext();

    const { enabled: isBetlinkFeatureEnabled, openBetlinkGolf, i18nGolf } = useBetlinkGolf();

    const prepareNestedLinks = (data: NestedItem[], sport: string): PreparedNestedItem[] => {
        const competitionLocation = getCompetitionLocation(sport);

        return data.map((item) => {
            const children: NestedItemChildren<{
                id: string;
                slug: string;
            }>[] = item.children.map(({ elem, eventNumber }) => {
                const imageUrl = reduxState.getCompetitionIconUrl(elem);

                const category = get(elem, 'tags.category[0]');

                return {
                    label: elem.name,
                    category,
                    iconName: 'theme-tournaments',
                    route: 'competition',
                    params: {
                        id: elem.id,
                        slug: sport,
                    },
                    eventNumber,
                    country: get(elem, competitionLocation.tagSelector) as string,
                    displayOrder: elem.displayOrder,
                    imageUrl: imageUrl,
                };
            });

            const sortedChildren = orderBy(children, ['displayOrder', 'label'], ['desc', 'asc']);

            const competitionLocationLabel = getCompetitionLocationLabel(
                getTranslation,
                item.locationKey,
                item.locationLabel,
            );

            const allCountryLink: NestedItemChildren<{ countryId: string; sportId: string }> = {
                label: getTranslationsReverse([
                    getTranslation('lhn.country.all.label', 'All'),
                    competitionLocationLabel,
                ]).join(' '),

                iconName: 'theme-competitions-all',
                route: 'country',
                params: { sportId: sport, countryId: item.countryId },
                eventNumber: item.eventNumber,
                country: item.countryId,
            };

            const competitionId =
                children && children.length > 0
                    ? get(children, '0.params.id')
                    : getTranslation('lhn.country.all.not.found', 'N/A');

            return {
                label: competitionLocationLabel,
                route: 'country',
                params: { sportId: sport, countryId: item.countryId, competitionId: competitionId },
                children: [allCountryLink, ...sortedChildren],
                eventNumber: item.eventNumber,
            };
        });
    };

    const renderActiveSportList = (sportsLinks: LinkItem[], routeName: string) => {
        if (sportsLinks.length > 0 && routeName === PAGE_ROUTE_NAME.homepage) {
            return (
                <NavigationPanel
                    title={<I18n langKey='left-menu.sports-top.title' defaultText='Top Sports' />}
                    links={sportsLinks}
                    id='sports'
                    isToggle={false}
                    disabled={true}
                    testId='topSports'
                />
            );
        }

        return null;
    };

    const renderGroupedByLocationAndSorted = (sportsLinks: PreparedNestedItem[], routeName: string, sport: string) => {
        const allowedRouteNames = [
            PAGE_ROUTE_NAME.event,
            PAGE_ROUTE_NAME.sport,
            PAGE_ROUTE_NAME.competition,
            PAGE_ROUTE_NAME.country,
            PAGE_ROUTE_NAME.allcountries,
        ];

        if (sportsLinks.length > NUMBERS.zero && includes(allowedRouteNames, routeName)) {
            return (
                <NavigationPanel
                    title={
                        SPORTS_WITH_TOURNAMENTS.includes(sport) ? (
                            <I18n langKey='left-menu.all-competitions.collapse.title' defaultText='All Competitions' />
                        ) : (
                            <I18n langKey='left-menu.sports-countries.title' defaultText='All Countries' />
                        )
                    }
                    links={sportsLinks}
                    id='sports-countries'
                    isToggle={true}
                    testId='allCountries'
                />
            );
        }

        return <></>;
    };

    const renderListOrGroups = () => {
        return renderGroupedByLocationAndSorted(
            prepareNestedLinks(reduxState.normalizedCompetitionLocations, sport),
            routeName,
            sport,
        );
    };

    const createSportLinks = (links: SportLinkType[] = []) => {
        const sports = reduxState.getContent.getIn(['icons', 'sports'], ImmutableMap());
        const sportItems = sports.get('items', ImmutableMap());

        const newLinks: SportLinkType[] = [];

        links.forEach((link) => {
            const id = link.params.id;
            const url = sportItems.getIn([id, 'url']);
            const imageParams = !isUndefined(url) ? { imageUrl: url, iconName: undefined } : {};

            newLinks.push({
                ...link,
                ...imageParams,
            });
        });

        if (isBetlinkFeatureEnabled) {
            const betlinkGolfParams: SportLinkType = {
                route: 'sport',
                params: {
                    id: SportType.BetlinkGolf,
                },
                label: i18nGolf,
                uuid: uuidv4(),
                onClick: openBetlinkGolf,
            };

            const placeInArray = Math.trunc(newLinks.length / 2 + 1);

            return [...newLinks.slice(0, placeInArray), betlinkGolfParams, ...newLinks.slice(placeInArray)];
        }

        return newLinks;
    };

    const linkList = createSportLinks(sportsLinks);
    const closeSidebarButton = (
        <CloseSidebarButton params={{ account: null }}>
            <CloseSidebarIcon name='arrow-left' />
            <I18n langKey='navigation.sidebar.close.button' defaultText='Close' />
        </CloseSidebarButton>
    );

    const sideBarContent = (
        <div className='navigation-sidebar__content'>
            {closeSidebarButton}
            {!isNil(popular) && popular.length > 0 && (
                <Box
                    sx={{
                        mb: '20px',
                    }}
                >
                    <NavigationPanel
                        title={<I18n langKey='left-menu.highlights.title' defaultText='Highlights' />}
                        links={popular}
                        id='popular'
                        isToggle={true}
                        disabled={true}
                        testId='highlights'
                    />
                </Box>
            )}
            {renderActiveSportList(linkList, routeName)}
            {renderListOrGroups()}
        </div>
    );

    if (shouldRenderOnlyListOrGroups !== undefined && shouldRenderOnlyListOrGroups === true) {
        return renderListOrGroups();
    } else {
        return (
            <AsideWrapper className={classNames('navigation-sidebar', { 'is-open': false })}>
                <CustomScrollbar disabled={true} position='0px'>
                    {sideBarContent}
                </CustomScrollbar>
            </AsideWrapper>
        );
    }
};

export default observer(NavigationSidebar);
