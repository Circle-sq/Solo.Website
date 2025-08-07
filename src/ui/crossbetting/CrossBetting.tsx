import { useWindowWidth } from '@sc-hooks';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import CrossBettingEvents from 'src/ui/events/containers/CrossBettingEvents/CrossBettingEvents';

import CrossBettingSports from './CrossBetingSports/CrossBettingSports';
import CrossBetNotification from './CrossBetNotification/CrossbetNotification';
import CrossBettingHeader from './CrossBettingHeader/CrossBettingHeader';
import MarketFilter from './MarketFilters/MarketFilter';
import MobileFilters from './MobileFilters/MobileFilters';
import { marketTypeOptionsAtom, selectedEventCardMarketTypeAtom, selectedMarketTypeAtom } from './store/atoms';
import { S_CrossBettingWrapper, S_CrossBettingContent } from './styled';
import WeekFilter from './WeekFilter/WeekFilter';

const CrossBetting = ({ testId }: { testId?: string }) => {
    const { isTablet } = useWindowWidth();
    const [selectedMarketType, setSelectedMarketType] = useRecoilState(selectedMarketTypeAtom);
    const setSelectedEventCardMarketType = useSetRecoilState(selectedEventCardMarketTypeAtom);

    const marketFilterOptions = useRecoilValue(marketTypeOptionsAtom);

    const handleOnClick = (id: string[]) => {
        setSelectedMarketType(id);
        setSelectedEventCardMarketType(id);
    };

    return (
        <S_CrossBettingWrapper data-testid={testId}>
            {!isTablet && <CrossBettingHeader />}
            <WeekFilter />
            <CrossBettingSports />
            <S_CrossBettingContent>
                <MarketFilter
                    selectedMarketType={selectedMarketType}
                    marketFilterOptions={marketFilterOptions}
                    onClick={handleOnClick}
                    isInHeader
                />
                <CrossBetNotification />
                {isTablet && <MobileFilters />}
                <CrossBettingEvents />
            </S_CrossBettingContent>
        </S_CrossBettingWrapper>
    );
};

export default CrossBetting;
