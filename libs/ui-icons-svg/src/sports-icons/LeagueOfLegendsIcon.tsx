import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const LeagueOfLegendsIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width='100pt'
        height='100pt'
        viewBox='0 0 100 100'
        role='img'
        aria-label='leagueOfLegendsIcon'
        data-testid='leagueOfLegendsIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M50 66.668V8.332H19.168L25 25.832V70L14.168 91.668H77.5l12.5-25zm22.5 16.664h-45l5.832-11.664v-47.5l-2.5-7.5h10.836V75h35z' />
            <path d='M79.168 50c0 4.582-.832 8.75-2.918 12.5h9.168c1.25-3.75 2.082-7.918 2.082-12.5 0-19.168-14.582-35-33.332-37.082v8.332c14.164 2.082 25 14.168 25 28.75M20.832 26.668C15.832 32.918 12.5 41.25 12.5 50s3.332 17.082 8.332 23.332z' />
        </g>
    </SvgIcon>
);

export default LeagueOfLegendsIcon;
