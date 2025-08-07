import type { ReactNode } from 'react';
import type { Testable } from 'src/utils/Testable/types';

export interface Props extends Testable {
    label?: ReactNode;
    className?: string;
}
