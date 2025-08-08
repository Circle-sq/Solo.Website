import styled from '@emotion/styled';

import { GenericColors } from '@solo-ui/system';

import { NumberRow } from 'src/ui/common/EventInfographics/styled';

export const InactiveIcon = styled.span`
    width: 0;
    color: ${GenericColors.transparent};

    ${NumberRow} & {
        line-height: 22px;
    }

    &:empty:before {
        content: '\u00A0'; // &nbsp;
    }
`;
