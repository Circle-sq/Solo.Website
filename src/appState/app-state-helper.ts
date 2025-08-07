export const getFromSsr = <T>(
    src: Record<string, unknown>,
    ssrProperty: string,
    property = 'not provided',
): null | T => {
    if (typeof src !== 'object') {
        return null;
    }

    const ssrValue = src[ssrProperty];

    if (typeof ssrValue !== 'string') {
        return null;
    }

    if (!ssrValue) {
        return null;
    }

    const ssrValueParsed = JSON.parse(ssrValue);

    if (property === 'not provided') {
        return ssrValueParsed;
    }

    if (typeof ssrValueParsed !== 'object') {
        return null;
    }

    if (typeof ssrValueParsed[property] !== 'undefined') {
        return ssrValueParsed[property];
    }

    return null;
};
