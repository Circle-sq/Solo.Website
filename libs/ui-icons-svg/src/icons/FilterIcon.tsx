import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='filterIcon'
        data-testid='filterIcon'
        {...props}
    >
        <path
            fill='#606060'
            d='M0 18.667v2.666h8v-2.666zm0-16v2.666h13.333V2.667zM13.333 24v-2.667H24v-2.666H13.333V16h-2.666v8zm-8-16v2.667H0v2.666h5.333V16H8V8zM24 13.333v-2.666H10.667v2.666zM16 8h2.667V5.333H24V2.667h-5.333V0H16z'
        />
    </SvgIcon>
);

export default FilterIcon;
