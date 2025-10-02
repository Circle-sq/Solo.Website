import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const WarningIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 2020 2548'
        role='img'
        aria-label='warningIcon'
        data-testid='warningIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M2011 1965 1097 372q-49-66-89.5-66T919 372L3 1968q-8 33 4 62 17 40 73 68h1855q57-28 73-70 12-29 3-63m-893-65q-40 33-111 33t-111-32.5-40-91.5 38.5-91.5T1007 1685t112 32.5 38 91.5-39 91m9-314H889l-41-671q0-26 21.5-48t58-35 80-13 80.5 13 58.5 35 21.5 48z'
        />
    </SvgIcon>
);

export default WarningIcon;
