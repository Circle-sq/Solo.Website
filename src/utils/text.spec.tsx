import { escapeRegExp } from './text';

describe('escapeRegExp', () => {
    it('should escape regexp special characters in a string', () => {
        const text = 'a!b#c$d%e^f&g*h)i(j+k=l.m<n>o{p}q[r]s:t;u\'v"w/x~y`z_a-';
        const expectedOutput =
            'a\\!b\\#c\\$d\\%e\\^f\\&g\\*h\\)i\\(j\\+k\\=l\\.m\\<n\\>o\\{p\\}q\\[r\\]s\\:t\\;u\\\'v\\"w/x\\~y\\`z\\_a\\-';

        const escapedText = escapeRegExp(`${text}`);

        expect(escapedText).toEqual(expectedOutput);
    });
});
