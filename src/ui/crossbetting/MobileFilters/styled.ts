import styled from '@emotion/styled';

import { S_PaddingBox } from 'src/ui/common/DropdownSelect/styled';

import { S_DropdownSingleValue } from '../FilterDropdown/styled';
import { breakpoints } from '@solo-ui/system';

export const S_FiltersWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    ${S_PaddingBox} {
        padding: 0 5px;
    }

    @media (max-width: ${breakpoints.bp600}) {
        flex-wrap: nowrap;
    }
`;

export const S_TimeFilterWrapper = styled.div`
    max-width: 99px;

    ${S_DropdownSingleValue} {
        min-width: 43px;
    }
`;

export const S_CountryFilterWrapper = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    width: 100%;
    grid-gap: 8px;
    margin-left: 8px;
`;
