import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const LiveSportsIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='liveSportsIcon'
        data-testid='liveSportsIcon'
        {...props}
    >
        <path fill='#D82E28' d='M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0' />
    </SvgIcon>
);

export default LiveSportsIcon;
