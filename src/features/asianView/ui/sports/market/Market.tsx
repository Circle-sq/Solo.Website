import { useAtomValue } from 'jotai';
import { memo } from 'react';

import {
    marketActiveSelectorFamily,
    marketDisplayedSelectorFamily,
    marketNameSelectorFamily,
} from 'src/store/events/selectors/market';

import LockIcon from '../../../icons/LockIcon';

import MarketSelections from './MarketSelections';
import { S_CellCentered, S_MarketWrapper, S_NoMarketPlaceholder } from './styled';

interface Props {
    marketId: number;
    eventId: number;
}

const Market = ({ marketId, eventId }: Props) => {
    const active = useAtomValue(marketActiveSelectorFamily(marketId));
    const displayed = useAtomValue(marketDisplayedSelectorFamily(marketId));
    const marketName = useAtomValue(marketNameSelectorFamily(marketId));

    if (!displayed) {
        return <S_NoMarketPlaceholder data-testid='market-placeholder' />;
    }

    return (
        <S_MarketWrapper data-testid={`market-${marketName}`}>
            {active ? (
                <MarketSelections marketId={marketId} eventId={eventId} />
            ) : (
                <S_CellCentered>
                    <LockIcon />
                </S_CellCentered>
            )}
        </S_MarketWrapper>
    );
};

export default memo(Market);
