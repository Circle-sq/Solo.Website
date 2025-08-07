import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const WarningIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={3}
        height={17}
        fill='none'
        viewBox='0 0 3 17'
        role='img'
        aria-label='warningIcon'
        data-testid='warningIcon'
        {...props}
    >
        <path
            fill='#D9D9D9'
            d='M.04 1.038A1 1 0 0 1 1.04 0h.42a1 1 0 0 1 1 1.038l-.431 11.213a.78.78 0 0 1-1.558 0zM2.25 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0'
        />
    </SvgIcon>
);

export default WarningIcon;
