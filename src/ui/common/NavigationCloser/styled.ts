import styled from '@emotion/styled';

import Link from 'src/utils/Router/Link';
import { breakpoints } from '@solo-ui/system';

interface FrameActionProps {
    visible: 'on' | 'off';
}

export const FrameAction = styled(Link)<FrameActionProps>`
    position: fixed;
    z-index: 7;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 250ms ease-in;

    ${(props): string => {
        const { visible } = props;

        return `
            visibility: ${visible === 'on' ? 'visible' : 'hidden'};
            opacity: ${visible === 'off' ? '0.8' : '0'};

            @media(max-width: ${breakpoints.bp960}) {
                top: 48px;
            }
        `;
    }}
`;
