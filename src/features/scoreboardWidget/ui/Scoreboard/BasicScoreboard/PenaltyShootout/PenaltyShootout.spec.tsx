import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import PenaltyShootout from './PenaltyShootout';

describe('PenaltyShootout', () => {
    const mockEvent = {
        id: 1,
    };

    it('should render PenaltyShootout component and penalty score areas', async () => {
        const { getByTestId } = renderWithAppWrapper(<PenaltyShootout eventId={mockEvent.id} />);

        const scoreArea = getByTestId('penalty-score-area');
        const penaltyScores = scoreArea.querySelectorAll('div');

        expect(getByTestId('penalty-score-area')).toBeInTheDocument();
        expect(scoreArea).toHaveTextContent('0-0'); // 0-0 complete score
        expect(penaltyScores[0]).toHaveTextContent('0'); // Home penalty score
        expect(penaltyScores[1]).toHaveTextContent('-'); // Separator
        expect(penaltyScores[2]).toHaveTextContent('0'); // Away penalty score
    });
});
