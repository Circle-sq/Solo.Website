import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const FootballIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='footballIcon'
        data-testid='footballIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M256 68.5C152.4 68.5 68.5 152.4 68.5 256S152.4 443.5 256 443.5 443.5 359.6 443.5 256 359.6 68.5 256 68.5m114.9 283.7-6.9-21.7-63.7-2.2-26.5 58 16.1 15.7c-10.9 2.5-22.2 4-33.9 4-11.9 0-23.5-1.5-34.6-4.2l15.9-15.5-26.5-58-63.7 2.2-6.7 21c-16.7-20.2-28.1-44.9-32.4-71.9l24 9.7 42.4-47.7-27.7-57.4-23.6 2.5c17.4-33.2 46.8-59 82.4-71.8l-5.7 22.9 56.3 37.5 56.3-37.5-5.7-22.9c35.6 12.8 65 38.6 82.4 71.8l-23.9-2.6-27.7 57.4 42.4 47.7 24.3-9.8c-4.6 27.4-16.2 52.4-33.3 72.8' />
            <path d='m199.8 256 18.7 56.3h75l18.8-56.3-56.3-56.2z' />
        </g>
    </SvgIcon>
);

export default FootballIcon;
