import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';
import { MARKET_TEMPLATE } from 'src/utils/constants';

import { type MarketTypeOption } from '../store/atoms';

import SpecialsMarketToggle from './SpecialMarketsToggle/SpecialMarketsToggle';
import { S_FilterButton, S_MarketFiltersWrapper } from './styled';

interface Props {
    selectedMarketType: string[];
    onClick: (marketType: string[]) => void;
    marketFilterOptions: MarketTypeOption[];
    sportType?: SportType;
    isInHeader?: boolean;
}

const MarketFilter = ({ selectedMarketType, marketFilterOptions, sportType, isInHeader, onClick }: Props) => {
    const handleFilterValue = (id: string[]) => () => {
        onClick(id);
    };

    const {
        router: { route },
    } = useAppStateContext();

    const isThreeWayWinnerRoute = route.params.sport === SportType.Football || route.params.sport === SportType.All;

    return (
        <S_MarketFiltersWrapper data-testid='sortController' className='market-filters-wrapper'>
            {marketFilterOptions.map(({ id, label, isDisabled, hasEvents }) => {
                let langKey = '';

                const threeWayWinnerFotbal = isInHeader
                    ? isThreeWayWinnerRoute && id.includes(MARKET_TEMPLATE.threeWayWinner)
                    : sportType === SportType.Football && id.includes(MARKET_TEMPLATE.threeWayWinner);

                const defaultText = threeWayWinnerFotbal ? '1x2' : label;

                if (id[0] === MARKET_TEMPLATE.default) {
                    langKey = 'event.list.header.default';
                } else if (threeWayWinnerFotbal) {
                    langKey = `event.list.header.${MARKET_TEMPLATE.threeWayWinner}`;
                } else {
                    langKey = `event.list.header.${id[0]}`;
                }

                return (
                    <S_FilterButton
                        data-testid={`sort-${threeWayWinnerFotbal ? 'winner' : id[0]}`}
                        key={id[0]}
                        isActive={selectedMarketType.toString() === id.toString() && hasEvents}
                        onClick={handleFilterValue(id)}
                        className='market-item'
                        disabled={isDisabled}
                    >
                        <I18n langKey={langKey} defaultText={defaultText} />
                    </S_FilterButton>
                );
            })}
            {isInHeader && <SpecialsMarketToggle />}
        </S_MarketFiltersWrapper>
    );
};

export default MarketFilter;
