import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const RightArrowIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='rightArrowIcon'
        data-testid='rightArrowIcon'
        {...props}
    >
        <path fill='#606060' d='m4.671 2.82 9.06 9.18-9.06 9.18L7.461 24l11.868-12L7.46 0z' />
    </SvgIcon>
);

export default RightArrowIcon;
