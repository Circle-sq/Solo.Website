import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const BackspaceIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={11}
        height={8}
        fill='none'
        viewBox='0 0 11 8'
        role='img'
        aria-label='backspaceIcon'
        data-testid='backspaceIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M9.978 0H3.31a.84.84 0 0 0-.707.391L.2 4l2.404 3.604c.16.236.4.396.707.396h6.667c.489 0 .889-.4.889-.889V.89c0-.489-.4-.889-.89-.889M8.644 5.596l-.626.626-1.596-1.595-1.595 1.595-.627-.626L5.796 4 4.2 2.404l.627-.626 1.595 1.595 1.596-1.595.626.626L7.05 4z'
        />
    </SvgIcon>
);

export default BackspaceIcon;
