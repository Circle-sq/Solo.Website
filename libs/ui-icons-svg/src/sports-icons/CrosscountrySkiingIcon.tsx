import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const CrosscountrySkiingIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1050 1050'
        role='img'
        aria-label='crosscountrySkiingIcon'
        data-testid='crosscountrySkiingIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='m1024 683-57-103-78-20-190-346-108 119L426 86 269 404l-160-41-56 129 150 44-6 14-150-46L0 615l136 58-77 155 21 8q1 1 34 11 32 10 89 22 57 13 135 23 79 10 172 10 36 0 73-2 38-2 78-6l109 46 149-53-17-43 48-16q25-9 49-19l21-9-47-86zm-79-74 33 62-64 38-530-155 34-77zm-110-63-121-30-44-66 83-53zM691 284l54 98-85 54-45-68zM432 167l74 112-68-27-67 38zm-75 150 83-46 83 33 132 197-346-87zM99 470l30-66 166 41-38 71zM45 597l21-51 158 48-36 64zm71 208 58-117 405 172q-84 4-159-1-74-6-134-15-60-10-104-21t-66-18m655 99L313 710l39-77 488 147 34 86zm116-98-22-54-629-190 7-14 676 198 19-11 24 45q-19 7-38 13-19 7-37 13'
        />
    </SvgIcon>
);

export default CrosscountrySkiingIcon;
