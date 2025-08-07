import styled from '@emotion/styled';

export const Wrapper = styled('div')<{ isVisible?: boolean }>`
    padding: 3px;

    @-webkit-keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    ${({ isVisible = true }): string => {
        return `
            display: ${isVisible ? 'flex' : 'none'};
        `;
    }};
`;
