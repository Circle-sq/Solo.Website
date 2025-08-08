import styled from '@emotion/styled';

import { cssColor, RedPalette } from '@solo-ui/system';

export const S_NavigationBar = styled.div`
    display: flex;
    padding-left: 24px;
    z-index: 1;
    background-color: ${cssColor('--body-bg')};
`;

export const S_LiveLabel = styled.div`
    font-weight: 900;
    color: ${RedPalette.red4};
`;
