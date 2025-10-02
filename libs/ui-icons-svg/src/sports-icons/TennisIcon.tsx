import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const TennisIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='tennisIcon'
        data-testid='tennisIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M112 136c-27.1 32.5-43.5 74.3-43.5 120s16.3 87.5 43.5 120c31-30.6 50.3-73.1 50.3-120-.1-46.9-19.3-89.4-50.3-120M400 136c-31 30.6-50.3 73.1-50.3 120S369 345.4 400 376c27.1-32.5 43.5-74.3 43.5-120s-16.4-87.5-43.5-120' />
            <path d='M373.2 109.8C341.1 84 300.4 68.5 256 68.5S170.9 84 138.8 109.8c37.6 37.4 61 89.1 61 146.2s-23.3 108.8-61 146.2c32.1 25.8 72.8 41.3 117.2 41.3s85.1-15.5 117.2-41.3c-37.6-37.4-61-89.1-61-146.2.1-57.1 23.4-108.8 61-146.2' />
        </g>
    </SvgIcon>
);

export default TennisIcon;
