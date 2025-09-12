import type { ReactNode } from 'react';

export interface Option {
    label: string | ReactNode | undefined;
    value: string;
    icon?: string;
    params?: {
        market: string;
    };
    disabled?: boolean;
}
