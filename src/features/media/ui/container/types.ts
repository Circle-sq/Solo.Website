import type { ReactElement, ReactNode } from 'react';

export interface Tab {
    name: string;
    icon: ReactElement;
    iconActive: ReactElement;
    component: ReactNode;
    onClickHandler: () => void;
    isActiveTab: (tabName: string) => boolean;
}
