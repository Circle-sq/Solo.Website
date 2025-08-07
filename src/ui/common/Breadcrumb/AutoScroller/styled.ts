import styled from '@emotion/styled';

export const S_AutoScroller = styled.div`
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
`;

export const S_AutoScrollerContent = styled.div<{ containerWidth: number; shouldScroll: boolean }>`
    display: inline-block;
    white-space: nowrap;

    ${({ containerWidth = 0, shouldScroll = false }) => {
        let style = ``;

        if (shouldScroll) {
            style += `
                animation: scrollAnimation 6s ease-in-out infinite;

                @keyframes scrollAnimation {
                    0%,
                    20% {
                        transform: translateX(0);
                    }
                    40%,
                    90% {
                        transform: translateX(calc(-100% + ${containerWidth}px));
                    }
                    100% {
                        transform: translateX(0);
                        
                    }
                }
            `;
        }

        return style;
    }}
`;
