import styled from '@emotion/styled';
import isNil from 'lodash/isNil';

import { GenericColors, RedPalette, Opacities, fontWeight, GreyPalette, LightBluePalette } from '@solo-ui/system';

export const S_MarketName = styled.p`
    font-size: 14px;
    line-height: 19px;
    color: white;
    font-weight: ${fontWeight.medium};
    text-align: center;
    margin: 0 0 10px;
`;

export const S_Selection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-bottom: 13px;
`;

export const S_SelectionLabel = styled.span`
    color: ${GreyPalette.grey7};
    font-size: 12px;
`;

export const S_SelectionIdentifier = styled.span`
    color: ${GreyPalette.grey7};
    font-size: 12px;
    font-weight: ${fontWeight.bold};
    text-transform: uppercase;
`;

export const S_SelectionPrice = styled.span<{ pricePosition?: string | null }>`
    color: ${GreyPalette.grey7};
    font-size: 12px;
    font-weight: ${fontWeight.semibold};
    height: 17px;
    min-width: 40px;
    padding: 0 5px;
    background: ${GreyPalette.grey7 + Opacities.opacity20};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;

    position: relative;

    @keyframes blink-increase {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes last-blink {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 1;
        }
    }

    &:after {
        content: '';
        position: absolute;
    }

    ${(props): string => {
        const { pricePosition } = props;

        let styles = ``;
        const arrowWidth = '9px';

        const getPriceChangeStyles = (pricePosition: string): string => {
            return `
                &:after {
                    animation:
                        blink-increase 0.6s ease-out 0s 6 forwards,
                        last-blink 6s ease-out 5s 1 forwards;

                    ${pricePosition}: 0;
                    right: 0;
                    border-${pricePosition}: ${arrowWidth} solid ${
                        pricePosition === 'top' ? RedPalette.red5 : LightBluePalette.lightBlue11
                    };
                    border-left: ${arrowWidth} solid ${GenericColors.transparent};
                }
            `;
        };

        if (!isNil(pricePosition)) {
            styles += `${getPriceChangeStyles(pricePosition)}`;
        }

        return `
            border-radius: 2px;

            ${styles}
        `;
    }}
`;
