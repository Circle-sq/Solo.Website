import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const PlayActiveIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={16}
        height={12}
        fill='none'
        viewBox='0 0 16 12'
        role='img'
        aria-label='playActiveIcon'
        data-testid='playActiveIcon'
        {...props}
    >
        <path
            fill='#D6D6D6'
            fillRule='evenodd'
            d='M1 0a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm9.25 6.433a.5.5 0 0 0 0-.866l-3-1.732a.5.5 0 0 0-.75.433v3.464a.5.5 0 0 0 .75.433z'
            clipRule='evenodd'
        />
    </SvgIcon>
);

export default PlayActiveIcon;
