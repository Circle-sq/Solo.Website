import deburr, { slug } from './deburr';

test('deburr', () => {
    expect(deburr('Déjà vu')).toBe('Deja vu');
    expect(deburr('Tête à tête.')).toBe('Tete a tete.');
    expect(deburr('Comon ça va')).toBe('Comon ca va');
});

test('slug', () => {
    expect(slug('Foo/Bar+Baz')).toBe('foo-bar-baz');
});
