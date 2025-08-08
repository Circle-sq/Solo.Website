import styled from '@emotion/styled';

import { RedPalette, fontWeight } from '@solo-ui/system';

export const S_ValidationError = styled.div`
    font-size: 12px;
    line-height: 1.4;
    font-weight: ${fontWeight.regular};
    color: ${RedPalette.red4};
    margin-top: 4px;
    text-align: center;
    min-height: 17px;
`;
