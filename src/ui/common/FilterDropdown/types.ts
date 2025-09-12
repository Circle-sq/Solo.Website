import type { ReactElement, ReactNode } from 'react';

export interface DefaultOption {
    label: ReactElement;
    value: string[] | undefined;
}

export interface Option {
    label: string | ReactNode | undefined;
    value: string;
    icon?: string;
    params?: {
        market: string;
    };
    disabled?: boolean;
}

export interface Market {
    isMarket?: boolean;
}

export interface DropdownOptionsContainer {
    showAllItems: boolean;
}
