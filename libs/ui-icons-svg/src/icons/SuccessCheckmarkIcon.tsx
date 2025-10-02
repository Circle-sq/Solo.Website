import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const SuccessCheckmarkIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={12}
        height={12}
        fill='none'
        viewBox='0 0 12 12'
        role='img'
        aria-label='successCheckmarkIcon'
        data-testid='successCheckmarkIcon'
        {...props}
    >
        <path
            fill='#8BD97F'
            fillRule='evenodd'
            d='M12 6A6 6 0 1 1 0 6a6 6 0 0 1 12 0M8.418 4.182a.45.45 0 0 1 0 .636l-3 3a.45.45 0 0 1-.636 0l-1.2-1.2a.45.45 0 1 1 .636-.636l.882.882 1.34-1.341 1.342-1.341a.45.45 0 0 1 .636 0'
            clipRule='evenodd'
        />
    </SvgIcon>
);

export default SuccessCheckmarkIcon;
