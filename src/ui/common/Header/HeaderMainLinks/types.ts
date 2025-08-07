import type { Testable } from 'src/utils/Testable/types';

export interface HeaderItem extends Testable {
    route: string;
    langKey: string;
    defaultText: string;
    params: Readonly<Record<string, string>>;
    isActive: (route: string, isLive: boolean) => boolean;
}
