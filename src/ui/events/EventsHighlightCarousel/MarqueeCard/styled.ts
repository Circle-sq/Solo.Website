import styled from '@emotion/styled';

import { fontWeight, DarkBluePalette, GreyPalette, RedPalette, cssColor } from '@solo-ui/system';

import Link from 'src/utils/Router/NewLink';

const dividerStyles = `
    content: '';
    display: block;
    width: 280px;
    background: ${cssColor('--card-marquee-border')};
    height: 1px;
    position: absolute;
    left: -8px;
`;

export const S_Header = styled.header`
    color: ${cssColor('--card-marquee-header-text')};
    font-size: 10px;
    display: flex;
    justify-content: space-between;
    white-space: nowrap;
    font-weight: ${fontWeight.bold};
    position: relative;
    padding-bottom: 7px;
    height: 24px;
    align-items: center;

    &::after {
        ${dividerStyles};
        bottom: 0;
    }
`;

export const S_Footer = styled.footer`
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    padding-top: 15px;
    justify-content: space-between;

    &:before {
        ${dividerStyles};
        top: 0;
    }

    & button {
        font-size: 14px;
    }
`;

export const S_MarketName = styled.span`
    position: absolute;
    top: 0;
    transform: translate(-50%, -50%);
    left: 50%;
    margin: 0 auto;
    font-size: 10px;
    padding: 0 8px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${cssColor('--card-marquee-market-text')};
    background: ${cssColor('--card-marquee-bg')};
    font-weight: ${fontWeight.medium};
`;

export const S_Time = styled.span<{ isLive: boolean }>`
    font-size: 10px;
    line-height: 13.5px;
    font-weight: ${fontWeight.bold};

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
    }

    svg {
        height: 16px;
        width: 16px;

        path {
            fill: ${RedPalette.red4};
        }
    }

    ${({ isLive }): string | undefined => {
        if (isLive) {
            return `
                position: absolute;
                color: ${cssColor('--body-text')};
                bottom: 0;
                transform: translate(-50%, 50%);
                left: 50%;
                margin: 0 auto;
                background: ${cssColor('--card-marquee-bg')};
                padding: 0 8px;
                z-index: 1;
            `;
        }
    }}
`;

export const S_Competition = styled.div`
    display: inline-flex;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 8px;
    align-items: center;

    font-size: 10px;
    line-height: 13.5px;
    font-weight: ${fontWeight.bold};
`;

export const S_Link = styled(Link)`
    padding: 8px;
    margin-right: 8px;
    width: 280px;
    height: 148px;
    line-height: 1.4;
    float: left;
    text-decoration: none;
    position: relative;
    background: ${cssColor('--card-marquee-bg')};
    border-radius: 6px;
`;

export const S_GradientLink = styled(S_Link)`
    border: 1px solid transparent;

    ${S_Header}::after, ${S_Footer}::before {
        width: 278px;
    }

    &::before {
        content: '';
        z-index: 2;
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        padding: 1px;

        background: radial-gradient(39.19% 39.19% at 100% 0%, #00dbffcc 0%, #00dbff1a 100%),
            radial-gradient(26.96% 96.51% at 0.71% 99.66%, #00dbffcc 0%, #00dbff1a 100%);

        mask:
            linear-gradient(white, white) content-box,
            linear-gradient(white, white);

        -webkit-mask-composite: destination-out;
        mask-composite: exclude;

        pointer-events: none;
    }
`;

export const S_LiveGradientLink = styled(S_GradientLink)`
    &::before {
        background: radial-gradient(100% 100% at 100% 0%, #e22326 0%, #e223261a 100%),
            radial-gradient(34.82% 124.63% at 0% 100%, #00dbffcc 0%, #00dbff1a 100%);
    }
`;

export const S_LiveWrapper = styled.span`
    display: flex;
    align-items: center;

    svg {
        margin-right: 5px;
    }
`;

export const S_Label = styled.span`
    color: ${cssColor('--text-live')};
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    font-weight: 900;
    font-style: italic;
`;

export const S_GlowingLabel = styled(S_Label)`
    font-family: 'Noto Sans', sans-serif;
    color: white;
    font-size: 10px;
    width: 32px;
    height: 18px;
    line-height: 18.5px;
    border-radius: 4px;
    background: #e22326;
    padding: 0 6px;
    display: flex;
    justify-content: center;

    box-shadow:
        0 0 24px 0 #e22326,
        0 0 16px 0 #e22326,
        0 0 4px 0 #0000004d,
        inset 0 1px 0 0 #ffffff4d;
`;

export const S_GlowingLabelInner = styled.span`
    letter-spacing: -0.4px;
    margin-left: -1.5px;
`;

export const S_Button = styled.div`
    font-size: 14px;
    color: ${GreyPalette.grey7};
    font-weight: ${fontWeight.semibold};
    width: 100%;
    max-width: 101px;
    background-color: ${DarkBluePalette.darkBlue4};
    height: 36px;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 3px;
    margin: 0 auto;
    text-align: center;
    line-height: 2.5;

    &:hover {
        background: ${DarkBluePalette.darkBlue5};
    }
`;

export const S_EventName = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 5px 0;
    color: ${cssColor('--body-text')};
    font-size: 15px;
    line-height: 17px;
    font-weight: ${fontWeight.bold};
`;
