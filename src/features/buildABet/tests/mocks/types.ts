export interface MockMarket {
    id: number;
    value: string;
    marketData: { tags: Record<string, string[]> };
    visible: boolean;
}

export interface MockEvent {
    eventId: number;
    markets: MockMarket[];
}
