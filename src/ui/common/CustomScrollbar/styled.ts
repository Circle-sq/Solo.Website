import styled from '@emotion/styled';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { radius, DarkBluePalette, breakpoints } from '@sc-ui/system';

interface TrackProps {
    direction: 'horizontal' | 'vertical';
    position?: string;
}

export const S_ScrollContainer = styled(Scrollbars)`
    overflow: visible !important;

    @media screen and (min-width: ${breakpoints.bp1440}) {
        z-index: 1;
    }
`;

export const Track = styled.div<TrackProps>`
    cursor: pointer;
    position: absolute;
    z-index: 1;
    margin-top: 5px;

    ${(props): string => {
        const { direction, position } = props;

        let styles = '';

        if (direction === 'horizontal') {
            styles += `
                bottom: 0;
                left: 0;
                right: 0;

                ${position !== undefined ? `bottom: ${position} !important` : ''}
            `;
        } else if (direction === 'vertical') {
            styles += `
                top: 5px;
                bottom: 5px;

                ${position !== undefined ? `right: ${position} !important` : ''}
            `;
        }

        return `
            border-radius: ${radius.main};
            background-color: ${DarkBluePalette.darkBlue2};

            ${styles}
        `;
    }}
`;

export const Thumb = styled.div`
    cursor: pointer;
    border-radius: 5px;
    background-color: ${DarkBluePalette.darkBlue4};
`;

export const S_Viewport = styled.div`
    // Hide browser native scrollbars
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;

    .competition-filter & {
        scrollbar-width: thin;
    }

    .country-filter & {
        scrollbar-width: thin;
    }

    &::-webkit-scrollbar {
        width: 0 !important;
    }

    &:hover {
        ~ div {
            opacity: 1 !important;
        }
    }
`;

export const S_ScrolledContent = styled.div<{ position?: string }>`
    width: 100%;

    ${({ position }) => {
        return `
            ${position !== undefined ? 'padding-right: 0 !important;' : ''}
        `;
    }}
`;
