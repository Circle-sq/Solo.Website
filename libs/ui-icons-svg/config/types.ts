import type { FC, SVGProps } from 'react';

export type SvgComponent = FC<SVGProps<SVGSVGElement>>;

export interface SportIcons {
    [sportName: string]: SvgComponent;
}
