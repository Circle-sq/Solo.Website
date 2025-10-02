import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const CombatSportsIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='combatSportsIcon'
        data-testid='combatSportsIcon'
        {...props}
    >
        <g fill='#fff'>
            <circle cx={124.7} cy={106} r={37.5} />
            <path d='M424 231.9c-3-9.9-13.4-15.5-23.3-12.6l-148.5 44.5-33.5-71.9 77.5-11.1c10.3-1.5 17.4-11 15.9-21.2s-10.9-17.5-21.2-15.9l-131.2 18.7c-5.6.8-10.5 4.1-13.4 8.9L90.1 265c-3.5 5.8-3.6 13-.2 18.9 3.3 5.9 9.6 9.5 16.3 9.5h75c.7 0 1.3-.3 2-.4l1.4 3.1c1.9 4.2 4.7 7.6 7.9 10.7L145 417.4c-4.1 9.5.3 20.5 9.9 24.6 2.4 1 4.9 1.5 7.4 1.5 7.3 0 14.2-4.3 17.2-11.4l49.7-116c1.7-.5 3.4-.9 5.1-1.7 5.1-2.4 9.4-5.8 12.8-9.9l164.3-49.3c9.9-3 15.5-13.4 12.6-23.3M139.1 256l15-25.1 11.7 25.1z' />
        </g>
    </SvgIcon>
);

export default CombatSportsIcon;
