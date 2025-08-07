import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const ErrorSecondaryIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='errorSecondaryIcon'
        data-testid='errorSecondaryIcon'
        {...props}
    >
        <rect width={24} height={24} fill='#fff' fillOpacity={0.1} rx={12} />
        <ellipse cx={12.25} cy={11.5} fill='#292B39' rx={3.25} ry={6.5} />
        <path
            fill='#D34F44'
            d='M20 12a8 8 0 1 1-16.001 0A8 8 0 0 1 20 12m-6.999 4.127a1.014 1.014 0 1 0-2.027 0 1.014 1.014 0 0 0 2.027 0M11.2 13.26a.8.8 0 0 0 1.6 0V6.926a.8.8 0 0 0-1.6 0z'
        />
    </SvgIcon>
);

export default ErrorSecondaryIcon;
