import styled from '@emotion/styled';

import { breakpoints, fontWeight, GenericColors, RedPalette } from '@solo-ui/system';

import LiveLabel from 'src/ui/common/LiveLabel/LiveLabel';

import { EventLink } from '../../EventRow/styled';

export const AllEventsLink = styled(EventLink)`
    text-transform: uppercase;
    font-size: 14px;
    align-items: center;
    padding: 5px 10px 5px 16px;
    color: ${GenericColors.white};

    &&& {
        margin-top: 24px;
        border-radius: 8px;
    }

    @media screen and (max-width: ${breakpoints.bp500}) {
        padding: 10px 16px;
        line-height: 19px;
    }
`;

export const Live = styled(LiveLabel)`
    margin: 0 3px;
    padding-left: 0;
    font-size: 14px;
    font-weight: ${fontWeight.bold};
    color: ${RedPalette.red4};
    font-family: 'Noto Sans', sans-serif;

    &:before {
        content: none;
    }

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 14px;
    }
`;

export const S_Count = styled.span`
    margin-left: auto;
    display: flex;
`;
