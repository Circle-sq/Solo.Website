import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const LeftArrowIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='leftArrowIcon'
        data-testid='leftArrowIcon'
        {...props}
    >
        <path fill='#606060' d='M19.329 21.18 10.269 12l9.06-9.18L16.539 0 4.672 12 16.54 24z' />
    </SvgIcon>
);

export default LeftArrowIcon;
