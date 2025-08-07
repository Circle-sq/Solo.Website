import { render } from '@testing-library/react';

import TennisScoreTable, { type TennisScoreData } from './TennisScoreTable';

vi.mock('./ServingIndicator', () => ({
    default: ({ serving }: { serving: boolean }) => {
        return <span>{serving ? '●' : ''}</span>;
    },
}));

function sanitizeText(text: string[]): string {
    return text.join('').replace(/\s+/g, '').replace(/\|/g, '');
}
describe('TennisScoreTable', () => {
    it('should render 1st player serving', () => {
        const scoreData: TennisScoreData = {
            points: [15, 30],
            games: [5, 4],
            sets: [2, 1],
            serving: [true, false],
        };
        const { baseElement } = render(<TennisScoreTable scoreData={scoreData} />);

        expect(baseElement).toHaveTextContent(
            // prettier-ignore
            sanitizeText([
                '● 15 5 |2',
                '  30 4 |1',
                '   P G  S'
            ]),
        );
    });

    it('should render 2nd player serving', () => {
        const scoreData: TennisScoreData = {
            points: [15, 30],
            games: [5, 4],
            sets: [2, 1],
            serving: [false, true],
        };
        const { baseElement } = render(<TennisScoreTable scoreData={scoreData} />);

        expect(baseElement).toHaveTextContent(
            // prettier-ignore
            sanitizeText([
                '  15 5 |2',
                '● 30 4 |1',
                '   P G  S'
            ]),
        );
    });

    it('should render 1st player having advantage', () => {
        const scoreData: TennisScoreData = {
            points: ['A', 30],
            games: [5, 4],
            sets: [2, 1],
            serving: [true, false],
        };
        const { baseElement } = render(<TennisScoreTable scoreData={scoreData} />);

        expect(baseElement).toHaveTextContent(
            // prettier-ignore
            sanitizeText([
                '●  A 5 |2',
                '  30 4 |1',
                '   P G  S'
            ]),
        );
    });
});
