import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const BettingRulesIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='bettingRulesIcon'
        data-testid='bettingRulesIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M17.726 7.191V8.24H6.518V7.19zm0 3.462H6.518V9.605h11.208zm0 2.413H6.518v-1.048h11.208zm-4.51 2.414H6.518v-1.048h6.698zM4.678 2.864v19.363h14.736V2.864h-2.243v1.92c0 .378-.31.689-.688.689h-8.8a.69.69 0 0 1-.69-.689v-1.92z'
        />
        <path
            fill='#616E7D'
            d='M19.408 2.858V22.22H4.67V2.858h2.316v1.92c0 .378.311.689.689.689h8.8c.378 0 .69-.311.69-.689v-1.92zM8.365 2.06h7.423v2.035H8.365zM16.476 0h-8.8a.69.69 0 0 0-.689.689v.524H3.404a.694.694 0 0 0-.695.695v21.397c0 .384.31.695.695.695h17.192c.384 0 .695-.31.695-.695V1.908a.694.694 0 0 0-.695-.695H17.16V.689A.69.69 0 0 0 16.47 0z'
        />
        <path
            fill='#82BFAB'
            d='M6.512 8.24h11.214V7.192H6.512zM6.512 10.653h11.214V9.604H6.512zM6.512 13.067h11.214v-1.049H6.512zM6.512 15.474h6.698v-1.042H6.512zM8.364 4.095h7.423V2.06H8.364z'
        />
        <path
            fill='#FECC09'
            d='m14.033 20.149-1.116-1.116a.633.633 0 0 1 0-.89c.555-.554 1.122.238 1.5.61l2.297-2.974a.637.637 0 0 1 .884-.116c.274.213.323.61.116.884l-2.73 3.54a.632.632 0 0 1-.945.062z'
        />
    </SvgIcon>
);

export default BettingRulesIcon;
