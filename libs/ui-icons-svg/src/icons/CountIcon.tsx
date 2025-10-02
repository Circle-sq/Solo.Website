import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const CountIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1050 900'
        role='img'
        aria-label='countIcon'
        data-testid='countIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M85 172h214l31 30-30 29H84l-30-29zM0 257l30-31 30 30v204l-30 29-30-30zm384-1v203l-30 30-30-29V256l30-30zM0 568l30-30 30 29v204l-30 29-30-30zm384 0v202l-30 30-30-30V567l30-29zM85 854l-31-30 30-29h216l30 29-31 30zm640-682h214l31 30-30 29H724l-30-29zm-85 85 30-31 30 30v204l-30 29-30-30zm384-1v203l-30 30-30-29V256l30-30zM640 568l30-30 30 29v204l-30 29-30-30zm384 0v202l-30 30-30-30V567l30-29zM725 854l-31-30 30-29h216l30 29-31 30zM482 471h60v-59h-60zm0 163h60v-60h-60z'
        />
    </SvgIcon>
);

export default CountIcon;
