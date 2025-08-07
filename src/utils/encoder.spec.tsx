import { encoder } from './encoder';

const originalBtoa = window.btoa;

describe('encoder function', () => {
    beforeAll(() => {
        window.btoa = (value: string) => Buffer.from(value).toString('base64');
    });
    afterAll(() => {
        window.btoa = originalBtoa;
    });
    it('encodes a string using base64', () => {
        const label = 'test';
        const idx1 = 1;
        const idx2 = 2;

        const result1 = encoder(label, idx1);
        const result2 = encoder(label, idx2);
        const theSameResultAs1 = encoder(label, idx1);

        expect(result1).not.toEqual(result2);
        expect(result1).toEqual(theSameResultAs1);
    });
});
