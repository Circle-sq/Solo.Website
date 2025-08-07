interface Background {
    id: number;
    label: null | string;
    url: string;
    width: number;
    height: number;
    caption: null | string;
    sha1: string;
    altText: null | string;
}

interface ContentType {
    contentTypeId: number;
    contentTypeName: string;
    contentTypeDescription: string;
}

export interface Notification {
    id: number;
    universe: string;
    title: string;
    background: Background;
    contentType: ContentType;
    sport: null | string;
    content: string;
    published: boolean;
    displayOrder: number;
    openUrl: string;
    buttonLabel: null | string;
    buttonUrl: null | string;
    eventId: null | number;
    marketId: null | number;
    selectionId: null | number;
    lang: string;
    clientLabel: string | null;
    dateStart: string;
    dateStop: string;
    open?: boolean;
}
