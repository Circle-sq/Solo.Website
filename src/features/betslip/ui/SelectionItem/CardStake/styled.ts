import styled from '@emotion/styled';

import { fontWeight, DarkBluePalette, GreyPalette } from '@sc-ui/system';

export const S_CardStake = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const S_StakeInput = styled.div`
    display: flex;
    align-self: flex-end;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    text-align: right;
    font-size: 15px;
    border-radius: 3px;
    margin: 8px 0 8px auto;
    color: ${GreyPalette.grey7};
    border-color: ${DarkBluePalette.darkBlue4};
`;

export const S_PossibleWinnings = styled.span<{ isDisabled?: boolean }>`
    font-size: 10px;
    line-height: normal;
    text-align: right;
    position: relative;
    margin-bottom: 2px;
    max-width: 120px;
    font-weight: ${fontWeight.medium};
    color: ${DarkBluePalette.darkBlue6};

    ${({ isDisabled = false }): string => {
        let styles = '';

        if (isDisabled) {
            styles += `
                opacity: 0.6;
            `;
        }

        return styles;
    }}
`;

export const TextWrapper = styled.span`
    white-space: nowrap;
    display: inline-block;
`;

export const TextBold = styled.span`
    font-weight: ${fontWeight.bold};
    white-space: nowrap;
`;
