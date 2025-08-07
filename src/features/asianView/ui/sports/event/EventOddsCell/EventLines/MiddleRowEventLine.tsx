import Market from '../../../market/Market';
import { S_MarketWrapper } from '../../../market/styled';
import { S_RowEventOddsGrid } from '../styled';

interface Props {
    eventId: number;
    mainLineMarketIds: number[];
}

const MiddleRowEventLine = ({ eventId, mainLineMarketIds }: Props) => {
    return (
        <S_RowEventOddsGrid height={68}>
            {mainLineMarketIds.map((marketId) => {
                if (marketId < 0) {
                    return <S_MarketWrapper key={marketId} data-testid='market-placeholder' />;
                }

                return <Market key={marketId} marketId={marketId} eventId={eventId} />;
            })}
        </S_RowEventOddsGrid>
    );
};

export default MiddleRowEventLine;
