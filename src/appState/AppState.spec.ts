import { LANGUAGES } from 'src/utils/constants';

describe('test AppState', () => {
    it('should test import', () => {
        expect(Object.keys(LANGUAGES).length !== 0).toBeTruthy();
    });
});
