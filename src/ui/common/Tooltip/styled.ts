import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@sc-ui/system';

interface TitleProps {
    textWrap: boolean;
}

export const S_Title = styled.span<TitleProps>`
    font-size: 10px;
    margin-right: 8px;
    color: ${cssColor('--text-muted')};
    font-weight: ${fontWeight.medium};

    ${(props): string => {
        const { textWrap } = props;

        return `
            white-space: ${textWrap ? 'normal' : 'nowrap'};
        `;
    }}
`;

export const S_TooltipWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;
