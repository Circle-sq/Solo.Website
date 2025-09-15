import { screen } from '@testing-library/react';

import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import { TypeLineName } from 'src/common/enums';
import { LANGUAGES } from 'src/utils/constants';

import { FIRST_LINE_LIMIT } from './configs';
import LinesEllipsis from './LinesEllipsis';
import type { Props } from './types';
import { getLines } from './utils';

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => ({
            language: {
                userLang: 'en-GB',
                getTranslation(_key: string, defaultValue: string) {
                    return defaultValue;
                },
            },
        }),
        default: vi.fn(),
    };
});

describe('LinesEllipsis', () => {
    it(`should render home participant name into component`, () => {
        const expectedFirstLine = 'RC Celta delab';
        const expectedSecondLine = 'Vigo SRL';

        const props: Props = {
            maxLines: 2,
            text: 'RC Celta delab Vigo SRL',
            title: 'RC Celta delab Vigo SRL',
            typeLine: TypeLineName.default,
            testId: 'homeParticipant',
        };

        renderWithTheme(<LinesEllipsis {...props} />);

        expect(screen.getByTestId('homeParticipant-firstLine')).toHaveTextContent(expectedFirstLine);
        expect(screen.getByTestId('homeParticipant-secondLine')).toHaveTextContent(expectedSecondLine);
    });

    it(`should render away participant name into component`, () => {
        const expectedFirstLine = 'Atletico dela';
        const expectedSecondLine = 'Madrid';

        const props: Props = {
            maxLines: 2,
            text: 'Atletico dela Madrid',
            title: 'Atletico dela Madrid',
            typeLine: TypeLineName.default,
            testId: 'awayParticipant',
        };

        renderWithTheme(<LinesEllipsis {...props} />);

        expect(screen.getByTestId('awayParticipant-firstLine')).toHaveTextContent(expectedFirstLine);
        expect(screen.getByTestId('awayParticipant-secondLine')).toHaveTextContent(expectedSecondLine);
    });

    it(`should handle korean/english characters`, () => {
        const expectedKoreanText = '젤레지아';
        const expectedEnglishText = 'Leeds United';

        expect(expectedKoreanText).toMatch(/[가-힣]/);
        expect(expectedEnglishText).not.toMatch(/[가-힣]/);
    });

    describe('should handle english participants name', () => {
        const maxLimitByLang = FIRST_LINE_LIMIT[LANGUAGES.english][TypeLineName.default].max;

        it('should handle english participant name with 1 word in the first line', () => {
            const expectedFirstLine = 'Wolverhamptongs';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toBe('');
        });

        it('should handle english participant name with 2 words in the first line', () => {
            const expectedFirstLine = 'Leeds Uniteded';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toBe('');
        });

        it('should handle english participant name with 3 words', () => {
            const expectedFirstLine = 'Real Este FC d';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toBe('');
        });

        it('should handle english participant name with 4 words and more', () => {
            const line = 'RC Celta delal Vigo SRL';
            const expectedFirstLine = 'RC Celta delal';
            const expectedSecondLine = 'Vigo SRL';

            const [firstLine, secondLine] = getLines(line, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toEqual(expectedSecondLine);
        });

        it('should handle english participant name with line between words', () => {
            const line = 'Bethune-Cookman Wildcats';
            const expectedFirstLine = '';
            const expectedSecondLine = 'Bethune-Cookman Wildcats';

            const [firstLine, secondLine] = getLines(line, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toEqual(expectedSecondLine);
        });
    });

    describe('should handle korean participants name with words', () => {
        const maxLimitByLang = FIRST_LINE_LIMIT[LANGUAGES.korean][TypeLineName.default].max;

        it('should handle korean participant name with 1 word in the first line', () => {
            const expectedFirstLine = '젤레지아르네포드드';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toBe('');
        });

        it('should handle korean participant name with 2 words in the first line', () => {
            const expectedFirstLine = '젤레지아네 네포드';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toBe('');
        });

        it('should handle korean participant name with 3 words', () => {
            const expectedFirstLine = '젤레네 르네 포드';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toBe('');
        });

        it('should handle korean participant name with 4 words and more', () => {
            const line = '젤레지아르 네포드 포드 포드';
            const expectedFirstLine = '젤레지아르 네포드';
            const expectedSecondLine = '포드 포드';

            const [firstLine, secondLine] = getLines(line, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toEqual(expectedSecondLine);
        });
    });

    describe('should handle english participants name with uniform', () => {
        const maxLimitByLang = FIRST_LINE_LIMIT[LANGUAGES.english][TypeLineName.uniform].max;

        it('should handle english participant name with 1 word and uniform in the first line', () => {
            const expectedFirstLine = 'Wolverhas';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(expectedFirstLine).toEqual(firstLine);
            expect('').toEqual(secondLine);
        });

        it('should handle english participant name with 2 words and uniform in the first line', () => {
            const expectedFirstLine = 'Leeds Uni';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toBe('');
        });

        it('should handle english participant name with 3 words and uniform in the first line', () => {
            const expectedFirstLine = 'Rel Es FC';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toBe('');
        });

        it('should handle english participant name with 4 words, uniform and more', () => {
            const line = 'RC Cer Da Va';
            const expectedFirstLine = 'RC Cer Da';
            const expectedSecondLine = 'Va';

            const [firstLine, secondLine] = getLines(line, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toEqual(expectedSecondLine);
        });
    });

    describe('should handle korean participants name with words and uniform', () => {
        const maxLimitByLang = FIRST_LINE_LIMIT[LANGUAGES.korean][TypeLineName.uniform].max;

        it('should handle korean participant name with 1 word and uniform in the first line', () => {
            const expectedFirstLine = '젤레지아르아';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toBe('');
        });

        it('should handle korean participant name with 2 words and uniform in the first line', () => {
            const expectedFirstLine = '젤레 네포아';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toBe('');
        });

        it('should handle korean participant name with 3 words and uniform in the first line', () => {
            const expectedFirstLine = '젤아 르 드';

            const [firstLine, secondLine] = getLines(expectedFirstLine, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toBe('');
        });

        it('should handle korean participant name with 4 words, uniform and more', () => {
            const line = '젤레지 아르 네포드 포드';
            const expectedFirstLine = '젤레지 아르';
            const expectedSecondLine = '네포드 포드';

            const [firstLine, secondLine] = getLines(line, maxLimitByLang);

            expect(firstLine).toEqual(expectedFirstLine);
            expect(secondLine).toEqual(expectedSecondLine);
        });
    });
});
