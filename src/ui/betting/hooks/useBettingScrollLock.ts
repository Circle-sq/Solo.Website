import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useScrollLock } from 'usehooks-ts';

import { bettingAtom } from '../store/atoms';

export const useBettingScrollLock = () => {
    const { showMyBets } = useRecoilValue(bettingAtom);
    const { lock, unlock } = useScrollLock({ autoLock: false });

    useEffect(() => {
        if (showMyBets) {
            lock();
        } else {
            unlock();
        }

        return unlock;
    }, [showMyBets, lock, unlock]);
};
