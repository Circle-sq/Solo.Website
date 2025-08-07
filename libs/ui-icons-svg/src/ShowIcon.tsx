import { type SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const ShowIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={16}
        height={16}
        fill='none'
        viewBox='0 0 16 16'
        role='img'
        aria-label='showIcon'
        data-testid='showIcon'
        {...props}
    >
        <path
            stroke='#D6D6D6'
            strokeLinecap='round'
            strokeWidth={1.5}
            d='M15.25 8A7.25 7.25 0 1 1 .75 8a7.25 7.25 0 0 1 14.5 0Z'
        />
        <rect width={1.5} height={7.5} x={7.25} y={4.25} fill='#D6D6D6' rx={0.75} ry={0.75} />
        <rect width={7.5} height={1.5} x={4.25} y={7.25} fill='#D6D6D6' rx={0.75} ry={0.75} />
    </SvgIcon>
);

export default ShowIcon;
