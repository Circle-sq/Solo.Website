import { useWindowWidth } from '@sc-hooks';
import isNumber from 'lodash/isNumber';
import sortBy from 'lodash/sortBy';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import { useSelector } from 'react-redux';
import { useSetRecoilState } from 'recoil';

import { api } from '@sc-api/api';
import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';

import { useAppStateContext } from 'src/appState/AppState';
import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { eventMarketTemplateIdsSelector } from 'src/modules/events/selectors';
import { marketDescriptionsAtom } from 'src/ui/events/store/atoms';

import MarketGroup from '../MarketGroup/MarketGroups';

import type { MarketGroupUI, MarketTemplatesDescriptionsResponse } from './types';
import { generateMarketsGroups, normalizeById } from './utils';

const MOBILE_COLUMNS_NUMBER = 1;
const DESKTOP_COLUMNS_NUMBER = 2;

interface Props {
    eventId: number;
    markets?: MarketModel[];
    numberOfMarkets: number;
}

const EventMarkets = ({ markets, eventId, numberOfMarkets }: Props) => {
    const marketTemplateIds = useSelector(eventMarketTemplateIdsSelector(eventId));
    const { models } = useAppStateContext();
    const { isTabletSmall } = useWindowWidth();

    const setMarketTemplateDescriptions = useSetRecoilState(marketDescriptionsAtom);

    const event = isNumber(eventId) ? models.getEvent(eventId) : null;

    const eventMarketsColumns = isTabletSmall
        ? MOBILE_COLUMNS_NUMBER
        : numberOfMarkets > 1
        ? DESKTOP_COLUMNS_NUMBER
        : MOBILE_COLUMNS_NUMBER;

    // Markets merged by 'mainGroup' property or 'template.name' fallback, to live under the same display template + sort
    const mergedAndSortedMarkets = useMemo<MarketGroupUI[]>(() => {
        const mergedMarkets = generateMarketsGroups(markets || [], event?.sport);

        return sortBy(mergedMarkets, (market) => market.displayOrder);
    }, [markets, event?.sport]);

    const fetchMarketTemplatesDescription = async () => {
        try {
            const result = await api.post<MarketTemplatesDescriptionsResponse>(
                `/market-templates/${event?.sport}/description`,
                {
                    marketTemplateIds,
                },
            );

            return result.results;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (event?.sport != null && marketTemplateIds.length > 0) {
            fetchMarketTemplatesDescription()
                .then((response = []) => setMarketTemplateDescriptions(normalizeById(response)))
                .catch(console.error);
        }
    }, [event?.sport, marketTemplateIds.length]);

    return (
        <Masonry breakpointCols={eventMarketsColumns} className='masonry-grid' columnClassName='masonry-grid_column'>
            {mergedAndSortedMarkets.map((mergedMarketGroup) => {
                const key = `${mergedMarketGroup?.groupName}-${mergedMarketGroup?.markets[0]?.id}`;
                const oneMarketOnly = mergedMarketGroup.markets.length === 1;
                const market = mergedMarketGroup.markets[0];

                // when suspended we show only market header + lock icon
                if (market.isSuspended && oneMarketOnly) {
                    return (
                        <SubscribeElement
                            subKey={SubKey.suspended_market}
                            id={market.id}
                            parentId={market.eventId}
                            key={key}
                            revision={market.revision}
                        >
                            <MarketGroup key={key} marketGroups={mergedMarketGroup} event={event} />
                        </SubscribeElement>
                    );
                }

                return <MarketGroup key={key} marketGroups={mergedMarketGroup} event={event} />;
            })}
        </Masonry>
    );
};

export default observer(EventMarkets);
