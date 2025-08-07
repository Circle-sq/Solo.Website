import { useAtomValue } from 'jotai';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';

import { marketTemplateIdSelectorFamily, visibleMarketIdsSelectorFamily } from 'src/store/events/selectors/market';

import Market from '../../../market/Market';
import { S_MarketWrapper } from '../../../market/styled';

interface Props {
    marketId: number;
    eventId: number;
    offset: number;
}

const ExtremeRowEventMarketLine = ({ marketId, eventId, offset }: Props) => {
    const marketIds = useAtomValue(visibleMarketIdsSelectorFamily(eventId));

    const currentIndex = findIndex(marketIds, (id) => id === marketId);
    const relativeIndex = currentIndex + offset;
    const previousMarketId = get(marketIds, [relativeIndex]);

    const marketTemplateId = useAtomValue(marketTemplateIdSelectorFamily(marketId));
    const previousMarketTemplateId = useAtomValue(marketTemplateIdSelectorFamily(previousMarketId));

    if (marketTemplateId !== previousMarketTemplateId) {
        return <S_MarketWrapper data-testid='market-placeholder' />;
    }

    return <Market eventId={eventId} marketId={previousMarketId} />;
};

export default ExtremeRowEventMarketLine;
