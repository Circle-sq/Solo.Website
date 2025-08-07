import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const DownArrowIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='downArrowIcon'
        data-testid='downArrowIcon'
        {...props}
    >
        <path fill='#606060' d='M21.18 4.671 12 13.731 2.82 4.67 0 7.461l12 11.868L24 7.46z' />
    </SvgIcon>
);

export default DownArrowIcon;
