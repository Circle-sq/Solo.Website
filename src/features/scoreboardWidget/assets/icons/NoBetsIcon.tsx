import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const NoBetsIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={13}
        height={13}
        fill='none'
        viewBox='0 0 13 13'
        role='img'
        aria-label='noBetsIcon'
        data-testid='noBetsIcon'
        {...props}
    >
        <path fill='#D9D9D9' d='M10.723.59a.75.75 0 0 1 1.06 1.062L1.53 11.905a.75.75 0 1 1-1.06-1.061z' />
        <path fill='#D9D9D9' d='M.783 1.59A.75.75 0 0 1 1.844.53l10.253 10.253a.75.75 0 1 1-1.06 1.06z' />
    </SvgIcon>
);

export default NoBetsIcon;
