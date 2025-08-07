import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@sc-ui/system';

export const S_EmptyFilters = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 8px 10px;

    & > svg {
        font-size: 39px;
        margin-bottom: 12px;
    }
`;

export const EmptyFilterSubHeader = styled.p`
    font-size: 14px;
    line-height: 1.2;
    margin: 0;
    font-weight: ${fontWeight.regular};
`;

export const ResetFiltersLink = styled.a`
    font-size: 16px;
    margin-top: 12px;
    cursor: pointer;
    color: ${cssColor('--text-brand-color')};
    text-decoration: underline;
    font-weight: ${fontWeight.bold};

    &:hover {
        text-decoration: none;
    }
`;
