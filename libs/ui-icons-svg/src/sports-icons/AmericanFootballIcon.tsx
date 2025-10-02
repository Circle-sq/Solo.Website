import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const AmericanFootballIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='americanFootballIcon'
        data-testid='americanFootballIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M435.1 76.9C189.4 29.1 29.1 189.4 76.9 435.1c245.7 47.8 406-112.5 358.2-358.2m-72.3 147.2-26.5 26.5-24.2-24.2-29.6 29.6 24.2 24.2-26.5 26.5-24.2-24.2-29.7 29.7 24.2 24.2-26.5 26.5-24.2-24.2-24.2 24.2-26.5-26.5 24.2-24.2-24.2-24.2 26.5-26.5 24.2 24.2 29.7-29.7-24.2-24.2 26.5-26.5 24.2 24.2 29.7-29.7-24.2-24.2 26.5-26.5 24.2 24.2 24.2-24.2 26.5 26.5-24.2 24.2z'
        />
    </SvgIcon>
);

export default AmericanFootballIcon;
