import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const CircleIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={34}
        height={34}
        fill='none'
        viewBox='0 0 34 34'
        role='img'
        aria-label='circleIcon'
        data-testid='circleIcon'
        {...props}
    >
        <circle cx={17} cy={17} r={16.25} stroke='url(#Circle_svg__a)' strokeOpacity={0.7} strokeWidth={1.5} />
        <defs>
            <linearGradient id='Circle_svg__a' x1={17} x2={17} y1={0} y2={34} gradientUnits='userSpaceOnUse'>
                <stop stopColor='#D6D6D6' />
                <stop offset={1} stopColor='#282A38' />
            </linearGradient>
        </defs>
    </SvgIcon>
);

export default CircleIcon;
