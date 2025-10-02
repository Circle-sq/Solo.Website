import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const VolleyballIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='volleyballIcon'
        data-testid='volleyballIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M401.2 137.4 277 261.6l18.3 67.1L432 191.9c-7.2-19.9-17.6-38.4-30.8-54.5M374.6 110.8C342.3 84.4 301 68.5 256 68.5c-34.2 0-66.2 9.3-93.8 25.3l175.5 54zM307.7 177.8l-182.4-56.1c-16.8 16.4-30.5 35.9-40.3 57.6l165.9 55.3zM442.2 234.8 306.6 370.3l16.5 60.6c70.3-27 120.4-95 120.4-174.9 0-7.2-.5-14.3-1.3-21.2M176.3 249.2l44 190.8c11.6 2.2 23.4 3.5 35.6 3.5 10.6 0 20.9-1.1 31-2.8l-46.4-170.1zM73.2 214.8c-3 13.3-4.7 27-4.7 41.2 0 76 45.3 141.3 110.3 170.7l-44.2-191.4z' />
        </g>
    </SvgIcon>
);

export default VolleyballIcon;
