import * as uuid from 'uuid';

import { getSportsLinks } from '../utils';

vi.mock('uuid');

describe('SportsList', () => {
    afterAll(() => {
        vi.resetAllMocks();
    });
    const uuidV4 = '07dd5a4a-08cb-4bc3-a900-c3529f10a0d3';

    it('should handle existing sport', () => {
        vi.spyOn(uuid, 'v4').mockReturnValueOnce(uuidV4);

        const mockData = [
            {
                id: 'football',
                label: 'Football',
                displayOrder: 90,
                testId: 'sport-football',
            },
        ];
        const expectedLinks = [
            {
                route: 'sport',
                params: { id: 'football' },
                label: 'Football',
                iconName: 'sports-4',
                testId: 'sport-football',
                uuid: uuidV4,
            },
        ];
        const sportLinks = getSportsLinks(mockData);

        expect(sportLinks).toEqual(expectedLinks);
    });

    it('should handle a non-existent sport', () => {
        const mockData = [
            {
                id: 'testsport123',
                label: 'Testsport123',
                displayOrder: 90,
                testId: 'sport-testsport123',
            },
        ];
        const expectedLinks = [
            {
                route: 'sport',
                params: { id: 'testsport123' },
                label: 'Testsport123',
                iconName: 'sports-globe',
                testId: 'sport-testsport123',
            },
        ];
        const sportLinks = getSportsLinks(mockData);

        expect(sportLinks).toEqual(expectedLinks);
    });

    it('should handle an empty list', () => {
        const sportLinks = getSportsLinks([]);

        expect(sportLinks).toEqual([]);
    });
});
