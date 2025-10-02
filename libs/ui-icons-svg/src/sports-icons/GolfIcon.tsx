import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const GolfIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='golfIcon'
        data-testid='golfIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M199.7 106v112.5l150.1-56.3z' />
            <circle cx={377.9} cy={415.4} r={28.1} />
            <path d='M171.6 368.5c-3.2 0-6.3.3-9.4.5V87.3c0-10.4-8.4-18.8-18.8-18.8s-18.8 8.4-18.8 18.8v292.6c-11.6 6.8-18.8 16-18.8 26.2 0 20.7 29.4 37.5 65.6 37.5s65.6-16.8 65.6-37.5c.2-20.8-29.1-37.6-65.4-37.6' />
        </g>
    </SvgIcon>
);

export default GolfIcon;
