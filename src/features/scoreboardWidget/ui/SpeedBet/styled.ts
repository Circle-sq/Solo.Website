import styled from '@emotion/styled';

import { GreyPalette, Opacities } from '@solo-ui/system';

export const S_SpeedBet = styled.div`
    overflow: hidden;
`;

export const S_SpeedBetContent = styled.div`
    background-color: ${GreyPalette.grey1 + Opacities.opacity25};
    padding: 16px 16px 16px;
    display: flex;
    gap: 16px;
    min-height: 265px;
`;
