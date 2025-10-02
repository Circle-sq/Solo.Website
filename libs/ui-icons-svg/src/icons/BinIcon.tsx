import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const BinIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='binIcon'
        data-testid='binIcon'
        {...props}
    >
        <path
            fill='#606060'
            fillRule='evenodd'
            d='M4.01 21.333A2.673 2.673 0 0 0 6.672 24h10.654c1.465 0 2.664-1.2 2.664-2.667v-16H4.009zM6.672 8h10.654v13.333H6.673zm9.988-6.667L15.33 0H8.67L7.34 1.333H2.677V4h18.646V1.333zM10.177 9.7a.5.5 0 0 1 .5.5v9a.5.5 0 1 1-1 0v-9a.5.5 0 0 1 .5-.5m4.25.5a.5.5 0 1 0-1 0v9a.5.5 0 0 0 1 0z'
            clipRule='evenodd'
        />
    </SvgIcon>
);

export default BinIcon;
