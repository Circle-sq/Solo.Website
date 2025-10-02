import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const UpArrowIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='upArrowIcon'
        data-testid='upArrowIcon'
        {...props}
    >
        <path fill='#606060' d='m2.82 19.329 9.18-9.06 9.18 9.06 2.82-2.79L12 4.672 0 16.54z' />
    </SvgIcon>
);

export default UpArrowIcon;
