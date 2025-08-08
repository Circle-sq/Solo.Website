import styled from '@emotion/styled';

import { fontWeight, radius, breakpoints, GenericColors, cssColor } from '@solo-ui/system';

const DEFAULT_HEADER_FONT_SIZE = 14;

export const S_Section = styled.section`
    border-radius: ${radius.main};
`;

export const S_Header = styled.header<{ disabled?: boolean }>`
    position: relative;
    display: block;
    z-index: 1;
    user-select: none;
    border-radius: 6px 6px 0 0;
    background-color: ${cssColor('--accordion-header-bg')};

    ${(props): string => {
        const { disabled } = props;

        let styles = ``;

        styles += !disabled ? `cursor: pointer;` : ``;

        return styles;
    }}
`;

export const S_SportsHeader = styled(S_Header)`
    cursor: initial;
    background-color: ${GenericColors.transparent};
`;

// TODO: MUI_TYPOGRAPHY - meaning that this should be a MUI component
export const S_Heading = styled.h3`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${DEFAULT_HEADER_FONT_SIZE}px;
    line-height: 22px;
    margin: 0;
    padding: 8px 12px;
    width: 100%;
    font-weight: ${fontWeight.semibold};

    @media (max-width: 849px) {
        margin-bottom: 0;
    }

    &:before {
        content: '';
        position: absolute;
        display: block;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        z-index: -1;
    }

    &:hover .icon {
        opacity: 1;
    }
`;

export const S_CollapsibleHeading = styled(S_Heading)`
    &:hover {
        cursor: pointer;
    }
`;

export const S_SportsHeading = styled(S_Heading)<{ fontSize?: number }>`
    padding: 18px 8px;
    font-weight: ${fontWeight.medium};
    font-size: ${({ fontSize = DEFAULT_HEADER_FONT_SIZE }) => `${fontSize}px`};

    @media (max-width: ${breakpoints.bp500}) {
        padding: 8px 16px;
    }
`;

export const S_MarginBox = styled.div`
    margin-right: 7px;
`;
