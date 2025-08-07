import { isStandalone, hideHeaderInStandalone } from './infra.client';

describe('infra.client', () => {
    it('should correctly identify standalone mode', () => {
        process.env.STANDALONE = 'true';
        expect(isStandalone()).toBe(true);

        process.env.STANDALONE = 'false';
        expect(isStandalone()).toBe(false);
    });

    it('should hide header in standalone mode when show_header is true', () => {
        process.env.STANDALONE = 'true';
        localStorage.setItem('show_header', 'true');
        expect(hideHeaderInStandalone()).toBe(true);
    });

    it('should not hide header in standalone mode when show_header is false', () => {
        process.env.STANDALONE = 'true';
        localStorage.setItem('show_header', 'false');
        expect(hideHeaderInStandalone()).toBe(false);
    });

    it('should not hide header outside standalone mode', () => {
        process.env.STANDALONE = 'false';
        localStorage.setItem('show_header', 'true');
        expect(hideHeaderInStandalone()).toBe(true);
    });
});
