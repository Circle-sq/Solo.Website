import type { Testable } from 'src/utils/Testable/types';

export interface IconProps extends Testable {
    className?: string;
    width?: string;
    height?: string;
    isActive?: boolean;
    viewBox?: string;
    size?: string;
    fill?: string;
    onClick?: () => void;
}
