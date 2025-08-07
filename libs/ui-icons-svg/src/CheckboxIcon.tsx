import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const CheckboxIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='checkboxIcon'
        data-testid='checkboxIcon'
        {...props}
    >
        <path
            fill='#606060'
            d='M21.333 0H2.667C1.187 0 0 1.2 0 2.667v18.666A2.666 2.666 0 0 0 2.667 24h18.666C22.813 24 24 22.8 24 21.333V2.667A2.666 2.666 0 0 0 21.333 0m-12 18.667L2.667 12l1.88-1.88 4.786 4.773 10.12-10.12 1.88 1.894z'
        />
    </SvgIcon>
);

export default CheckboxIcon;
