import styled from '@emotion/styled';
import { SvgIcon } from 'libs/ui-icons-svg/helpers/SvgIcon.styled';

import { GenericColors } from '@sc-ui/system';

export const S_ScrollTopButton = styled.button<{ visible: boolean; left: number; bottom: number }>`
    ${SvgIcon} {
        font-size: 35px;
    }

    position: fixed;
    z-index: 999;
    left: ${({ left }): number => left}px;
    bottom: ${({ bottom }): number => bottom}px;
    cursor: pointer;
    visibility: hidden;
    opacity: 0;
    padding: 0;
    margin: 0;
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${GenericColors.white};
    border: none;
    border-radius: 18px;

    transition:
        visibility 0.3s linear,
        opacity 0.3s linear;

    ${({ visible }): string => {
        let styles = ``;

        if (visible) {
            styles = `
                visibility: visible;
                opacity: 1;
            `;
        }

        return styles;
    }}
`;
