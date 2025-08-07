import styled from '@emotion/styled';

import { fontWeight, breakpoints, DarkBluePalette, GenericColors, GreyPalette } from '@sc-ui/system';

import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const S_Header = styled.header<{ isOpen: boolean }>`
    position: relative;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 38px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 12px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: ${DarkBluePalette.darkBlue4};

    ${({ isOpen }): string => {
        let styles = `
            font-weight: ${fontWeight.semibold};

            @media(max-width: ${breakpoints.bp500}) {
                min-height: 28px;
                padding: 0 8px;
            };
        `;

        if (isOpen) {
            styles += `
                color: ${GreyPalette.grey7};
            `;
        } else {
            styles += `
                color: ${GreyPalette.grey4};
                border-radius: 6px;

                @media(max-width: ${breakpoints.bp768}) {
                    color: ${GreyPalette.grey7};
                }
            `;
        }

        return styles;
    }};
`;

export const S_CountryName = styled.div`
    white-space: nowrap;
`;

export const S_CompetitionName = styled(TooltipTruncatedText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 22px;
`;

export const S_SportIcon = styled.span`
    width: 16px;
    display: flex;
    color: ${GreyPalette.grey7};
`;

export const S_CompetitionItem = styled.div<{ isOpen?: boolean }>`
    margin-top: 8px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    border-color: ${({ isOpen }) => (isOpen ? DarkBluePalette.darkBlue4 : GenericColors.transparent)};

    @media (max-width: ${breakpoints.bp768}) {
        width: 100%;
    }
`;

export const S_Content = styled.div`
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`;

export const S_ContentIcon = styled.span<{ url: string }>`
    width: 16px;
    height: 16px;
    background-size: 16px 16px;

    ${({ url }): string => {
        return `
            background: url(${url}) no-repeat;
        `;
    }}
`;

export const S_CompetitionIconContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 8px;
`;

export const S_CompetitionIcon = styled(S_ContentIcon)`
    display: inline-block;
    position: relative;
    background-size: 100% 100%;
`;

export const S_CompetitionListItemHeader = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    justify-content: center;
    text-transform: uppercase;
    padding: 18px 8px;
    line-height: 22px;
    color: ${GreyPalette.grey7};
    font-weight: ${fontWeight.medium};

    @media screen and (max-width: ${breakpoints.bp500}) {
        font-size: 14px;
    }
`;
