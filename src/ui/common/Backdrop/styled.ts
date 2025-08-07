import styled from '@emotion/styled';

import { cssColor } from '@sc-ui/system';

export const S_BaseOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1200;
    background-color: ${cssColor('--overlay-bg')};
`;
