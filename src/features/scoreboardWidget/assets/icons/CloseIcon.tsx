import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={9}
        height={8}
        fill='none'
        viewBox='0 0 9 8'
        role='img'
        aria-label='closeIcon'
        data-testid='closeIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M5.332 4.006 8.62.732a.397.397 0 0 0 0-.565.405.405 0 0 0-.57 0l-3.285 3.27L1.45.119a.4.4 0 0 0-.57 0 .406.406 0 0 0 0 .572l3.313 3.318-3.325 3.31a.397.397 0 0 0 0 .565.405.405 0 0 0 .57 0L4.76 4.575l3.302 3.307a.4.4 0 0 0 .57 0 .406.406 0 0 0 0-.572z'
        />
    </SvgIcon>
);

export default CloseIcon;
