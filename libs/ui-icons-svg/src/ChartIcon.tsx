import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const ChartIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='chartIcon'
        data-testid='chartIcon'
        {...props}
    >
        <path
            fill='#606060'
            d='M19 4h4v16h-4zm-1 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm-4 4.5h-4V20h4zm-4-1a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V8.5a1 1 0 0 0-1-1zM5 13H1v7h4zm-4-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1z'
            clipRule='evenodd'
        />
    </SvgIcon>
);

export default ChartIcon;
