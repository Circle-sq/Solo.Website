import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const ResetIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={16}
        height={17}
        fill='none'
        viewBox='0 0 16 17'
        role='img'
        aria-label='resetIcon'
        {...props}
    >
        <path
            fill='#D6D6D6'
            d='M10.072 5.3 8 7.372 5.928 5.3 4.8 6.428 6.872 8.5 4.8 10.572 5.928 11.7 8 9.628l2.072 2.072 1.128-1.128L9.128 8.5 11.2 6.428zM8 .5c-4.424 0-8 3.576-8 8s3.576 8 8 8 8-3.576 8-8-3.576-8-8-8m0 14.4a6.41 6.41 0 0 1-6.4-6.4c0-3.528 2.872-6.4 6.4-6.4s6.4 2.872 6.4 6.4-2.872 6.4-6.4 6.4'
        />
    </SvgIcon>
);

export default ResetIcon;
