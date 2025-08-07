import { sortMappedStreams } from './helpers';
import { mappedStreams, sortedMappedStreams } from './test/configMock';

describe('Media stream config', () => {
    it('should sort mapped streams by sportDisplayOrder competitionDisplayOrder eventStartTime', () => {
        expect(sortMappedStreams(mappedStreams)).toEqual(sortedMappedStreams);
    });
});
