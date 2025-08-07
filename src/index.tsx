import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'src/layouts/App/App';
import WeAreSorry from 'src/layouts/WeAreSorry/WeAreSorry';
import { storageIsAvailable } from 'src/utils/StorageService';

import { getElement, initIndex } from './index.init';

const root = createRoot(getElement('root'));

if (!storageIsAvailable(() => localStorage)) {
    root.render(<WeAreSorry />);
} else {
    initIndex();
    const cache = createCache({ key: 'emotion' });

    root.render(
        <CacheProvider value={cache}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CacheProvider>,
    );
}
