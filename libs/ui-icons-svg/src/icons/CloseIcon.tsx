import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='closeIcon'
        data-testid='closeIcon'
        {...props}
    >
        <path
            fill='#606060'
            d='M15.108 7.2 12 10.308 8.892 7.2 7.2 8.892 10.308 12 7.2 15.108 8.892 16.8 12 13.692l3.108 3.108 1.692-1.692L13.692 12 16.8 8.892zM12 0C5.364 0 0 5.364 0 12s5.364 12 12 12 12-5.364 12-12S18.636 0 12 0m0 21.6c-5.292 0-9.6-4.308-9.6-9.6S6.708 2.4 12 2.4s9.6 4.308 9.6 9.6-4.308 9.6-9.6 9.6'
        />
    </SvgIcon>
);

export default CloseIcon;
