import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const LiveScoreIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='liveScoreIcon'
        data-testid='liveScoreIcon'
        {...props}
    >
        <path
            fill='#fff'
            d='M68.5 106v300h375V106zm131.3 243.8H106V162.3h93.8zm75-18.8h-37.5v-37.5h37.5zm0-112.5h-37.5V181h37.5zM406 349.8h-93.8V162.3H406z'
        />
    </SvgIcon>
);

export default LiveScoreIcon;
