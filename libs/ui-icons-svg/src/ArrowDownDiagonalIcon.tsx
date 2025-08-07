import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const ArrowDownDiagonalIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={10}
        height={11}
        fill='none'
        viewBox='0 0 10 11'
        role='img'
        aria-label='arrowDownDiagonalIcon'
        data-testid='arrowDownDiagonalIcon'
        {...props}
    >
        <path
            stroke='#fff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeOpacity={0.8}
            strokeWidth={1.6}
            d='M5 .914V9.4m0 0 3.818-3.818M5 9.399 1.182 5.581'
        />
    </SvgIcon>
);

export default ArrowDownDiagonalIcon;
