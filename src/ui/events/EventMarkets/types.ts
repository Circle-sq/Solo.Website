import type { MarketModel } from 'src/appState/models/models/MarketModel';

export const DEFAULT_TAB_NAME = 'default';

export interface MarketGroupUI {
    groupName: string;
    displayOrder: number;
    markets: MarketModel[];
    customName?: string;
    description?: string;
}

export interface MarketTemplateDescription {
    templateId: string;
    description: string;
    active?: boolean;
}

export interface MarketTemplatesDescriptionsResponse {
    results: MarketTemplateDescription[];
}

export interface NormalizedMarketTemplateDescription {
    [key: string]: MarketTemplateDescription;
}

export interface MarketDescriptionGroup {
    hasDescription?: boolean;
    active?: boolean;
}

export interface NormalizedMarketDescriptionGroups {
    [key: string]: MarketDescriptionGroup;
}
