import styled from '@emotion/styled';

import { cssColor, radius } from '@solo-ui/system';

export const S_Tabs = styled.div`
    background-color: ${cssColor('--tabs-secondary-bg')};
    border-radius: ${radius.wrapper};
`;

export const S_TabList = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    list-style-type: none;
    border-bottom: 1px solid ${cssColor('--tabs-border')};
`;
