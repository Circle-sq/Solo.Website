export interface StorageGoBackBetSlipCounterValue {
    routerName: string;
    selectedMarket: string | number;
    routerCounter: number;
}

export interface OnGoBackButtonClick {
    name: string;
    market: string | number;
}
