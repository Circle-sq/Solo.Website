import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@sc-ui/system';

export const S_LHNTab = styled.li<{ isActive: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
    font-size: 16px;
    font-weight: ${fontWeight.semibold};

    cursor: pointer;

    padding: 4px 10px;
    width: 100%;
    height: 40px;

    color: ${cssColor('--body-text')};
    background-color: ${({ isActive = false }) =>
        isActive ? cssColor('--tab-betting-active-bg') : cssColor('--tabs-secondary-bg')};
`;
