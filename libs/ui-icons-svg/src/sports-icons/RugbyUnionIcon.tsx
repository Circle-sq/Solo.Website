import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const RugbyUnionIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='rugbyUnionIcon'
        data-testid='rugbyUnionIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M414.1 98.6c-27-27-79.6-36.7-135.9-25.6 14.6 31.8 37.3 64.6 66.7 94.1 29.1 29.1 61.9 51.8 94.2 66.6 10.9-56.4 1.1-109-25-135.1M241.5 83.2c-34.5 12.3-68.6 32.3-97.6 61.3-28.8 28.8-48.7 62.9-60.8 97.3 38.1 16.5 76.3 42.5 110.5 76.6 34.9 34.9 60.9 73.2 77.1 110.6 34.5-12 68.7-31.7 97.5-60.5 29.1-29.1 49-63.5 61.1-98.2-38.2-16.5-76.5-42.5-110.8-76.8-34.9-34.8-60.7-72.9-77-110.3M73.1 278.3C61.9 335.2 71.7 388.2 98 414.5c25.8 25.8 78.9 35.6 136 24.6-14.6-31.8-37.3-64.7-66.8-94.2-29.1-29.1-61.9-51.8-94.1-66.6' />
        </g>
    </SvgIcon>
);

export default RugbyUnionIcon;
