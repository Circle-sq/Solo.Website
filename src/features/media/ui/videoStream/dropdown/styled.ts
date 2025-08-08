import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

export const S_GroupHeader = styled.div`
    padding-right: 10px;
    width: 100%;
    background-color: ${cssColor('--body-bg')};
`;

export const S_GroupHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    color: ${cssColor('--dropdown-group-title-text')};
    font-weight: ${fontWeight.bold};
`;

export const S_SportIcon = styled.div`
    display: block;
    font-size: 16px;
    margin-top: 2px;
    margin-right: 7px;
    line-height: 20px;
`;
