import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

import { incrementBreakpointValue } from 'src/common/helpers/styled';
import { S_BaseSelectionAction } from 'src/ui/events/Selection/SelectionAction/styled';

export const S_BuildABetSelectionAction = styled(S_BaseSelectionAction)`
    background-color: ${cssColor('--button-warning-bg')};

    ${({
        theme: {
            star: { breakpoints },
        },
        isSelected = false,
    }) =>
        isSelected &&
        css`
            &&& {
                background-color: ${cssColor('--button-warning-bg')};
            }

            &&&:hover {
                background-color: ${cssColor('--button-warning-hover-bg')};
            }

            @media screen and (min-width: ${incrementBreakpointValue(breakpoints.bp960)}) {
                &:hover {
                    & > span {
                        color: ${cssColor('--body-text')};
                    }
                }
            }

            & > span {
                color: ${cssColor('--body-text')};
            }
        `}
`;
