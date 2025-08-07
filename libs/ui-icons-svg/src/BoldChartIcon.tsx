import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const BoldChartIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={12}
        height={13}
        fill='none'
        viewBox='0 0 12 13'
        role='img'
        aria-label='boldChartIcon'
        data-testid='boldChartIcon'
        {...props}
    >
        <path
            fill='#fff'
            fillRule='evenodd'
            d='M10 3h1v7h-1zM9 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zM6.5 5.25h-1V10h1zm-1-1a1 1 0 0 0-1 1V10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V5.25a1 1 0 0 0-1-1zM2 7.5H1V10h1zm-1-1a1 1 0 0 0-1 1V10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7.5a1 1 0 0 0-1-1z'
            clipRule='evenodd'
        />
    </SvgIcon>
);

export default BoldChartIcon;
