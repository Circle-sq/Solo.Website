import type { MarketTemplateTabs } from 'src/ui/events/DisplayTemplates/types';

export interface GetDefaultSelectedTabProps {
    availableTabs: MarketTemplateTabs;
    staticTabOrder?: string[];
}
