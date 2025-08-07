import type { MarketModel } from 'src/appState/models/models/MarketModel';
import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';

export interface MarketDrawSelectionProps {
    selection: SelectionModel | null;
    marketLine: number;
    isHandicap: boolean;
    isMoneyLine: boolean;
    hasHomeLine: boolean;
    hasOverSelection: boolean;
}

export interface UseEventCardData {
    restMarketsToShow: MarketModel[];
    specialMarketsToShow: MarketModel[];
    showExpander: boolean;
    hiddenMarketsCount: number;
}

export interface BestMarkets {
    bestMarketsIds: number[];
    bestSpecialMarketIds: number[];
    bestMarketTemplates: string[];
    bestSpecialMarketTemplates: string[];
}
