import { useAtomValue } from 'jotai';

import { linesRange } from '@solo-asianView/configs';
import { linesFilterAtom } from '@solo-asianView/store/filters';
import { S_MarketWrapper } from '@solo-asianView/ui/sports/market/styled';

import { eventInPlaySelectorFamily } from 'src/store/events/selectors/event';

import { S_RowEventOddsGrid, S_RowEventOddsGridLive } from '../styled';

import ExtremeRowEventMarketLine from './ExtremeRowEventMarketLine';

interface Props {
    eventId: number;
    mainLineMarketIds: number[];
    position: 'top' | 'bottom';
}

const ExtremeRowEventLines = ({ eventId, mainLineMarketIds, position }: Props) => {
    const linesFilter = useAtomValue(linesFilterAtom);
    const isLive = useAtomValue(eventInPlaySelectorFamily(eventId));

    const lines = linesRange[linesFilter];
    const offsetMultiplier = position === 'top' ? -1 : 1;

    const RowEventOddsGrid = isLive ? S_RowEventOddsGridLive : S_RowEventOddsGrid;

    return (
        <>
            {lines[position].map((line) => {
                const lineKey = `${position}-lines-${line}`;
                const offset = line * offsetMultiplier;

                return (
                    <RowEventOddsGrid key={lineKey}>
                        {mainLineMarketIds.map((marketId) => {
                            if (marketId < 0) {
                                return <S_MarketWrapper key={marketId} data-testid='market-placeholder' />;
                            }

                            return (
                                <ExtremeRowEventMarketLine
                                    key={marketId}
                                    eventId={eventId}
                                    marketId={marketId}
                                    offset={offset}
                                />
                            );
                        })}
                    </RowEventOddsGrid>
                );
            })}
        </>
    );
};

export default ExtremeRowEventLines;
