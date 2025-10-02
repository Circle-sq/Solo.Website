import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const HelpIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1790 2100'
        role='img'
        aria-label='helpIcon'
        data-testid='helpIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M896 2098q-182 0-349-70-161-68-285-192T70 1551Q0 1384 0 1202t70-349q68-161 192-285t285-192q167-70 349-70t349 70q161 68 285 192t192 285q70 167 70 349t-70 349q-68 161-192 285t-285 192q-167 70-349 70m0-119q158 0 302-61 140-59 247.5-166.5T1612 1504q61-144 61-302t-61-302q-59-140-166.5-247.5T1198 486q-144-61-302-61t-302 61q-140 59-247.5 166.5T180 900q-61 144-61 302t61 302q59 140 166.5 247.5T594 1918q144 61 302 61M680 806q82-82 225-82 135 0 212.5 61.5T1195 958q0 71-32 117.5t-94 100.5q-53 48-78.5 83.5T965 1344H787q0-53 15.5-93.5t37.5-66 57-59.5q39-36 57.5-63.5T973 997q0-82-91-82-100 0-102 119l-183-1q2-146 83-227m274 671q32 32 32 82.5t-32 83.5-82 33-82-33-32-83.5 31-83 82-32.5 83 33'
        />
    </SvgIcon>
);

export default HelpIcon;
