import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='playIcon'
        data-testid='playIcon'
        {...props}
    >
        <path
            fill='#D82E28'
            fillRule='evenodd'
            d='M2.617 2.985h18.766C22.814 2.985 24 4.17 24 5.642v12.716c0 1.472-1.186 2.657-2.617 2.657H2.617C1.186 21.015 0 19.83 0 18.358V5.642C0 4.17 1.186 2.985 2.617 2.985m11.775 8.095c.45.327.45.9.04 1.268l-4.047 2.698c-.45.286-1.104 0-1.104-.572V9.526c0-.572.613-.9 1.063-.695l4.17 2.29-.122-.082z'
            clipRule='evenodd'
        />
    </SvgIcon>
);

export default PlayIcon;
