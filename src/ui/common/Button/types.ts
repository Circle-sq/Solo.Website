import type { MouseEventHandler, ReactNode } from 'react';

import type { Testable } from 'src/utils/Testable/types';

export type ButtonSizes = 'large' | 'medium' | 'small' | 'xs';
export type Color = 'green' | 'yellow' | 'grey' | 'greenLight' | 'greyLight';

interface Params {
    [paramId: string]: string | null;
}

interface CoreButton extends Testable {
    color?: Color;
    route?: string;
    params?: Params;
    onClick?: MouseEventHandler;
    size?: ButtonSizes;
    disabled?: boolean;
    children?: ReactNode;
    loading?: boolean;
    className?: string;
}

export interface Props extends CoreButton, Testable {
    type?: 'button' | 'reset' | 'submit' | 'anchor';
    isMultiples?: boolean;
}

export interface ActionButtonProps extends CoreButton {
    type?: 'button' | 'reset' | 'submit';
}
