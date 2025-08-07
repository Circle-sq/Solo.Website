import type { ReactElement } from 'react';

export interface RenderMainHtmlParamsType {
    universe: string;
    data: string;
    appStateInit: string;
    portalPayload: Partial<Express.PortalRequestPayload>;
    userLang: string | null;
    statisticWidgetScript: string;
    dataToHeader: ReactElement | null;
    platformId: string | null;
}
