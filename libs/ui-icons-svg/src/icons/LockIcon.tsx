import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const LockIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='lockIcon'
        data-testid='lockIcon'
        {...props}
    >
        <path
            fill='#606060'
            d='M17.301 12.54H5.43V6.118c0-1.689.735-3.218 1.924-4.325S10.185 0 12 0s3.456.685 4.645 1.792c1.19 1.107 1.925 2.636 1.925 4.325v6.424zm-9.334-2.362h8.066v-4.06c0-1.038-.452-1.977-1.182-2.656A4.18 4.18 0 0 0 12 2.362c-1.114 0-2.122.42-2.852 1.1S7.967 5.08 7.967 6.117z'
        />
        <path
            fill='#606060'
            d='M12.863 16.795v3.697h-1.726v-3.697c-.633-.295-1.068-.904-1.068-1.609 0-.993.864-1.798 1.93-1.798 1.068 0 1.933.805 1.933 1.798 0 .705-.436 1.314-1.07 1.61m6.925-6.915H4.212c-.67 0-1.212.506-1.212 1.13V22.87C3 23.495 3.543 24 4.212 24h15.576c.67 0 1.212-.506 1.212-1.129V11.01c0-.623-.543-1.129-1.212-1.129'
        />
    </SvgIcon>
);

export default LockIcon;
