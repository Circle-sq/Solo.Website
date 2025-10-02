import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const GiftIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1500 2548'
        role='img'
        aria-label='giftIcon'
        data-testid='giftIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M96 1338h501v760H96zM0 853h597v379H0zm899 485h501v760H899zm0-485h597v379H899zM355 741q-58-39-88.5-98.5T239 521q2-65 40-118 31-45 82-71t109-26q83 0 152 47.5T751 551q59-152 128-198.5t152-46.5q59 0 110 26t82 71q36 53 38.5 116.5t-28.5 123-88 98.5q-72 47-240 47H595q-87 0-146-11.5T355 741m580-303q-31 20-67 96-31 66-56 149 52 4 93 4 81 0 133-11 35-8 49-18 34-24 53-58.5t18.5-71.5-20.5-67q-18-26-46.5-40t-62.5-14q-49 0-94 31m-575 23q-20 30-20.5 66.5t19 71.5 53.5 59q18 11 50 18 52 11 133 11 41 0 92-4-25-82-57-148-37-76-67-97-45-31-94-31-34 0-62.5 14T360 461'
        />
    </SvgIcon>
);

export default GiftIcon;
