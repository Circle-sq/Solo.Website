import styled from '@emotion/styled';

import { fontWeight, radius, breakpoints, GenericColors, GreyPalette, cssColor } from '@sc-ui/system';

import PopupWindow from 'src/ui/common/PopupWindow/PopupWindow';
import { S_Header } from 'src/ui/common/PopupWindow/styled';

export const S_Container = styled.div`
    display: flex;
    flex-direction: column;
    right: 10px;
    position: absolute;
    top: 50px;
    font-size: 12px;
    transform: translate3d(0, 0, 0);
    transition: transform 0.2s ease;
    width: 340px;
    z-index: 101;
    background-color: ${cssColor('--box-default-bg')};
    border-radius: ${radius.main};

    @media (max-width: ${breakpoints.bp960}) {
        right: 0;
        width: 100%;
        position: relative;
    }
    @media (max-width: ${breakpoints.bp600}) {
        height: 100%;
    }
`;

export const S_Wrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin: 0;
    padding: 0 15px 20px;
`;

export const S_Label = styled('span')`
    font-weight: ${fontWeight.regular};
    font-size: 14px;
    color: ${cssColor('--body-text')};
`;

export const S_FreeBetCount = styled.span`
    font-size: 10px;
    color: ${cssColor('--text-tertiary')};
    margin-left: 6px;
`;

export const S_Value = styled('span')`
    display: flex;
    font-weight: ${fontWeight.bold};
    padding-left: 4px;
    color: ${cssColor('--body-text')};
`;

export const S_BalancePopupWindow = styled(PopupWindow)<{ className: string }>`
    align-items: center;

    ${S_Header} {
        background-color: ${cssColor('--popup-header-bg')};
        color: ${cssColor('--popup-header-text')};
    }
`;

export const S_ToggleButton = styled.button<{ isOpen: boolean }>`
    border: none;
    cursor: pointer;
    display: flex;
    background-color: ${GenericColors.transparent};

    & > svg path {
        fill: ${GreyPalette.grey7};
    }

    > span {
        font-weight: ${({ isOpen = false }) => (isOpen ? fontWeight.medium : fontWeight.regular)};
    }
`;

export const S_Item = styled.div<{ isFreeBet?: boolean; showItemsBorder?: boolean }>`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    text-decoration: none;
    font-size: 14px;
    min-height: 46px;
    margin-top: 6px;
    color: ${cssColor('--account-dev-text')};

    ${(props): string => {
        const { isFreeBet = false, showItemsBorder = true } = props;

        let styles = `
            flex-direction: ${isFreeBet ? 'column' : 'row'};
        `;

        if (showItemsBorder) {
            styles += `
             border-bottom: 1px solid ${cssColor('--list-border')};
          `;
        }

        return styles;
    }};
`;

export const S_LanguagePlaceholderItem = styled(S_Item)<{ last: boolean }>`
    justify-content: space-between;

    ${({ last }: { last: boolean }): string => {
        if (last) {
            return `border: none;`;
        }

        return ``;
    }};
`;

export const S_ValueWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const S_BalanceTabFreeBetsItemsContainer = styled.div`
    overflow-y: auto;
    max-height: 213px;
    margin-top: 0;
    padding-right: 6px;

    &::-webkit-scrollbar {
        width: 4px;
        border-radius: 6px;
    }

    & > ${S_Item} {
        padding: 9px 0;
        margin: 0;
    }

    &::-webkit-scrollbar-track {
        background-color: ${GreyPalette.grey9};
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${GreyPalette.grey4};
        border-radius: 6px;
    }
`;
