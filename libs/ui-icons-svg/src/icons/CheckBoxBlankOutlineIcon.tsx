import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const CheckBoxBlankOutlineIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1050 1050'
        role='img'
        aria-label='checkBoxBlankOutlineIcon'
        data-testid='checkBoxBlankOutlineIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M903 8H121Q88 8 60 24 33 41 16 68 0 96 0 129v782q0 33 16 61 17 27 44 44 28 16 61 16h782q33 0 61-16 27-17 44-44 16-28 16-61V129q0-33-16-61-17-27-44-44-28-16-61-16m36 903q0 15-11 25-10 11-25 11H121q-15 0-25-11-11-10-11-25V129q0-15 11-25 10-11 25-11h782q15 0 25 11 11 10 11 25z'
        />
    </SvgIcon>
);

export default CheckBoxBlankOutlineIcon;
