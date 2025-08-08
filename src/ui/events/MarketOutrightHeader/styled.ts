import styled from '@emotion/styled';

import { fontWeight, radius, cssColor } from '@solo-ui/system';

export const S_MarketHeaderWrapper = styled.div`
    border-radius: ${`${radius.main} ${radius.main} 0 0`};
    background-color: ${cssColor('--accordion-header-bg')};
`;

export const S_TermsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const S_SingleTermsWrapper = styled.span`
    margin-right: 5px;
`;

export const S_MarketHeaderContent = styled.button`
    border: none;
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding: 7px 15px;
    color: ${cssColor('--body-text')};
    background-color: ${cssColor('--button-text')};
    border-radius: ${radius.main};

    &:hover {
        background-color: ${cssColor('--box-selection-header-hover-bg')};
    }
`;

export const S_MarketHeaderTitle = styled.h4`
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    max-width: 90%;
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: ${fontWeight.medium};
`;
