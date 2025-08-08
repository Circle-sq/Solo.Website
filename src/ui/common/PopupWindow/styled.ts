import styled from '@emotion/styled';

import { fontWeight, breakpoints, DarkBluePalette, GenericColors } from '@solo-ui/system';

import { S_BaseOverlay } from 'src/ui/common/Backdrop/styled';

export const S_Overlay = styled(S_BaseOverlay)<{ transparent?: boolean }>`
    ${({ transparent = false }): string => {
        if (transparent) {
            return `background-color: transparent;`;
        }

        return ``;
    }}
`;

export const Window = styled.div`
    height: 100%;
    width: 365px;
    position: fixed;
    right: 0;
    left: initial;
    top: 50%;
    display: flex;
    flex-direction: column;
    margin: auto;
    overflow: hidden;
    transform: translateY(-50%);

    @media (max-width: ${breakpoints.bp600}) {
        width: 100%;
    }
`;

export const S_Header = styled.div`
    height: 50px;
    width: 340px;
    position: absolute;
    top: 0;
    right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 15px;
    line-height: 1.7;
    text-align: center;
    background-color: ${DarkBluePalette.darkBlue3};
    color: ${GenericColors.white};

    @media (max-width: ${breakpoints.bp960}) {
        right: 0;
        width: 100%;
    }
`;

export const IconButton = styled.button`
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    margin-left: auto;
    border: none;
    padding-left: 10px;
    color: currentColor;
    background-color: ${GenericColors.transparent};

    &:hover {
        opacity: 0.75;
    }
`;

export const Title = styled.h3`
    flex: 1;
    margin: 0;
    padding: 0;
    font-size: 20px;
    font-weight: ${fontWeight.regular};
`;
