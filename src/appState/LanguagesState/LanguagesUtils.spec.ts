import {
    getTranslationsWithParams,
    clearAllUnusedParams,
    splitMultiDelimeters,
    splitTranslation,
} from './LanguagesUtils';

describe('LanguagesState', () => {
    it('getTranslationsWithParams', () => {
        const translationWithParams = getTranslationsWithParams('{betCount} BET OF £{of} WINS £{wins}', {
            betCount: 1,
            of: 3,
            wins: 55,
        });

        expect(translationWithParams).toBe('1 BET OF £3 WINS £55');
    });

    it('getTranslationsWithParams - empty param', () => {
        const translationWithParams = getTranslationsWithParams('{betCount} BET OF £{of} WINS £{wins}', {
            betCount: 1,
            of: 3,
        });

        expect(translationWithParams).toBe('1 BET OF £3 WINS £');
    });

    it('clearAllUnusedParams', () => {
        expect(clearAllUnusedParams('aaa {fsfsdfdsfds} bbb {dadasdA} ccc')).toBe('aaa  bbb  ccc');
    });

    it('splitMultiDelimeters', () => {
        const splittedArray = splitMultiDelimeters(
            '[SomeParameter {name="ExampleName"}] aaaaa bbbbb [OtherParameter {name="Other Name"} ]cccccccc, [LastParameter] ddddddd. ',
            ['[SomeParameter {name="ExampleName"}]', '[OtherParameter {name="Other Name"} ]', '[LastParameter]'],
        );

        expect(splittedArray).toEqual([
            '[SomeParameter {name="ExampleName"}]',
            ` aaaaa bbbbb `,
            '[OtherParameter {name="Other Name"} ]',
            'cccccccc, ',
            '[LastParameter]',
            ' ddddddd. ',
        ]);
    });

    it('splitTranslation', () => {
        const translationArray = splitTranslation(
            `[SomeParameter {name="ExampleName"}] aaaaa bbbbb [OtherParameter {name="Other Name"} ]cccccccc, [LastParameter] ddddddd. `,
        );

        expect(translationArray).toEqual([
            { params: { name: 'ExampleName' }, tag: 'SomeParameter' },
            ' aaaaa bbbbb ',
            { params: { name: 'Other Name' }, tag: 'OtherParameter' },
            'cccccccc, ',
            { params: {}, tag: 'LastParameter' },
            ' ddddddd. ',
        ]);
    });
});
