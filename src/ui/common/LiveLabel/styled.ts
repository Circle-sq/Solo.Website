import styled from '@emotion/styled';

import { breakpoints, cssColor, GenericColors } from '@solo-ui/system';

export const Live = styled.span`
    margin-right: 5px;
    font-weight: 900;
    position: relative;
    font-size: 12px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    color: ${GenericColors.white};

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 11px;
    }
`;

export const S_LiveLabelTag = styled(Live)`
    -webkit-font-smoothing: subpixel-antialiased;
    -webkit-text-stroke: 0.3px;
`;

export const S_LiveShort = styled(Live)`
    font-style: italic;
    margin-right: 8px;
    color: ${cssColor('--text-live')};

    &:before {
        border-color: ${GenericColors.transparent} ${GenericColors.transparent} ${GenericColors.transparent}
            ${cssColor('--text-live')};
    }
`;
