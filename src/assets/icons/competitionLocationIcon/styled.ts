import styled from '@emotion/styled';

export const Icon = styled.span<{ src: string; fontSize: 'xsmall' | 'small' | 'medium' | 'large' }>`
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    margin-right: 8px;
    align-self: center;

    ${(props): string => {
        const { src, fontSize } = props;

        let styles = `
            background-image: url('${src}');
        `;

        if (fontSize === 'xsmall') {
            styles += `
                height: 12px;
                width: 12px;
                min-width: 12px;
            `;
        }

        if (fontSize === 'small') {
            styles += `
                height: 16px;
                width: 16px;
            `;
        }

        if (fontSize === 'medium') {
            styles += `
                height: 24px;
                width: 24px;
            `;
        }

        if (fontSize === 'large') {
            styles += `
                width: 32px;
                min-width: 32px;
                height: 22px;
            `;
        }

        return `${styles}`;
    }}
`;

export const S_AlignmentBox = styled.div`
    display: flex;
    align-items: center;
    margin-right: 8px;

    & > img {
        margin-right: 0;
    }
`;
