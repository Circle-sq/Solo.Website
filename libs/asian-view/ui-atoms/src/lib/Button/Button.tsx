import styled from '@emotion/styled';

import { GreyPalette, fontWeight,radius } from '@solo-ui/system';

export const Button = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    user-select: none;
    font-size: 16px;
    font-style: normal;
    line-height: normal;
    gap: 8px;
    font-weight: ${fontWeight.bold};
    color: ${GreyPalette.grey7};
    border: 1px solid ${GreyPalette.grey2};
    border-radius: ${radius.secondary};
    background: ${GreyPalette.grey8};
`;
