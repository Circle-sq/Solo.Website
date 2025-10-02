import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const NoBetsIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={40}
        height={43}
        fill='none'
        viewBox='0 0 40 43'
        role='img'
        aria-label='noBetsIcon'
        data-testid='noBetsIcon'
        {...props}
    >
        <path
            stroke='#D6D6D6'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6.023 30.572A17.4 17.4 0 0 1 1 18.308C1.01 10.036 6.811 2.933 14.843 1.33c8.03-1.602 16.073 2.738 19.203 10.38 3.131 7.644.47 16.45-6.347 21.034a17.06 17.06 0 0 1-21.676-2.173M29.534 32.455 39 42'
        />
        <rect width={2} height={15} x={22.606} y={11.7} fill='#D6D6D6' rx={1} transform='rotate(45 22.606 11.7)' />
        <rect width={2} height={15} x={12.236} y={13.161} fill='#D6D6D6' rx={1} transform='rotate(-45 12.236 13.161)' />
    </SvgIcon>
);

export default NoBetsIcon;
