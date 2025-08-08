import styled from '@emotion/styled';

import { BaseballPitcherIcon } from '@solo-ui/icons/svg';

import type { Testable } from 'src/utils/Testable/types';
import { breakpoints } from '@solo-ui/system';

interface PitcherProps extends Testable {
    invert: boolean;
    iconPosition: string;
}

export const S_PitcherBox = styled.div`
    display: flex;
    align-items: center;
    height: 10px;
    gap: 4px;
`;

export const S_PitcherIcon = styled(BaseballPitcherIcon)<PitcherProps>`
    transform: ${({ invert }) => `${invert ? 'rotate(180deg)' : ''}`};
    order: ${({ iconPosition }) => `${iconPosition === 'left' ? 0 : 1}`};
`;

export const S_PitcherName = styled.p`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 180px;
    font-size: 10px;
    padding: 0;
    margin: 0;

    @media (max-width: ${breakpoints.bp500}) {
        max-width: 100px;
        font-size: 9px;
    }
`;
