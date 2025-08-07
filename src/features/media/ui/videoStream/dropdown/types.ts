export interface MediaOption {
    autoPlay?: boolean;
    competitionDisplayOrder: string;
    eventStartTime: string;
    externalId: string;
    id: string;
    label: string;
    name: string;
    provider: string;
    sportDisplayOrder: string;
    sportEventId: string;
    sportId: string;
    value: string;
    disabled?: boolean;
}

export interface MediaOptionGroup {
    label: string;
    value: string;
    options: MediaOption[];
}
