import { useRecoilValue } from 'recoil';

import { BuildABetCardContent } from '@solo-buildABet/ui';

import type { Leg } from '../../../api/types/leg';
import useBetType from '../../../hooks/useBetType';
import { showAnimationLoaderSelectorFamily } from '../../../store/selectors/animation';
import CrossBet from '../CrossBet/CrossBet';
import LoaderContent from '../LoaderContent/LoaderContent';
import StandardBet from '../StandardBet/StandardBet';

interface Props {
    leg: Leg;
    changeStakeInput: (value: number) => void;
}

const CardBetContent = ({ leg, changeStakeInput }: Props) => {
    const betId = leg.selectionId ?? leg.id;

    const { isBuildABet, isCrossBet } = useBetType(leg);
    const showLoader = useRecoilValue(showAnimationLoaderSelectorFamily(betId));

    if (showLoader) {
        return <LoaderContent />;
    }

    if (isBuildABet) {
        return <BuildABetCardContent leg={leg} changeStakeInput={changeStakeInput} />;
    }

    if (isCrossBet) {
        return <CrossBet leg={leg} changeStakeInput={changeStakeInput} />;
    }

    return <StandardBet leg={leg} changeStakeInput={changeStakeInput} />;
};

export default CardBetContent;
