import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 2380 2100'
        role='img'
        aria-label='checkIcon'
        data-testid='checkIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M847 2035q-22 21-48 35-29 14-53.5 14t-53.5-15q-25-13-49-36L0 1398l204-202 543 536L2180 306l201 205z'
        />
    </SvgIcon>
);

export default CheckIcon;
