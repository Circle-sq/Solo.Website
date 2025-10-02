import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const FootballFieldActiveIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={16}
        height={12}
        fill='none'
        viewBox='0 0 16 12'
        role='img'
        aria-label='footballFieldActiveIcon'
        data-testid='footballFieldActiveIcon'
        {...props}
    >
        <path
            fill='#D6D6D6'
            d='M16 4.364h-2.133v3.272H16zM8 7.091c.589 0 1.067-.488 1.067-1.09S8.589 4.908 8 4.908c-.59 0-1.067.489-1.067 1.091 0 .603.478 1.091 1.067 1.091'
        />
        <path
            fill='#D6D6D6'
            d='M14.4 0H8.533v3.896c.458.118.864.39 1.154.771s.447.85.447 1.333-.158.952-.447 1.333a2.12 2.12 0 0 1-1.154.771V12H14.4c.424 0 .83-.173 1.13-.48s.47-.723.47-1.156V8.727h-2.667a.53.53 0 0 1-.377-.16.55.55 0 0 1-.156-.385V3.818c0-.144.056-.283.156-.386.1-.102.236-.16.377-.16H16V1.637c0-.433-.17-.85-.47-1.156-.3-.307-.706-.48-1.13-.48M5.867 6c.001-.482.159-.95.448-1.332.29-.38.695-.652 1.152-.772V0H1.6C1.176 0 .77.173.47.48S0 1.203 0 1.636v1.637h2.667c.141 0 .277.057.377.16.1.102.156.24.156.385v4.364a.55.55 0 0 1-.156.386.53.53 0 0 1-.377.16H0v1.636c0 .433.17.85.47 1.156.3.307.706.48 1.13.48h5.867V8.104a2.13 2.13 0 0 1-1.152-.772A2.2 2.2 0 0 1 5.867 6'
        />
        <path fill='#D6D6D6' d='M2.133 4.364H0v3.272h2.133z' />
    </SvgIcon>
);

export default FootballFieldActiveIcon;
