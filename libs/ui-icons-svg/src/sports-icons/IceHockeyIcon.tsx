import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const IceHockeyIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='iceHockeyIcon'
        data-testid='iceHockeyIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='m349.7 68.5-34.2 227.9c-2.9 19.4-20.4 33.3-40 31.8l-166.7-12.8c-21.8-1.7-40.4 15.5-40.4 37.4V406c0 20.7 16.8 37.5 37.5 37.5h232.8c27.8 0 51.5-20.4 55.6-47.9l49.1-327.1z' />
            <path d='M87.3 237.3h112.5c10.4 0 18.8-8.4 18.8-18.8V181c0-10.4-8.4-18.8-18.8-18.8H87.3c-10.4 0-18.8 8.4-18.8 18.8v37.5c0 10.4 8.4 18.8 18.8 18.8' />
        </g>
    </SvgIcon>
);

export default IceHockeyIcon;
