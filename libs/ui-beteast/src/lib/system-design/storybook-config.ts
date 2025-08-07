import map from 'lodash/map';

import { fontWeight } from '@sc-ui/system';

const headingFontWeights = [
    { weightName: 'bold', fontWeight: fontWeight.bold },
    { weightName: 'semibold', fontWeight: fontWeight.semibold },
];

const bodyFontWeights = [
    { weightName: 'medium', fontWeight: fontWeight.medium },
    { weightName: 'regular', fontWeight: fontWeight.regular },
];

const headingSizes = [
    { variant: 'h1', size: 'lg', fontSize: '16px', lineHeight: '24px' } as const,
    { variant: 'h2', size: 'md', fontSize: '14px', lineHeight: '20px' } as const,
    { variant: 'h3', size: 'sm', fontSize: '12px', lineHeight: '16px' } as const,
    { variant: 'h4', size: 'xs', fontSize: '10px', lineHeight: '12px' } as const,
] as const;

const bodySizes = [
    { variant: 'body1', size: 'lg', fontSize: '16px', lineHeight: '24px' } as const,
    { variant: 'body2', size: 'md', fontSize: '14px', lineHeight: '20px' } as const,
    { variant: 'body3', size: 'sm', fontSize: '12px', lineHeight: '16px' } as const,
    { variant: 'body4', size: 'xs', fontSize: '10px', lineHeight: '12px' } as const,
    { variant: 'body5', size: 'xxs', fontSize: '8px', lineHeight: '12px' } as const,
] as const;

const headings = map(headingSizes, (heading) => {
    const { size } = heading;

    return map(headingFontWeights, ({ weightName, fontWeight }) => ({
        styleName: `heading/${size}-${weightName}`,
        fontWeight,
        ...heading,
    }));
}).flat();

const bodies = map(bodySizes, (body) => {
    const { size } = body;

    return map(bodyFontWeights, ({ weightName, fontWeight }) => ({
        styleName: `body/${size}-${weightName}`,
        fontWeight,
        ...body,
    }));
}).flat();

export const typographySamples = [...headings, ...bodies] as const;
