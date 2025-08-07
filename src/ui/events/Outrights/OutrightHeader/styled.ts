import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@sc-ui/system';

export const S_OutrightHeaderGrouping = styled.div`
    cursor: pointer;
    padding: 0 0.7rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.05em;
    text-transform: uppercase;
    color: ${cssColor('--body-text')};
    background-color: ${cssColor('--accordion-header-bg')};
    font-weight: ${fontWeight.medium};

    &:hover {
        background-color: ${cssColor('--accordion-header-bg-hover')};
    }
`;
