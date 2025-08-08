import styled from '@emotion/styled';

import { fontWeight, breakpoints, DarkBluePalette, GreyPalette } from '@solo-ui/system';

import { S_SwiperContainer } from 'src/ui/common/Carousel/styled';
import TabsBar from 'src/ui/common/TabsBar/TabsBar';

export const S_FilterContainer = styled(TabsBar.Container)`
    position: relative;
    display: block;
    background-color: unset;
    margin: 12px 0;
`;

export const S_SwiperWeekFilterContainer = styled(S_SwiperContainer)`
    box-shadow: unset;

    .swiper-button-prev,
    .swiper-button-next {
        font-size: 0.5em;
        line-height: 1em;
        width: 2em;
        height: 2em;
    }
`;

export const S_FilterItem = styled(TabsBar.Link)`
    font-size: 14px;
    margin: 0 2px 0 0;
    align-items: center;
    justify-content: center;

    text-transform: capitalize;
    padding: 6px 10px;
    width: 100px;
    height: 31px;
    white-space: nowrap;
    text-align: center;
    flex: 1;
    border-radius: 4px;
    overflow: hidden;

    ${(props): string => {
        const { active = false, loading = false } = props;

        let style = `
            color: ${DarkBluePalette.darkBlue6};
            font-weight: ${fontWeight.medium};
            & span {
                color: ${GreyPalette.grey7};
            }
            background-color: ${DarkBluePalette.darkBlue4};
            border: 1px solid ${DarkBluePalette.darkBlue4};
            margin-right: 8px;
            border-radius: 6px;

            @media(min-width: ${breakpoints.bp768}) {
                &:hover {
                    background-color: ${DarkBluePalette.darkBlue2};
                    border: 1px solid ${DarkBluePalette.darkBlue4};
                }
            }

            @media(max-width: ${breakpoints.bp768}) {
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                max-width: 90px;
                max-height: 28px;
            }
        `;

        if (active || loading) {
            style += `
               background-color: ${DarkBluePalette.darkBlue2};
               border: 1px solid ${DarkBluePalette.darkBlue4};
               padding: 3px 10px 2px 10px;
        `;
        }

        return style;
    }}
`;
