import { useMemo } from 'react';

import { SelectionIdentifier } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';
import CrossBetSelection from 'src/ui/crossbetting/CrossBetSelection/CrossBetSelection';
import { formatHandicapPrice } from 'src/ui/crossbetting/EventCardMobile/MarketRowMobile/helpers';
import { S_Selection } from 'src/ui/crossbetting/EventCardMobile/MarketRowMobile/styled';
import type { MarketDrawSelectionProps } from 'src/ui/crossbetting/EventCardMobile/types';
import { formatNumber } from 'src/utils/format';

const MarketDrawSelection = ({
    selection,
    marketLine,
    isHandicap,
    isMoneyLine,
    hasHomeLine,
    hasOverSelection,
}: MarketDrawSelectionProps) => {
    const formattedMarketLine = useMemo(() => {
        if (isHandicap) {
            const handicapPrice = formatNumber(formatHandicapPrice(marketLine));

            return <span data-testid={`handicap-${handicapPrice}`}>{handicapPrice}</span>;
        }

        if (hasOverSelection && marketLine > 0) {
            const marketLineNumber = formatNumber(marketLine);

            return <span data-testid={`overUnder-${marketLineNumber}`}>{marketLineNumber}</span>;
        }

        return null;
    }, [hasOverSelection, isHandicap, marketLine]);

    if (selection !== null) {
        return (
            <S_Selection data-testid='selectionDraw' isDraw>
                <CrossBetSelection
                    selectionId={selection.id}
                    identifier={SelectionIdentifier.Draw}
                    isHandicap={isHandicap ? hasHomeLine : false}
                />
            </S_Selection>
        );
    }

    return (
        <>
            {isMoneyLine && <I18n langKey='crossbet.money-line.label' defaultText='vs' />}
            {formattedMarketLine}
        </>
    );
};

export default MarketDrawSelection;
