import styled from '@emotion/styled';
import { GreyPalette } from '@solo-ui/system';

interface ReadMoreContentProps {
    isOverflowing: boolean;
    expanded: boolean;
    lines: number;
}

export const S_ReadMoreContent = styled.p<ReadMoreContentProps>`
    ${(props): string => {
        const { expanded, isOverflowing, lines } = props;
        let style = ``;

        if (!expanded) {
            style += `
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                `;
        }

        if (isOverflowing) {
            style += `
                    overflow: hidden;
                `;
        }

        return `${style}
                line-clamp: ${lines};
                -webkit-line-clamp: ${lines}
        `;
    }}
`;

export const S_ReadMoreBtn = styled.div`
    display: flex;
    cursor: pointer;
    padding: 0;
    border: none;
    background: none;
    color: ${GreyPalette.grey7};

    &:hover {
        span:first-of-type {
            text-decoration: underline;
        }
    }
`;

export const S_MarginBox = styled.div`
    margin-left: 2px;
`;
