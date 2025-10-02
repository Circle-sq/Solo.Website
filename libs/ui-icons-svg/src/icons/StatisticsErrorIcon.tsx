import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const StatisticsErrorIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        className='StatisticsError_svg__sr-error__icon StatisticsError_svg__srt-icon StatisticsError_svg__sr-error-icon-statistics StatisticsError_svg__srm-is-medium'
        viewBox='0 0 24 24'
        role='img'
        aria-label='statisticsErrorIcon'
        data-testid='statisticsErrorIcon'
        {...props}
    >
        <path d='M10.8 17.8c-.3 0-.6-.2-.7-.4l-2.5-4.9-3.1 1.9c-.4.2-.9.1-1.1-.3s-.1-.9.3-1.1l3.8-2.4c.2-.1.4-.2.6-.1s.4.2.5.4l2.3 4.5 3.4-5.3c.1-.2.4-.4.6-.4.3 0 .5.1.7.3l1.7 2.3L22.5 2c.2-.4.7-.5 1.1-.4.4.2.6.7.4 1.1l-5.8 11.4c-.1.2-.4.4-.6.4-.3 0-.5-.1-.7-.3L15 12l-3.5 5.5c-.2.2-.4.3-.7.3m12.1 4.6H.8c-.5 0-.8-.4-.8-.8V2.4c0-.4.3-.7.8-.7s.7.3.7.7v18.5h21.4c.4 0 .8.3.8.8 0 .4-.3.7-.8.7' />
    </SvgIcon>
);

export default StatisticsErrorIcon;
