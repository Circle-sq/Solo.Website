import type { PlacedBetLeg } from '../../../../api/types/placedBet';

import SingleBetHeader from './SingleBetHeader/SingleBetHeader';
import SingleBetItemContent from './SingleBetItemContent/SingleBetItemContent';
import { S_SingleBetItem } from './styled';

const SingleBetItem = ({ leg }: { leg: PlacedBetLeg }) => {
    return (
        <S_SingleBetItem>
            <SingleBetHeader leg={leg} />

            <SingleBetItemContent leg={leg} />
        </S_SingleBetItem>
    );
};

export default SingleBetItem;
