import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const HandballIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='handballIcon'
        data-testid='handballIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M417.3 409.8 274.8 302.9v-88.5l60.8-15.2c5.2-1.3 9.6-4.8 12.1-9.5 2.5-4.8 2.8-10.4.9-15.4L328 120.9c-3-7.9-10.8-12.3-18.9-11.7 1.9-3.8 3.1-8 3.1-12.6 0-15.5-12.6-28.1-28.1-28.1S256 81.1 256 96.6s12.6 28.1 28.1 28.1c3 0 5.8-.6 8.5-1.5-.9 3.6-1 7.3.4 11l12.9 33.6-49.9 12.6-.4.1-4.1 1c-.4.1-.7.3-1.1.5l-36.8 10.6h-.5l-7.7 2.3-6.1 1.8.1.1-98.8 30c-9.9 3-15.5 13.5-12.5 23.4s13.5 15.5 23.4 12.5l88.3-26.8v132.6c0 3.7 1.1 7.3 3.2 10.4l37.5 56.3c3.6 5.4 9.6 8.3 15.6 8.3 3.6 0 7.2-1 10.4-3.1 8.6-5.7 10.9-17.4 5.2-26l-34.3-51.5v-41.1l7.5 5.5v.1l150 112.5c3.4 2.5 7.3 3.8 11.2 3.8 5.7 0 11.3-2.6 15-7.5 6.1-8.5 4.4-20.2-3.8-26.4' />
            <circle cx={227.6} cy={153.1} r={28.4} />
        </g>
    </SvgIcon>
);

export default HandballIcon;
