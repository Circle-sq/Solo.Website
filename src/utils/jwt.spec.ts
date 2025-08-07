import { decodeJwt, encodeJwt } from './jwt';

describe('parseJwt', () => {
    it('should parse jwt token', () => {
        const data = {
            type: 'user',
            currency: 100,
        };
        const token = encodeJwt(data);
        const output = decodeJwt(token);

        expect(output).toEqual(data);
    });
});
