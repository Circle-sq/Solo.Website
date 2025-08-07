import { atom } from 'jotai';

import { unleashClient } from '../client';

export const unleashClientAtom = atom(unleashClient);

unleashClientAtom.onMount = () => {
    void unleashClient.start();

    return () => {
        unleashClient.stop();
    };
}

if (process.env.NODE_ENV !== 'production') {
    unleashClientAtom.debugPrivate = true;
}
