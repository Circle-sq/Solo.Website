import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const SuccessIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={25}
        height={24}
        fill='none'
        viewBox='0 0 25 24'
        role='img'
        aria-label='successIcon'
        data-testid='successIcon'
        {...props}
    >
        <rect width={24} height={24} x={0.75} fill='#fff' fillOpacity={0.1} rx={12} />
        <circle cx={12.75} cy={12} r={4} fill='#292B39' />
        <g clipPath='url(#Success_svg__a)'>
            <path
                fill='#8BD97F'
                fillRule='evenodd'
                d='M20.75 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0m-4.776-2.424a.6.6 0 0 1 0 .848l-4 4a.6.6 0 0 1-.848 0l-1.6-1.6a.6.6 0 1 1 .848-.848l1.176 1.175 1.788-1.787 1.788-1.788a.6.6 0 0 1 .848 0'
                clipRule='evenodd'
            />
        </g>
        <defs>
            <clipPath id='Success_svg__a'>
                <path fill='#fff' d='M4.75 4h16v16h-16z' />
            </clipPath>
        </defs>
    </SvgIcon>
);

export default SuccessIcon;
