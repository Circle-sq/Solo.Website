export type ParamIds = Readonly<{
    eventId?: number;
    marketId?: number;
    selectionId?: number;
}>;

export interface TemplateMarketsIds {
    [templateId: string]: number;
}

export interface EventTemplateMarketsIds {
    [eventId: number]: TemplateMarketsIds;
}
