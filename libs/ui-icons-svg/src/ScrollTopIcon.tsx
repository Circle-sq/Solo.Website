import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const ScrollTopIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={35}
        height={35}
        fill='none'
        viewBox='0 0 35 35'
        role='img'
        aria-label='scrollTopIcon'
        data-testid='scrollTopIcon'
        {...props}
    >
        <path fill='#fff' d='M17.5 35C27.165 35 35 27.165 35 17.5S27.165 0 17.5 0 0 7.835 0 17.5 7.835 35 17.5 35' />
        <path
            fill='#4994FF'
            d='M17.5 27.708a.997.997 0 0 1-1.02-1.02V12.396a.997.997 0 0 1 1.02-1.021.997.997 0 0 1 1.02 1.02v14.293a.997.997 0 0 1-1.02 1.02'
        />
        <path
            fill='#4994FF'
            d='M23.625 19.542c-.291 0-.583-.146-.729-.292L17.5 13.854l-5.396 5.396c-.437.437-1.02.437-1.458 0-.437-.438-.437-1.021 0-1.459l6.125-6.125c.438-.437 1.02-.437 1.458 0l6.125 6.125c.438.438.438 1.021 0 1.459-.291.146-.437.291-.729.291m0-10.209h-12.25a.997.997 0 0 1-1.02-1.02.997.997 0 0 1 1.02-1.022h12.25a.997.997 0 0 1 1.021 1.021.997.997 0 0 1-1.02 1.021'
        />
    </SvgIcon>
);

export default ScrollTopIcon;
