import styled from '@emotion/styled';

import { fontWeight, RedPalette } from '@solo-ui/system';

export const BetSelectionInfoAlert = styled.div`
    display: block;
    position: relative;
    margin-bottom: 2px;
    line-height: normal;
    font-size: 10px;
    font-weight: ${fontWeight.medium};
    text-align: right;
    max-width: 145px;
    color: ${RedPalette.red5};
`;
