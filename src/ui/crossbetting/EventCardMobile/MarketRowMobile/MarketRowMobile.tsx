import get from 'lodash/get';
import isNull from 'lodash/isNull';

import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { SelectionIdentifier } from 'src/common/enums';
import CrossBetSelection from 'src/ui/crossbetting/CrossBetSelection/CrossBetSelection';
import { getSelection } from 'src/ui/crossbetting/EventCardMobile/MarketRowMobile/helpers';
import MarketDrawSelection from 'src/ui/crossbetting/EventCardMobile/MarketRowMobile/MarketDrawSelection';

import { S_MarketRowMobile, S_SelectionItemMobile, S_SelectionMobile } from './styled';

const MarketRowMobile = ({ market }: { market: MarketModel }) => {
    const { line, templateId, id: marketId, selections, revision } = market;
    const marketLine = line ?? 0;

    const { homeSelection, awaySelection, drawSelection, overSelection, isHandicap } = getSelection(selections);

    const hasHomeLine = Boolean(get(homeSelection, 'line'));
    const hasOverSelection = !isNull(overSelection);
    const isMoneyLine = templateId.includes(SelectionIdentifier.MoneyLine);

    return (
        <SubscribeElement key={marketId} id={marketId} subKey={SubKey.xbet_market} revision={revision}>
            <S_MarketRowMobile data-testid={`crossbetMarketId-${marketId}`}>
                <S_SelectionItemMobile>
                    {homeSelection && (
                        <S_SelectionMobile data-testid='selectionHome'>
                            <CrossBetSelection
                                selectionId={homeSelection.id}
                                identifier={SelectionIdentifier.Home}
                                isHandicap={isHandicap ? hasHomeLine : false}
                            />
                        </S_SelectionMobile>
                    )}
                </S_SelectionItemMobile>

                <S_SelectionItemMobile>
                    <MarketDrawSelection
                        selection={drawSelection}
                        marketLine={marketLine}
                        isHandicap={isHandicap}
                        isMoneyLine={isMoneyLine}
                        hasHomeLine={hasHomeLine}
                        hasOverSelection={hasOverSelection}
                    />
                </S_SelectionItemMobile>

                <S_SelectionItemMobile>
                    {awaySelection && (
                        <S_SelectionMobile data-testid='selectionAway' isAway>
                            <CrossBetSelection
                                selectionId={awaySelection.id}
                                identifier={SelectionIdentifier.Away}
                                isHandicap={isHandicap ? hasHomeLine : false}
                            />
                        </S_SelectionMobile>
                    )}
                </S_SelectionItemMobile>
            </S_MarketRowMobile>
        </SubscribeElement>
    );
};

export default MarketRowMobile;
