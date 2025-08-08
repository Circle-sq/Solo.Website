import styled from '@emotion/styled';

import { fontWeight } from '@solo-ui/system';

export const Icon = styled.span`
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    align-self: center;
`;

export const S_CardsAndCornersStatsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 15px);
    grid-column-gap: 12px;
    margin: 8px auto 0;
`;

export const S_IconStats = styled(Icon)<{ src: string }>`
    width: 7px;
    min-width: 7px;
    height: 10px;

    ${(props): string => {
        const { src } = props;

        return `background-image: url('${src}');`;
    }}
`;

export const S_LabelStats = styled.span`
    font-size: 12px;
    line-height: 12px;
    margin-left: 3px;
    font-weight: ${fontWeight.bold};
`;
