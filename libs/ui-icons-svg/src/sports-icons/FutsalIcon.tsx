import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const FutsalIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='futsalIcon'
        data-testid='futsalIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M256 68.5C152.6 68.5 68.5 152.6 68.5 256S152.6 443.5 256 443.5 443.5 359.4 443.5 256 359.4 68.5 256 68.5m116.5 281.8-46.3.8-13.8 43.8C295 402 276 406 256 406s-39-4-56.4-11.1l-13.8-43.8-46.3-.8C118.6 324.5 106 291.7 106 256c0-2.5.3-5 .4-7.4l41-23.9-12.4-56.9c19.1-26.2 46.4-46 78.2-55.5l42.9 31.2 42.9-31.2c31.8 9.5 59 29.3 78.2 55.5l-12.4 56.8 40.9 23.9c.1 2.5.4 4.9.4 7.4-.1 35.8-12.7 68.6-33.6 94.4' />
            <path d='m185.5 232.2 26.9 82.9h87.2l26.9-82.9L256 181z' />
        </g>
    </SvgIcon>
);

export default FutsalIcon;
