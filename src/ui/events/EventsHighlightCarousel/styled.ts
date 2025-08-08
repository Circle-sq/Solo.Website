import styled from '@emotion/styled';

import { breakpoints, fontWeight, GreyPalette } from '@solo-ui/system';

import { S_SwiperContainer } from 'src/ui/common/Carousel/styled';
import LinesEllipsis from 'src/ui/common/LinesEllipsis';

export const S_Container = styled.div`
    flex-shrink: 0;
    margin-top: 16px;

    @media (max-width: ${breakpoints.bp1279max}) {
        margin-top: 12px;
    }

    @media (max-width: ${breakpoints.bp500}) {
        margin-top: 8px;
    }

    div.swiper-button-prev {
        left: 10px;
    }

    div.swiper-button-next {
        right: 10px;
    }

    ${S_SwiperContainer} {
        box-shadow: unset;
    }
`;

export const S_CompetitionName = styled.div`
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const S_CompetitionIcon = styled.span<{ url: string }>`
    ${(props): string => {
        const { url } = props;

        return `
            min-width: 16px;
            height: 16px;
            background: url(${url}) no-repeat;
            background-size: 16px 16px;
            margin-right: 8px;
        `;
    }}
`;

export const Name = styled(LinesEllipsis)`
    margin: 0;
    font-weight: ${fontWeight.regular};
    color: ${GreyPalette.grey7};
`;
