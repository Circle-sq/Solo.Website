import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const CricketIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1050 1050'
        role='img'
        aria-label='cricketIcon'
        data-testid='cricketIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M1017 159 866 8q-6-6-14-6-9 0-15 6l-76 75q-2 3-4 7t-2 8 2 8 4 7l24 23-122 121-61-61q-6-6-14-6-9 0-15 6L7 763q-3 2-4 6-2 4-2 8v151q0 4 1 8 2 4 5 7l75 75q3 3 7 5t8 2h151q4 0 8-2t7-5l118-118q18 27 47 43 30 17 65 17 56 0 95-39 40-40 40-96 0-35-16-64-16-30-44-48l261-261q3-3 4-6 2-4 2-8 0-5-1-8-2-4-5-7l-61-61 122-122 23 24 6 4q4 2 8 2t8-2 7-4l76-76q6-6 6-14-1-9-7-15M785 438 528 695q-9-3-17-4-9-1-18-1-56 0-95 39-40 40-40 96 0 9 1 17 2 9 4 17L239 983H105l-17-17 470-470h143v-42H571V324h-42v143L59 937l-17-17V786l545-546zm142-219-23-23q-3-3-6-4-4-2-9-2-4 0-7 1-4 2-7 5L738 333l-46-46 137-137q3-3 4-6 2-4 2-8 0-5-1-8-2-4-5-7l-23-23 46-46 121 121z'
        />
    </SvgIcon>
);

export default CricketIcon;
