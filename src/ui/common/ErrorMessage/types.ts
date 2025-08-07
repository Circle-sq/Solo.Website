import type { ReactElement } from 'react';
import type { Testable } from 'src/utils/Testable/types';

export type IconColor = 'red';

export interface ErrorMessageProps extends Testable {
    showIcon?: boolean;
    header?: ReactElement;
    error: string | ReactElement;
    iconColor?: IconColor;
    single?: boolean;
    children?: ReactElement;
}

export interface Icon {
    color?: IconColor;
}
