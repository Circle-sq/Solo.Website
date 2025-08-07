import { useRecoilValue } from 'recoil';

import { PlacedBetType } from 'src/common/enums';

import { sortBetReceiptLegs } from '../../../helpers/betReceipt';
import { betReceiptAtom } from '../../../store/atoms/betReceipt';
import { betslipSelectionsAtom } from '../../../store/atoms/selections';
import { identifiedBetTypeSelector } from '../../../store/selectors/betReceipt';

import MultipleBetItem from './MultipleBetItem/MultipleBetItem';
import SingleBetItem from './SingleBetItem/SingleBetItem';
import { S_BetReceiptItems } from './styled';

const BetReceiptItems = () => {
    const { legs } = useRecoilValue(betReceiptAtom);
    const selections = useRecoilValue(betslipSelectionsAtom);
    const placedBetType = useRecoilValue(identifiedBetTypeSelector);

    const isSingleBet = placedBetType === PlacedBetType.Single;

    const sortedLegs = sortBetReceiptLegs(legs, selections);

    return (
        <S_BetReceiptItems>
            {isSingleBet ? (
                sortedLegs.map((leg) => <SingleBetItem key={leg.uuid} leg={leg} />)
            ) : (
                <MultipleBetItem legs={sortedLegs} />
            )}
        </S_BetReceiptItems>
    );
};

export default BetReceiptItems;
