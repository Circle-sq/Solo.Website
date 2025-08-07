export interface AsianViewSportConfig {
    event: string;
    sport: string;
    startTime: string;
    primaryGroup: SportConfigGroup;
    secondaryGroup: SportConfigGroup;
    id?: number;
}

export interface SportConfigGroup {
    name: string;
    markets: MarketConfig[];
}

export interface MarketConfig {
    id: string;
    name: string;
    order: number;
}
