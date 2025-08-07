import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const CrossBetIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='crossBetIcon'
        data-testid='crossBetIcon'
        {...props}
    >
        <path
            fill='#151515'
            d='m12.324 3.656 1.504 3.179 2.543-3.18h7.63l-6.95 8.49-2.587 2.955 3.178-1.908 4.567 8.265h-8.327l-1.961-3.815-2.499 3.815h-8.31L11.922 8.742l-3.815 2.543-4.092-7.63z'
        />
        <path
            fill='#00A3FE'
            d='m11.21 2.543 1.505 3.179 2.543-3.179h7.63l-6.95 8.49-2.587 2.954 3.179-1.908 4.566 8.265H12.77l-1.961-3.814-2.498 3.814H0L10.808 7.63l-3.815 2.543-4.092-7.629z'
        />
    </SvgIcon>
);

export default CrossBetIcon;
