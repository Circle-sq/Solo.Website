import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const ArrowUpDiagonalIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={10}
        height={11}
        fill='none'
        viewBox='0 0 10 11'
        role='img'
        aria-label='arrowUpDiagonalIcon'
        data-testid='arrowUpDiagonalIcon'
        {...props}
    >
        <path
            stroke='#fff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeOpacity={0.8}
            strokeWidth={1.6}
            d='M5 9.4V.913m0 0L1.182 4.732M5 .914l3.818 3.818'
        />
    </SvgIcon>
);

export default ArrowUpDiagonalIcon;
