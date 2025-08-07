import type { ReactElement } from 'react';

export interface EventFilterOption {
    label: string | ReactElement;
    value: string | string[] | undefined;
    count?: number;
    icon: ReactElement;
    globalDisplayOrder?: number;
}
