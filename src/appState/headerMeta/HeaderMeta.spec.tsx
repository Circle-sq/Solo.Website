import map from 'lodash/map';
import uniqBy from 'lodash/uniqBy';

import { HeaderMeta } from './HeaderMeta';

describe('HeaderMeta', function () {
    it('should render meta headers (array should contain unique keys/ids)', () => {
        const headers = new HeaderMeta();
        const {
            props: { children: metaHeaderElements },
        } = headers.metaToStaticJsx;

        expect(map(uniqBy(metaHeaderElements, 'key'), 'key').join('|')).toEqual(
            map(metaHeaderElements, 'key').join('|'),
        );
    });

    it('should not include manifestLink or iosIconLink', () => {
        const headers = new HeaderMeta();
        expect(headers.metaList).not.toContainEqual({
            id: 'manifestLink',
            tag: 'link',
            text: undefined,
            attr: {},
        });
    });
});
