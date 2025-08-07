import styled from '@emotion/styled';

import { DarkBluePalette, fontWeight, Opacities } from '@sc-ui/system';

export const S_EventPeriodWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    background-color: ${DarkBluePalette.darkBlue2 + Opacities.opacity50};
    padding: 2.5px 8px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    font-weight: ${fontWeight.regular};
`;

export const S_Score = styled.p`
    margin: 0;
    font-size: 14px;
    font-weight: ${fontWeight.bold};
    line-height: 24px;
`;

export const S_PhaseDetails = styled.span`
    font-size: 12px;
    font-weight: ${fontWeight.regular};
    line-height: 16px;
    margin-left: 2.5px;
`;

export const S_EventName = styled.div`
    font-size: 12px;
    line-height: 18px;
    font-weight: ${fontWeight.semibold};
`;
