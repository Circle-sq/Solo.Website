import { fromJS } from 'immutable';

import { remapESoccerStreams } from 'src/modules/media/effects/stream';

import { sortMappedStreams, mapStreamsToDropdownOptions } from './helpers';
import { streamsMock, sportsMock } from './test/mocks';

describe('MediaDropdown', () => {
    it('should render sport group headers', () => {
        expect(
            sortMappedStreams(mapStreamsToDropdownOptions(remapESoccerStreams(streamsMock), fromJS(sportsMock))).map(
                (item) => item.label,
            ),
        ).toEqual(['Football', 'Basketball', 'Tennis', 'CS:GO', 'Dota 2']);
    });
});
