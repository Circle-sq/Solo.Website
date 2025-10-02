import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const LeftUpArrowIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={14}
        height={14}
        fill='none'
        viewBox='0 0 14 14'
        role='img'
        aria-label='leftUpArrowIcon'
        data-testid='leftUpArrowIcon'
        {...props}
    >
        <path
            stroke='#73768E'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13 13 1 1m0 0v10.8M1 1h10.8'
        />
    </SvgIcon>
);

export default LeftUpArrowIcon;
