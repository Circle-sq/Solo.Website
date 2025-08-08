import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

import { S_NonAmericanSelection } from 'src/ui/events/Selection/styled';

import { S_Label } from '../../Selection/IdentifierLabel/styled';
import { S_SelectionValue } from '../../Selection/SelectionValue/styled';

export const S_SelectionHighlightCarousel = styled(S_NonAmericanSelection)<{ isFractional?: boolean }>`
    height: 36px;
    margin-left: 12px;
    font-size: ${({ isFractional = false }) => `${isFractional ? '13px' : '14px'}`};

    ${S_Label} {
        color: ${cssColor('--body-text')};
        background-color: ${cssColor('--card-marquee-selection-name-bg')};
        border-color: ${cssColor('--card-marquee-selection-name-border')};
        font-size: 10px;
    }

    &&& ${S_SelectionValue} {
        font-size: 14px;
        font-weight: ${fontWeight.semibold};
    }
`;
