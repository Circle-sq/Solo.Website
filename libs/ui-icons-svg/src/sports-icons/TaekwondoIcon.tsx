import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const TaekwondoIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='taekwondoIcon'
        data-testid='taekwondoIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M400.4 111.7c-7.3-7.3-19.2-7.3-26.5 0L268.1 217.5 231.6 181h43.2c10.4 0 18.8-8.4 18.8-18.8v-75c0-10.4-8.4-18.8-18.8-18.8S256 76.8 256 87.2v56.3h-58.8c-3.4 0-6.5 1.2-9.2 2.8-2.1.5-4 1.4-5.6 3l-35.5 35.5c-3.4 3.4-4.3 8.4-2.9 12.7-.1.8-.5 1.4-.5 2.2V331c0 10.4 8.4 18.8 18.8 18.8s18.8-8.4 18.8-18.8v-94.5l37.6 37.6c0 .2-.1.4-.1.6v150c0 10.4 8.4 18.8 18.8 18.8s18.8-8.4 18.8-18.8V282.5l144.3-144.3c7.2-7.3 7.2-19.2-.1-26.5M181.1 124.8c0-20.7-16.8-37.5-37.5-37.5s-37.5 16.8-37.5 37.5 16.8 37.5 37.5 37.5 37.5-16.8 37.5-37.5' />
        </g>
    </SvgIcon>
);

export default TaekwondoIcon;
