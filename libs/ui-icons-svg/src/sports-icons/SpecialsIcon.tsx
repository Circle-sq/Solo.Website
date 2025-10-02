import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const SpecialsIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='specialsIcon'
        data-testid='specialsIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M368.5 87.2V68.5h-225v18.7h-75V106c0 53.4 29.7 101.4 77.5 125.3l9.8 4.9c12.7 27.2 34.3 49.4 61.3 62.6 12.2 6 20.3 17.8 20.3 31.4 0 12.1-6.4 23.4-16.8 29.6l-77 46.2v37.5h225V406l-77-46.2c-10.4-6.2-16.8-17.5-16.8-29.6 0-13.5 8.1-25.4 20.3-31.4 26.9-13.2 48.6-35.4 61.3-62.6l9.8-4.9c47.8-23.9 77.5-71.9 77.5-125.3V87.2zm-260.8 37.5h35.8V181c0 1.5.3 3 .3 4.5-18.9-15.3-31.7-36.7-36.1-60.8m260.5 60.8c.1-1.5.3-3 .3-4.5v-56.3h35.8c-4.4 24.1-17.2 45.5-36.1 60.8'
        />
    </SvgIcon>
);

export default SpecialsIcon;
