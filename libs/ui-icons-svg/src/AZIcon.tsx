import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const AZIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='aZIcon'
        data-testid='aZIcon'
        {...props}
    >
        <path
            fill='#EEB217'
            d='M19.105 0H4.895C2.195 0 0 2.243 0 5v14c0 2.757 2.196 5 4.895 5h14.21c2.7 0 4.895-2.243 4.895-5V5c0-2.757-2.196-5-4.895-5m0 19H15.19c-1.28-.006-1.28-1.994 0-2h3.915c1.28.006 1.28 1.994 0 2m0-6H15.19c-1.28-.006-1.28-1.994 0-2h3.915c1.28.006 1.28 1.994 0 2m0-6H15.19c-1.28-.006-1.28-1.994 0-2h3.915c1.28.006 1.28 1.994 0 2'
        />
        <path
            fill='#0F0F0F'
            d='M5 20.43v-1.48l3.639-4.639.27.838H5.094v-1.87h5.758v1.482l-3.64 4.638-.27-.838H11v1.87zM4 10.215l2.9-6.129h2.2l2.9 6.13H9.687L7.545 5.066h.872l-2.142 5.148zm1.725-1.068.57-1.488h3.051l.569 1.488z'
        />
    </SvgIcon>
);

export default AZIcon;
