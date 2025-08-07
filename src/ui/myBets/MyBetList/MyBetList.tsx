import { Fragment, memo } from 'react';
import { useRecoilValue } from 'recoil';

import type { MyBetsPageData } from '@sc-api/bets/types';

import useRetrieveCashOut from '../hooks/useRetrieveCashOut';
import MyBetItem from '../MyBetItem/MyBetItem';
import { myBetsQueryStatusSelector } from '../store/selectors';

interface Props {
    pages: MyBetsPageData[];
    isFetching: boolean;
    isSuccess: boolean;
}

const MyBetList = ({ pages, isFetching, isSuccess }: Props) => {
    const queryStatus = useRecoilValue(myBetsQueryStatusSelector);

    const { retrieveBetCashOut, clearCashOutedBet } = useRetrieveCashOut();

    return (
        <>
            {pages.map(({ bets, pageParam = 1 }) => (
                <Fragment key={pageParam}>
                    {bets.map((bet) => {
                        if (bet.betId === null) {
                            return;
                        }

                        return (
                            <MyBetItem
                                key={bet.id}
                                bet={bet}
                                queryStatus={queryStatus}
                                clearCashOutedBet={clearCashOutedBet}
                                retrieveBetCashOut={retrieveBetCashOut}
                                isFetching={isFetching}
                                isSuccess={isSuccess}
                            />
                        );
                    })}
                </Fragment>
            ))}
        </>
    );
};

export default memo(MyBetList);
