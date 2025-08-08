import styled from '@emotion/styled';

import { fontWeight, radius, breakpoints, GenericColors, GreyPalette, YellowPalette } from '@solo-ui/system';

import Icon from 'src/ui/common/Icon/Icon';
import Link from 'src/utils/Router/Link';

export const CloseSidebarButton = styled(Link)`
    text-decoration: none;
    padding: 10px;
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.3;
    text-transform: uppercase;
    transition: 250ms ease-in;
    display: none;
    font-weight: ${fontWeight.bold};
    border-radius: ${radius.selection};
    background-color: ${GreyPalette.grey2};
    color: ${GenericColors.white};

    &:hover {
        background-color: ${YellowPalette.yellow4};
        color: ${GenericColors.black};
    }

    @media (max-width: ${breakpoints.bp960}) {
        display: block;
    }
`;

export const CloseSidebarIcon = styled(Icon)`
    display: inline-block;
    margin-right: 15px;
    margin-bottom: -2px;
`;

export const AsideWrapper = styled.aside`
    flex-shrink: 0;
    padding: 0 8px 0 0;

    @media screen and (min-width: ${breakpoints.bp960}) {
        width: 248px;
    }
`;
