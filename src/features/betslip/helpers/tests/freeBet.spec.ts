import { pickFreeBetCredit } from '../freeBet';

describe('pickFreeBetCredit', () => {
    const credit1 = { id: 1, amount: 10, promotionId: null };
    const credit2 = { id: 2, amount: 20, promotionId: 'promo-123', friendlyDescription: 'Free bet credit' };
    const credit3 = { id: 3, amount: 30, promotionId: 'promo-456', expiryDate: '2023-07-31' };
    const credits = [credit1, credit2, credit3];

    const assignment = { credits, selectedId: 2 };

    it('should return the selected credit if it exists', () => {
        const result = pickFreeBetCredit(assignment);

        expect(result).toEqual(credit2);
    });

    it('should return null if the selected credit does not exist', () => {
        const result = pickFreeBetCredit({ ...assignment, selectedId: 4 });

        expect(result).toBeNull();
    });

    it('should return the credit with the specified creditId if provided', () => {
        const result = pickFreeBetCredit(assignment, 3);

        expect(result).toEqual(credit3);
    });

    it('should return null if the specified creditId does not exist', () => {
        const result = pickFreeBetCredit(assignment, 5);

        expect(result).toBeNull();
    });
});
