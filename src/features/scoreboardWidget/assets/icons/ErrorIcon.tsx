import type { SVGProps } from 'react';

import { SvgIcon } from './helpers/SvgIcon.styled';

const ErrorIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        width={25}
        height={24}
        fill='none'
        viewBox='0 0 25 24'
        role='img'
        aria-label='errorIcon'
        data-testid='errorIcon'
        {...props}
    >
        <rect width={24} height={24} x={0.75} fill='#fff' fillOpacity={0.1} rx={12} />
        <ellipse cx={12.25} cy={13} fill='#292B39' rx={2.5} ry={5} />
        <path
            fill='#FF4333'
            fillRule='evenodd'
            d='m12.75 5 8 13h-16zm.425 8.785h-1.1l-.23-4.351h1.56zm-1.118.94q-.23.165-.23.584 0 .4.23.584a.9.9 0 0 0 .564.173q.323 0 .554-.173.23-.183.23-.584 0-.42-.23-.584a.9.9 0 0 0-.554-.173.9.9 0 0 0-.564.173'
            clipRule='evenodd'
        />
    </SvgIcon>
);

export default ErrorIcon;
