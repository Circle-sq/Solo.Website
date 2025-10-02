import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width='100pt'
        height='100pt'
        viewBox='0 0 100 100'
        role='img'
        aria-label='searchIcon'
        data-testid='searchIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M88.75 77.5 73.438 62.188c8.125-13.125 6.563-30.625-5-41.875C55 6.875 33.438 6.875 20 20.313s-13.438 35 0 48.438c6.563 6.563 15.312 10 24.062 10 6.25 0 12.5-1.875 17.812-5l15.312 15.312c1.562 1.563 4.062 1.563 5.312 0l5.938-5.937c1.875-1.563 1.875-4.063.312-5.626zm-57.5-20.312c-7.187-7.187-7.187-18.75 0-25.938s18.75-7.187 25.938 0 7.188 18.75 0 25.938-18.75 7.188-25.938 0'
        />
    </SvgIcon>
);

export default SearchIcon;
