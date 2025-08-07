import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const LiveStreamingIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='liveStreamingIcon'
        data-testid='liveStreamingIcon'
        {...props}
    >
        <path
            fill='#8A8A8A'
            d='M3.661 3.763h19.017c.305.101.61.203.915.508.204.305.407.61.407 1.119v.305l-2.136 13.22c-.101.407-.203.712-.508.916-.305.305-.61.406-1.017.406H1.322c-.305-.101-.61-.203-.915-.508C.203 19.424 0 19.119 0 18.61v-.305l2.136-13.22c.101-.407.203-.712.508-.916.305-.305.61-.406 1.017-.406m18.814 1.525H3.66v.102L1.525 18.61v.204H20.34v-.102l2.136-13.22v-.204m-7.017 6.814c.406.406.305 1.017-.204 1.322l-4.678 2.034c-.508.203-1.118-.204-1.017-.814l.916-5.085c.101-.61.813-.813 1.22-.508l3.864 3.152z'
        />
    </SvgIcon>
);

export default LiveStreamingIcon;
