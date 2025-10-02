import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const BadmintonIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width='100pt'
        height='100pt'
        viewBox='0 0 100 100'
        role='img'
        aria-label='badmintonIcon'
        data-testid='badmintonIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M39.023 75.645c0 6.074 4.922 10.996 10.996 10.996s10.996-4.922 10.996-10.996v-7.324H39.023zM79.297 17.051l-7.324-3.672-7.324 3.672-7.325-3.672L50 17.051l-7.324-3.672-7.324 3.672-7.324-3.672-7.325 3.672-7.324-3.672 25.645 47.598h21.973L86.622 13.38z' />
        </g>
    </SvgIcon>
);

export default BadmintonIcon;
