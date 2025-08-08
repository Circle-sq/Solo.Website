import styled from '@emotion/styled';

import { GenericColors, Opacities } from '@solo-ui/system';

export const S_Betting = styled.aside`
    width: 100%;
    height: 100%;
    flex-shrink: 0;

    ${(props): string => {
        const {
            theme: {
                star: {
                    breakpoints: { bp1279max, bp1280 },
                },
            },
        } = props;

        return `
            @media screen and (max-width: ${bp1279max}) {
                position: absolute;
                right: 0;
                z-index: -1;
            }

            @media (min-width: ${bp1280}) {
                margin-left: -1em;
                padding: 0 1.5em 0 1em;
            }

            @media (min-width: ${bp1280}) {
                width: 28.75em;
            }
        `;
    }}
`;

export const S_BettingContent = styled.div`
    padding: 16px 0 70px;
    position: relative;
`;

export const Backdrop = styled.div`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: auto;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    background-color: ${GenericColors.black + Opacities.opacity50};
`;
