import { Map as ImmutableMap } from 'immutable';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import { observer } from 'mobx-react-lite';
import { type MouseEvent, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { CupIcon, DownArrowIcon, UpArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { getCompetitionLocation } from 'src/appState/utils';
import CompetitionLocationIcon from 'src/assets/icons/competitionLocationIcon/CompetitionLocationIcon';
import ESoccerIcon from 'src/assets/icons/ESoccerIcon';
import { RouteName } from 'src/common/enums';
import { highlightCompetitionsAtom } from 'src/common/hooks/useHighlightCompetitions/useHighlightCompetitions';
import { isValidCountry } from 'src/utils/common';
import { SPORT_TYPE, SPORTS_WITH_TOURNAMENTS, TAGS } from 'src/utils/constants';
import { buildQueryUrl } from 'src/utils/Router/url';

import { S_ContentIcon } from '../NavigationList/styled';
import type { NestedLinkItem } from '../NavigationPanel/types';

import {
    S_CompetitionIcon,
    CompetitionLink,
    S_Counter,
    S_Label,
    S_ChildLabel,
    NavigationLink,
    S_RightSide,
    S_CrossBetCompetitionLink,
    S_CrossBetNavigationLink,
    S_ToggleButton,
    S_MarginBox,
} from './styled';

interface CountryListItemProps {
    link: NestedLinkItem;
    open: boolean;
    sportId?: string | null;
}

const CountryListItem = ({ link, open, sportId }: CountryListItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const {
        router,
        router: {
            route: {
                name: routeName,
                params: { sport },
            },
            routes: routerRoutes,
        },
        reduxState,
    } = useAppStateContext();
    const { params } = router.route;

    const { competitionId, countryId, ...routeParams } = params;
    const isCrossBetPage = routeName === RouteName.CrossBetting;
    const highlightCompetitions = useRecoilValue(highlightCompetitionsAtom);

    const competitionLinks = useMemo(() => {
        if (link.children !== undefined) {
            const defaultLink = link.children.find((child) =>
                Array.isArray(child.label) ? true : isNaN(Number(child.displayOrder)),
            );

            const filteredChildren = link.children
                .filter((child) => (Array.isArray(child.label) ? false : !isNaN(Number(child.displayOrder))))
                .map((child) => ({ ...child, displayOrder: Number(child.displayOrder) }));
            const orderedLinks = orderBy(filteredChildren, 'displayOrder', 'desc');

            if (defaultLink === undefined || orderedLinks.length < 2) {
                return [...orderedLinks];
            }

            return [{ ...defaultLink }, ...orderedLinks];
        }

        return [];
    }, [link.children]);

    const sportResult = sportId || sport;

    const location = get(link, 'children[0].country');
    const competitionLocation = getCompetitionLocation(sportResult);
    const { label, eventNumber } = link;

    const navLinkClick = (event: MouseEvent) => {
        event.preventDefault();

        setIsOpen((isOpen) => !isOpen);
    };

    const isCategoryCompetition = !SPORTS_WITH_TOURNAMENTS.includes(sportResult) && !isValidCountry(label ?? '');
    const navigationLinkTestId = sportResult && !isCategoryCompetition ? `${sportResult}-${label}` : `${label}`;
    const showCounter = !isOpen && !isCrossBetPage;

    const S_NavigationLink = isCrossBetPage && link?.menuLevel !== 1 ? S_CrossBetNavigationLink : NavigationLink;
    const S_CompetitionLink = isCrossBetPage ? S_CrossBetCompetitionLink : CompetitionLink;
    const isESoccerLink = link.params?.countryId === SPORT_TYPE.esoccer.toUpperCase();
    let competitionTag = competitionLocation.tag;

    if (typeof label === 'string' && isCategoryCompetition) {
        competitionTag = TAGS.Category;
    }

    const sportIcons = reduxState.getContent.getIn(['icons', 'sports', 'items'], ImmutableMap()).toJS();
    const eSoccerIcon = get(sportIcons, SPORT_TYPE.esoccer, { url: '' });

    return (
        <>
            <S_NavigationLink onClick={navLinkClick} testId={navigationLinkTestId}>
                {isESoccerLink ? (
                    eSoccerIcon.url ? (
                        <S_ContentIcon src={eSoccerIcon.url} isLoaded />
                    ) : (
                        <ESoccerIcon />
                    )
                ) : (
                    <CompetitionLocationIcon
                        sportLabel={navigationLinkTestId}
                        location={location}
                        sport={sportResult}
                        locationIcon={reduxState.getCompetitionLocationIconUrl(competitionTag, location)}
                    />
                )}
                <S_Label title={label}>{label}</S_Label>
                <S_RightSide>
                    {link.totalEventsCounter && (
                        <S_Counter data-testid='countryListItemCounter'>{link.totalEventsCounter}</S_Counter>
                    )}
                    {showCounter && <S_Counter>{eventNumber}</S_Counter>}
                    <S_ToggleButton data-testid='toggleLHNCountryCompetitions' isOpen={isOpen}>
                        {isOpen ? (
                            <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                        ) : (
                            <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                        )}
                    </S_ToggleButton>
                </S_RightSide>
            </S_NavigationLink>
            {isOpen &&
                competitionLinks.map((competition) => {
                    const highlight = highlightCompetitions?.find((item) => {
                        return competition.id !== undefined ? item.id === parseInt(competition.id) : false;
                    });

                    const competitionItem = reduxState.competitionItems.find((item) => {
                        return competition.id !== undefined ? item?.get('id') === parseInt(competition.id) : false;
                    }) as ImmutableMap<string, unknown>;

                    const iconUrl: string =
                        reduxState.competitionIcons.getIn([get(highlight, 'platformObject.id'), 'url']) ??
                        reduxState.competitionIcons.getIn([competitionItem?.getIn(['platformObject', 'id']), 'url']) ??
                        competition.imageUrl;

                    const linkHref = buildQueryUrl(routerRoutes, routeName, {
                        ...routeParams,
                        ...competition.params,
                    });

                    const getCompetitionIcon = () => {
                        if (competition.country?.toUpperCase() === SPORT_TYPE.esoccer.toUpperCase()) {
                            return (
                                <CompetitionLocationIcon
                                    sportLabel={navigationLinkTestId}
                                    location={competition.category}
                                    sport={sportResult}
                                    locationIcon={reduxState.getCompetitionLocationIconUrl(
                                        competitionTag,
                                        competition.category,
                                    )}
                                />
                            );
                        }

                        if (iconUrl) {
                            return <S_ContentIcon src={iconUrl} isLoaded />;
                        }

                        if (competition.iconName === 'theme-tournaments') {
                            return (
                                <S_MarginBox>
                                    <CupIcon fontSize='small' />
                                </S_MarginBox>
                            );
                        }

                        if (competition.iconName !== undefined) {
                            return <S_CompetitionIcon className={competition.iconName} />;
                        }

                        return null;
                    };

                    const linkParams = {
                        ...routeParams,
                        ...competition.params,
                    };

                    const handleCrossLinkClick = () => {
                        if (!isCrossBetPage) {
                            return;
                        }

                        router.redirectToCrossPage(linkParams);
                    };
                    const isRouteActive = isEqual(linkParams, { ...params });
                    const competitionLinkClassName = isRouteActive ? 'active' : '';

                    return (
                        <S_CompetitionLink
                            key={`${JSON.stringify(competition.params)}`}
                            className={competitionLinkClassName}
                            testId={`competition-${competition.label?.toString()}`}
                            params={linkParams}
                            linkHref={linkHref}
                            onClick={handleCrossLinkClick}
                            {...omit(competition, 'params')}
                        >
                            {getCompetitionIcon()}
                            <S_ChildLabel title={competition.label}>{competition.label}</S_ChildLabel>
                            <S_RightSide>
                                <S_Counter data-testid='counter'>{competition.eventNumber}</S_Counter>
                            </S_RightSide>
                        </S_CompetitionLink>
                    );
                })}
        </>
    );
};

export default observer(CountryListItem);
