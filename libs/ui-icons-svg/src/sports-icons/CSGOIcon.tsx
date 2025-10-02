import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const CsgoIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='csgoIcon'
        data-testid='csgoIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M404.7 237.3c-8.5-67.7-62.2-121.4-129.9-129.9V68.5h-37.5v38.8c-67.7 8.5-121.4 62.2-129.9 129.9H68.5v37.5h38.8c8.5 67.7 62.2 121.4 129.9 129.9v38.8h37.5v-38.8c67.7-8.5 121.4-62.2 129.9-129.9h38.8v-37.5h-38.7zM256 368.5c-62 0-112.5-50.5-112.5-112.5S194 143.5 256 143.5 368.5 194 368.5 256 318.1 368.5 256 368.5' />
            <path d='M256 218.5c-20.7 0-37.5 16.8-37.5 37.5s16.8 37.5 37.5 37.5 37.5-16.8 37.5-37.5-16.8-37.5-37.5-37.5' />
        </g>
    </SvgIcon>
);

export default CsgoIcon;
