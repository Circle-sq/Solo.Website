import styled from '@emotion/styled';

import { breakpoints, radius, GenericColors, GreyPalette } from '@solo-ui/system';

export const S_DevTools_Wrapper = styled.div`
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
    background-color: ${GreyPalette.grey1};
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

export const S_DevTools_Items = styled.ul`
    display: flex;
    flex-flow: column nowrap;
    margin: 0;
    padding: 0 15px 20px;
    overflow-x: hidden;
    overflow-y: auto;
`;

export const S_DevToolItem = styled.div`
    color: ${GenericColors.white};

    label {
        cursor: pointer;

        input {
            -webkit-appearance: initial;
            -moz-appearance: initial;
            appearance: auto;
        }
    }
`;
