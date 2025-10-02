import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const AthleticsIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='athleticsIcon'
        data-testid='athleticsIcon'
        {...props}
    >
        <g fill='#fff'>
            <circle cx={348.9} cy={116.4} r={37.3} />
            <path d='M438 188.4c-7.3-7.3-19.1-7.3-26.4 0l-34.1 34.1-39.4-39.4-23.5-23.5c-2.1-2.1-4.6-3.4-7.3-4.3-2.3-1-4.8-1.6-7.5-1.6H181c-10.3 0-18.7 8.3-18.7 18.7 0 10.3 8.4 18.7 18.7 18.7h76l-51.8 51.8c-3.5 3.5-5.5 8.2-5.5 13.2s2 9.7 5.5 13.2l.4.4L74 401.1c-7.3 7.3-7.3 19.1 0 26.4 3.6 3.6 8.4 5.5 13.2 5.5s9.5-1.8 13.2-5.5L231.9 296l33.7 33.7-54.7 54.7c-7.3 7.3-7.3 19.1 0 26.4 3.6 3.6 8.4 5.5 13.2 5.5s9.5-1.8 13.2-5.5l67.9-67.9c3.5-3.5 5.5-8.2 5.5-13.2s-2-9.7-5.5-13.2l-37-36.9 56.8-56.8 39.4 39.4c3.6 3.6 8.4 5.5 13.2 5.5s9.5-1.8 13.2-5.5l47.3-47.3c7.2-7.4 7.2-19.2-.1-26.5' />
        </g>
    </SvgIcon>
);

export default AthleticsIcon;
