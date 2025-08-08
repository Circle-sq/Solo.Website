import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

import { isAuthenticatedAtom } from '@solo-account/store/atoms';

import MyBetsContainer from './MyBetsContainer/MyBetsContainer';
import MyBetsTabs from './MyBetsTabs/MyBetsTabs';
import NotLoggedUser from './NotLoggedUser/NotLoggedUser';
import { resetMyBetsFiltersTask } from './store/tasks';
import { S_MyBets } from './styled';

const MyBets = () => {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const resetMyBetsFilters = useRecoilCallback(resetMyBetsFiltersTask, []);

    useEffect(() => {
        return () => {
            resetMyBetsFilters();
        };
    }, [resetMyBetsFilters]);

    if (!isAuthenticated) {
        return (
            <S_MyBets>
                <NotLoggedUser />
            </S_MyBets>
        );
    }

    return (
        <S_MyBets className='bets'>
            <MyBetsTabs />
            <MyBetsContainer />
        </S_MyBets>
    );
};

export default MyBets;
