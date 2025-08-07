import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import Corners from 'src/assets/statistics_icons/Corners.svg';
import RedCard from 'src/assets/statistics_icons/RedCard.svg';
import YellowCard from 'src/assets/statistics_icons/YellowCard.svg';

import { StatisticType } from '../../../../constants';

import CardsAndCornersStats from './CardsAndCornersStats';

const stats = [
    {
        id: 1,
        type: StatisticType.YellowCards,
        icon: YellowCard,
        count: 2,
    },
    {
        id: 2,
        type: StatisticType.RedCards,
        icon: RedCard,
        count: 1,
    },
    {
        id: 3,
        type: StatisticType.CornerKicks,
        icon: Corners,
        count: 7,
    },
];

describe('CardsAndCornersStats', () => {
    it('should render component without errors and stats icons', () => {
        const { getByTestId } = renderWithAppWrapper(<CardsAndCornersStats stats={stats} />);

        expect(getByTestId('cardsAndCornersStats')).toBeInTheDocument();

        // stats yellow card icon
        expect(getByTestId('stats-count-1')).toHaveTextContent('2');
        // stats red card icon
        expect(getByTestId('stats-count-2')).toHaveTextContent('1');
        // stats stats corners icon
        expect(getByTestId('stats-count-3')).toHaveTextContent('7');
    });
});
