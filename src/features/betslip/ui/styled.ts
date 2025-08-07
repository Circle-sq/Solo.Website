import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { cssColor } from '@sc-ui/system';

import Link from 'src/utils/Router/NewLink';

export const S_FooterContainer = styled.div`
    padding: 16px;
    background-color: ${cssColor('--box-betslip-footer-bg')};
`;

export const S_BetslipContent = styled.div<{ disabled: boolean }>`
    position: relative;

    ${({ disabled }) => {
        if (disabled) {
            return css`
                pointer-events: none;
            `;
        }

        return '';
    }}
`;

export const ContentLink = styled(Link)`
    flex: 1;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: ${cssColor('--body-text')};
`;

export const VerticalDivider = styled.div`
    width: 1px;
    height: 24px;
    border-right: 1px solid ${cssColor('--text-muted')};
`;

export const S_BetslipWrapper = styled.section`
    background-color: ${cssColor('--box-default-bg')};
`;
