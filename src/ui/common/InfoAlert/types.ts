import type { ReactElement } from 'react';

export interface AlertIconConfig {
    [key: string]: {
        icon: ReactElement;
    };
}

export interface IconType {
    type: string;
}

export interface IconPosition {
    iconPosition?: string;
}

export enum AlertIcon {
    Warning = 'warning',
    Error = 'error',
    Success = 'success',
    Info = 'info',
}
