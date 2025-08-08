import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { isEnabledBuildABetFeatureSelectorFamily } from '@solo-buildABet/store/selectors';
import BuildABetFeatureToggle from '@solo-buildABet/ui/BuildABetFeatureToggle/BuildABetFeatureToggle';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { DefaultMarketsTabIndex } from 'src/common/enums/market';
import SwiperSlider from 'src/ui/common/Carousel/SwiperSlider';
import { currentMarketAtom } from 'src/ui/common/GroupingNavigation/atoms';
import { I18n } from 'src/ui/common/Language/I18n';
import type { MarketNavigationGroup } from 'src/ui/events/hooks/useMatchCardMarkets';

import { GroupNavMenuLink, S_GroupNavMenuSpan, S_GroupNavMenu } from './styled';

interface Props {
    eventId: number;
    marketGroups: MarketNavigationGroup;
    hide?: boolean;
}

const mainTabMarketIndex = 0;

const GroupingNavigation = ({ eventId, marketGroups, hide }: Props) => {
    const { router } = useAppStateContext();
    const { name: routeName, params: routeParam } = router.route;
    const isEnabledBetBuilder = useRecoilValue(isEnabledBuildABetFeatureSelectorFamily(eventId));

    const [currentMarket, setCurrentMarket] = useRecoilState(currentMarketAtom);
    const [marketGroupsState, setMarketGroupsState] = useState(marketGroups);
    const marketIsNotDefined = routeParam.market === undefined;
    const routeParamMarket = Number(routeParam.market);

    useEffect(() => {
        setCurrentMarket(Number(routeParam.market));
    }, []);

    useEffect(() => {
        if (routeParamMarket) {
            setCurrentMarket(routeParamMarket);
        }
    }, [routeParamMarket]);

    useEffect(() => {
        if (marketIsNotDefined) {
            setCurrentMarket(mainTabMarketIndex);
        }

        if (hide === true) {
            router.redirect(RouteName.Event, { ...routeParam, market: null });
        }
    }, [hide, marketIsNotDefined]);

    useEffect(() => {
        const isDeletedMarket = marketGroups.length < marketGroupsState.length;

        const redirectToMainMarket = () => {
            if (marketIsNotDefined) {
                return;
            }

            router.redirect(RouteName.Event, { ...routeParam, market: mainTabMarketIndex });
        };

        if (isDeletedMarket) {
            // redirect to main tab
            if (!isEnabledBetBuilder) {
                setCurrentMarket(mainTabMarketIndex);
                redirectToMainMarket();
            }
        } else {
            // update marketGroupsState with new added markets
            setMarketGroupsState(marketGroups);
        }
    }, [marketGroups.length]);

    const getMarketTabFromIndex = (index: number) => {
        if (index === DefaultMarketsTabIndex.Main) {
            return DefaultMarketsTabIndex.Main;
        }

        if (index === 0) {
            return DefaultMarketsTabIndex.All;
        }

        return index - 1;
    };

    const handleUpdate = (index: number) => {
        setCurrentMarket(getMarketTabFromIndex(index));
    };

    const getMarketGroups = map(marketGroups, ({ position, visible }, label) => ({
        route: RouteName.Event,
        label,
        params: { market: position, id: routeParam.id, slug: routeParam.slug, visible },
        className: '',
    }));

    const navLinks = [
        {
            route: RouteName.Event,
            label: 'All',
            params: { market: DefaultMarketsTabIndex.All, id: routeParam.id, slug: routeParam.slug, visible: true },
            className:
                Number(routeParam.market) === DefaultMarketsTabIndex.Main
                    ? classnames([
                          {
                              link: true,
                          },
                      ])
                    : '',
        },
        ...getMarketGroups,
    ];

    return (
        <S_GroupNavMenu>
            <SwiperSlider>
                {navLinks.map((link, index) => {
                    const { route, params, label, className: linkClassName } = link;
                    const emptyBuildABetMarket = isEnabledBetBuilder && !params.visible;

                    if (label === null || emptyBuildABetMarket) {
                        return null;
                    }

                    const isLink = link.route !== undefined;

                    const className = !isEmpty(linkClassName)
                        ? linkClassName
                        : classnames([
                              {
                                  active:
                                      (route === routeName && params.market === currentMarket) ||
                                      (isNaN(currentMarket) && label === 'Main') ||
                                      (currentMarket === DefaultMarketsTabIndex.All && label === 'All') ||
                                      navLinks.length === 1,
                                  link: isLink,
                              },
                          ]);

                    const itemProps = {
                        route,
                        params: { id: routeParam.id, slug: routeParam.slug, market: params.market },
                        className,
                    };

                    return (
                        <GroupNavMenuLink
                            testId={`marketGroup-${link.label}`}
                            key={link.label}
                            {...itemProps}
                            onClick={() => handleUpdate(index)}
                        >
                            <S_GroupNavMenuSpan>
                                <I18n langKey={`event.market.group.${link.label}`} defaultText={`${link.label}`} />
                            </S_GroupNavMenuSpan>
                        </GroupNavMenuLink>
                    );
                })}
            </SwiperSlider>
            <BuildABetFeatureToggle eventId={eventId} />
        </S_GroupNavMenu>
    );
};

export default GroupingNavigation;
