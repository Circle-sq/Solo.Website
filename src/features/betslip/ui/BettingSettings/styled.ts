import styled from '@emotion/styled';

import { breakpoints, cssColor, fontWeight, GenericColors } from '@solo-ui/system';

import Button from 'src/ui/common/Button/Button';

export const S_BettingSettings = styled.div`
    z-index: 10;
    position: absolute;
    bottom: 16px;
    right: 16px;
    left: 16px;
    box-shadow: 0 2px 3px 1px ${cssColor('--popover-shadow-color')};

    @media not screen and (min-width: ${breakpoints.bp1280}) {
        max-width: 328px;
        height: fit-content;
        position: fixed;
        top: 100px;
    }

    @media screen and (max-width: ${breakpoints.bp1280}) and (orientation: landscape) {
        margin-top: auto;
        overflow: auto;
        max-height: 90%;
    }
`;

export const S_BettingSettingsContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const S_Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 7px 16px;
    border-radius: 5px 5px 0 0;
    line-height: 1.7;
    font-size: 16px;
    height: 40px;
    background-color: ${cssColor('--popover-header-bg')};
    color: ${cssColor('--popover-text-color')};
    font-weight: ${fontWeight.semibold};
`;

export const S_Options = styled.div<{ height: string }>`
    display: flex;
    flex-direction: column;
    padding: 18px 18px 8px 18px;
    border-radius: 0 0 5px 5px;
    background-color: ${cssColor('--popover-bg')};

    ${(props): string => {
        return `
            height: ${props.height};
        `;
    }}
`;

export const S_ButtonClose = styled(Button)`
    opacity: 1;
    align-self: flex-start;
    font-size: 20px;
    padding: 4px 0;
    background-color: ${GenericColors.transparent};
    color: ${cssColor('--popover-close-button-color')};

    &:hover {
        background-color: ${GenericColors.transparent};
    }
`;

export const S_Gap = styled.div`
    margin-bottom: 8px;
`;
