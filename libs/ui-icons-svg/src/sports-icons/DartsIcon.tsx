import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const DartsIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='dartsIcon'
        data-testid='dartsIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M403.7 134.8c7.3-7.3 7.3-19.2 0-26.5s-19.2-7.3-26.5 0l-.5.5-12.8-40.3-66.3 66.3 12.8 40.3-101 101c-12.5-3.3-26.3-.2-36.1 9.6l-37.6 37.6c-9.8 9.8-12.9 23.6-9.6 36.1l-33.4 33.4-24.2 50.7 50.7-24.2 33.4-33.4c12.5 3.3 26.3.2 36.1-9.6l37.6-37.6c9.8-9.8 12.9-23.6 9.6-36.1l101.5-101.5 39.8 13.3 66.3-66.3z'
        />
    </SvgIcon>
);

export default DartsIcon;
