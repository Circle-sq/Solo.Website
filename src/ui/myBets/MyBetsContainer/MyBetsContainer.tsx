import classnames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { MyBetsTab } from 'src/common/enums';
import { isStandalone } from 'src/infra.client';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';
import { LOAD_MORE_THRESHOLD } from 'src/utils/constants';

import AlertMessage from '../AlertMessage/AlertMessage';
import BetFilters from '../BetFilters/BetFilters';
import BetSorting from '../BetSorting/BetSorting';
import EmptyFilters from '../EmptyFilters/EmptyFilters';
import useAccountBetsSubscribe from '../hooks/useAccountBetsSubscribe';
import useCashoutSubscribe from '../hooks/useCashoutSubscribe';
import useMyBetsQuery from '../hooks/useMyBetsQuery';
import MyBetList from '../MyBetList/MyBetList';
import { isTabFiltersTouchedSelector, myBetsTabSelector } from '../store/selectors';
import { resetTabFiltersTask } from '../store/tasks';
import { S_AlertMessage, S_MyBetsContainer, S_MyBetsStatusContainer } from '../styled';

const MyBetsContainer = () => {
    const myBetsTab = useRecoilValue(myBetsTabSelector);
    const isTabFiltersTouched = useRecoilValue(isTabFiltersTouchedSelector);
    const resetTabFilters = useRecoilCallback(resetTabFiltersTask);

    useAccountBetsSubscribe();

    const {
        pages,
        hasBets,
        loadMoreBets,
        showLoadMore,
        showEmptyFilters,
        showLoader,
        isFetching,
        isSuccess,
        isError,
        isFetchingNextPage,
    } = useMyBetsQuery();

    useCashoutSubscribe(pages);

    const isLiveTab = myBetsTab === MyBetsTab.Live;
    const isSettledTab = myBetsTab === MyBetsTab.Settled;
    const isOpenTab = myBetsTab === MyBetsTab.CashOut;

    const isSettledBetsEmpty = isSettledTab && !hasBets && !isTabFiltersTouched;
    const isLiveBetsEmpty = isLiveTab && !hasBets;
    const showAlertMessage = !hasBets || isError;

    const { ref, entry } = useInView({
        root: null,
        threshold: LOAD_MORE_THRESHOLD,
    });

    useEffect(() => {
        if (!isSettledTab) {
            resetTabFilters();
        }
    }, [isSettledTab]);

    useEffect(() => {
        if (!isUndefined(entry) && entry.isIntersecting && !isFetching && !isFetchingNextPage) {
            loadMoreBets();
        }
    }, [entry, isFetching, isFetchingNextPage]);

    if (showLoader) {
        return (
            <S_MyBetsStatusContainer>
                <Loader
                    testId='loadingBetsMessage'
                    message={<I18n langKey='bets.loading' defaultText='Loading bets...' />}
                />
            </S_MyBetsStatusContainer>
        );
    }

    if (showEmptyFilters) {
        return (
            <S_MyBetsContainer>
                <BetFilters />
                <EmptyFilters />
            </S_MyBetsContainer>
        );
    }

    if (showAlertMessage) {
        return (
            <S_MyBetsStatusContainer>
                <S_AlertMessage>
                    {isSettledTab && <BetFilters />}
                    <AlertMessage
                        isError={isError}
                        isLiveBetsEmpty={isLiveBetsEmpty}
                        isSettledBetsEmpty={isSettledBetsEmpty}
                        hasBets={hasBets}
                    />
                </S_AlertMessage>
            </S_MyBetsStatusContainer>
        );
    }

    return (
        <S_MyBetsContainer className={classnames({ navigationStandalone: isStandalone() })}>
            {isSettledTab && <BetFilters />}
            {isOpenTab && <BetSorting />}

            <MyBetList pages={pages} isFetching={isFetching} isSuccess={isSuccess} />

            {showLoadMore && !isFetching && !isFetchingNextPage && <div ref={ref} style={{ marginBottom: '5px' }} />}
            {isFetchingNextPage && (
                <Loader
                    testId='loadingBetsMessage'
                    message={<I18n langKey='bets.loading' defaultText='Loading bets...' />}
                />
            )}
        </S_MyBetsContainer>
    );
};

export default observer(MyBetsContainer);
