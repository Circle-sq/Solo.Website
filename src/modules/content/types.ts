import type { UserSettings } from '@sc-account/types';
import type { IconCategory } from 'src/common/enums';

export interface Content {
    items: Record<string, unknown>;
    filters: Record<string, unknown>;
    userSettings?: UserSettings;
    icons?: ContentIcons;
}

export interface ContentIcons {
    _state: string;
    items: Record<IconCategory, CategoryIcons>;
}

export type CategoryIcons = Record<string, CategoryIcon>;

export interface CategoryIcon {
    id: number;
    url: string;
}
