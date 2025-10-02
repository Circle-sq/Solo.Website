import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const OlympicGamesIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='50 50 400 400'
        role='img'
        aria-label='olympicGamesIcon'
        data-testid='olympicGamesIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M312.3 312.3c31.1 0 56.3-25.2 56.3-56.3s-75-150-75-150c-4.9 25.2-11.9 49.3-18.6 71.2-22.2-50.5-56.4-108.7-56.4-108.7-16.3 83.6-75 127.3-75 168.8 0 41.4 33.6 75 75 75h-93.8V331c0 10.4 8.4 18.8 18.8 18.8h18.8v18.8c0 10.4 8.4 18.8 18.8 18.8H200v56.2h112.5v-56.2H331c10.4 0 18.8-8.4 18.8-18.8v-18.8h18.8c10.4 0 18.8-8.4 18.8-18.8v-18.8h-75.1zm-28.2 0h-46.9c-20.7 0-37.5-18.1-37.5-40.4S229 226 237.2 181c0 0 17.1 31.3 28.2 58.5 3.3-11.8 6.8-26.1 9.3-39.6 0 0 37.5 65.3 37.5 82.1.1 16.7-12.5 30.3-28.1 30.3'
        />
    </SvgIcon>
);

export default OlympicGamesIcon;
