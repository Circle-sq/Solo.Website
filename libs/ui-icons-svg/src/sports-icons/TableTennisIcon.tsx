import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const TableTennisIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='tableTennisIcon'
        data-testid='tableTennisIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='m436.6 373.2-74-60.5c15.5-24.6 24.6-53.6 24.6-84.8 0-.5-.1-1-.1-1.5L226.3 387.2c.5 0 1 .1 1.5.1 31.2 0 60.2-9.1 84.8-24.6l60.5 74c7 8.6 19.9 9.2 27.8 1.4l37-37c8-7.9 7.3-20.8-1.3-27.9M227.9 68.5c-88 0-159.4 71.4-159.4 159.4 0 71.5 47.1 132 111.9 152.2L380 180.5c-20.1-64.9-80.6-112-152.1-112m9.3 112.5c-20.7 0-37.5-16.8-37.5-37.5s16.8-37.5 37.5-37.5 37.5 16.8 37.5 37.5S258 181 237.2 181' />
        </g>
    </SvgIcon>
);

export default TableTennisIcon;
