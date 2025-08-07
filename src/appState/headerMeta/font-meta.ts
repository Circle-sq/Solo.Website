import NotoSans400 from 'src/assets/fonts/noto-sans-v14-latin-regular.woff';
import NotoSans700 from 'src/assets/fonts/noto-sans-v14-latin-700.woff';
import type { FontOptions } from './types';

const fonts: FontOptions = {
    name: 'Noto Sans',
    weights: [400, 700],
    paths: [NotoSans400, NotoSans700],
};

const generateFontFace = (options: FontOptions): string => {
    const { name, weights, paths } = options;

    return weights
        .map(
            (weight, index): string => `
                @font-face {
                    font-family: '${name}';
                    font-style: normal;
                    font-weight: ${weight};
                    src: url('${paths[index]}') format('woff');
                    font-display: swap;
                }
            `,
        )
        .join('');
};

export default function getUniverseFont(): string {
    return generateFontFace(fonts);
}
