import styled from '@emotion/styled';

import { breakpoints } from '@sc-ui/system';

export const S_ParticipantDetails = styled.div<{ layout?: 'horizontal' | 'vertical' }>`
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: ${({ layout }) => (layout === 'vertical' ? 'column' : 'row')};
    align-items: center;
`;

export const S_ParticipantName = styled.h3<{ layout?: 'horizontal' | 'vertical' }>`
    overflow: hidden;
    margin: 0;
    font-size: 14px;
    font-weight: 800;

    ${({ layout }) => {
        if (layout === 'horizontal') {
            return `
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 24px;
            `;
        }

        return `
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-wrap: balance;
            text-align: center;
            line-height: 18px;
        `;
    }}

    @media screen and (min-width: ${breakpoints.bp500}) {
        font-size: 20px;

        ${({ layout }) => {
            if (layout === 'horizontal') {
                return `
                    line-height: 32px;
                `;
            }

            return `
                line-height: 28px;
            `;
        }}
    }
`;

export const S_ParticipantImageWrapper = styled.div<{ layout?: 'horizontal' | 'vertical' }>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${({ layout }) => (layout === 'vertical' ? '0 0 8px 0' : '0 8px 0 0')};

    img {
        width: 36px;
        height: 36px;
        flex-shrink: 0;
    }

    ${({ layout }) => {
        if (layout === 'horizontal') {
            return `
                img {
                    width: 24px;
                    height: 24px;
                }
            `;
        }
    }}

    @media screen and (min-width: ${breakpoints.bp500}) {
        ${({ layout }) => {
            if (layout === 'horizontal') {
                return `
                    img {
                        width: 32px;
                        height: 32px;
                    }
                `;
            }
        }}
    }
`;
