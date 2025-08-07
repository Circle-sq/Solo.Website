import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const PlayOutlineIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        viewBox='0 0 24 24'
        role='img'
        aria-label='playOutlineIcon'
        data-testid='playOutlineIcon'
        {...props}
    >
        <path
            fill='#606060'
            fillRule='evenodd'
            d='M2.605 2.993h18.79c1.441 0 2.605 1.164 2.605 2.66v12.693c0 1.442-1.164 2.66-2.605 2.66H2.605C1.164 21.007 0 19.844 0 18.347V5.654c0-1.442 1.164-2.661 2.605-2.661M21.395 4.6H2.605a.92.92 0 0 0-.665.278 1.05 1.05 0 0 0-.277.72v12.693c0 .277.11.554.277.72a.92.92 0 0 0 .665.278h18.79c.277 0 .499-.111.665-.277s.277-.444.277-.721V5.598c0-.277-.11-.554-.277-.72a.92.92 0 0 0-.665-.278m-6.984 6.485c.444.333.444.887.056 1.275l-4.047 2.716c-.443.277-1.108 0-1.108-.61V9.534c0-.61.61-.886 1.053-.665l4.157 2.328-.11-.055z'
            clipRule='evenodd'
        />
    </SvgIcon>
);

export default PlayOutlineIcon;
