import styled from '@emotion/styled';

import { cssColor, radius } from '@solo-ui/system';

export const S_BettingTabs = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: ${radius.wrapper};
`;

export const S_TabList = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    list-style-type: none;
    border-bottom: 1px solid ${cssColor('--tab-betting-border')};
`;

export const S_BetsIndicator = styled.span`
    border-radius: 50%;
    font-size: 10px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1em;
    margin-left: 4px;
    background-color: ${cssColor('--badge-error-bg')};
`;
