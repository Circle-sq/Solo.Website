import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const NextBetIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={12}
        height={12}
        fill='none'
        viewBox='0 0 12 12'
        role='img'
        aria-label='nextBetIcon'
        data-testid='nextBetIcon'
        {...props}
    >
        <path
            fill='#D6D6D6'
            fillRule='evenodd'
            d='M2.166 1.338a.6.6 0 0 0-.963.479v8.367a.6.6 0 0 0 .963.478L7.68 6.478a.6.6 0 0 0 0-.956zm-2.163.479C.003.329 1.706-.517 2.89.382l5.515 4.184a1.8 1.8 0 0 1 0 2.868L2.89 11.618c-1.185.899-2.888.053-2.888-1.434z'
            clipRule='evenodd'
        />
        <path fill='#D6D6D6' d='M10.804.6a.6.6 0 1 1 1.2 0v10.8a.6.6 0 1 1-1.2 0z' />
    </SvgIcon>
);

export default NextBetIcon;
