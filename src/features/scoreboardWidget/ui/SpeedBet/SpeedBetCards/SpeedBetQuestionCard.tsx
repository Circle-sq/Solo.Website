import { useMemo } from 'react';
import { useRecoilValue, useRecoilCallback } from 'recoil';

import { GreenPalette, LightBluePalette, YellowPalette } from '@sc-ui/system';

import { SportType, OddsFormat } from 'src/common/enums';
import type { MarketItem } from 'src/common/types/market';
import { useSpeedMarketTranslations } from 'src/features/scoreboardWidget/hooks/useSpeedMarketTranslations';
import { speedBetSportAtom, previousSpeedBetStakeAtom } from 'src/features/scoreboardWidget/store/atoms';
import { getPrice } from 'src/ui/myBets/utils/helpers';

import { DEFAULT_STAKE, SELECTIONS_IDENTIFIERS } from '../../../constants';
import { setSpeedBetMarketTask, setSpeedBetStakeTask, closeSpeedBetAlertTask } from '../../../store/tasks';

import OddsArrow from './OddsArrow';
import {
    S_SpeedBetCard,
    S_MarketName,
    S_Selections,
    S_YesSelection,
    S_NoSelection,
    S_SelectionPrice,
    S_SelectionName,
    S_ContextNote,
} from './styled';
import { findSelectionByIdentifier } from './utils';

interface Props {
    market: MarketItem;
}

const SpeedBetQuestionCard = ({ market }: Props) => {
    const selections = Object.values(market.selections);

    const yesSelection = findSelectionByIdentifier(selections, SELECTIONS_IDENTIFIERS.yes);
    const noSelection = findSelectionByIdentifier(selections, SELECTIONS_IDENTIFIERS.no);

    const speedBetSport = useRecoilValue(speedBetSportAtom);
    const previousSpeedBetStake = useRecoilValue(previousSpeedBetStakeAtom);

    const setSpeedBetMarket = useRecoilCallback(setSpeedBetMarketTask, []);
    const setSpeedBetStake = useRecoilCallback(setSpeedBetStakeTask, []);
    const closeSpeedBetAlert = useRecoilCallback(closeSpeedBetAlertTask, []);

    const cardBgColor = useMemo(() => {
        switch (speedBetSport) {
            case SportType.Basketball:
                return YellowPalette.yellow5;

            case SportType.IceHockey:
                return LightBluePalette.lightBlue13;

            default:
                return GreenPalette.green4;
        }
    }, [speedBetSport]);

    const handleSelection = (value: string) => () => {
        const selection = value === SELECTIONS_IDENTIFIERS.yes ? yesSelection : noSelection;

        setSpeedBetMarket({ market, selection });
        closeSpeedBetAlert();

        if (previousSpeedBetStake) {
            setSpeedBetStake(previousSpeedBetStake);
        } else {
            setSpeedBetStake(DEFAULT_STAKE);
        }
    };

    const { marketName, yesSelectionLabel, noSelectionLabel, contextNote } = useSpeedMarketTranslations(market);

    return (
        <S_SpeedBetCard bg={cardBgColor} data-testid={`market-${market.id}`}>
            <S_MarketName data-testid='marketname'>{marketName}</S_MarketName>

            {/* TODO: Restore after MVP */}
            {/*<S_ConstraintNote>{market?.speedBetContext?.constraint}</S_ConstraintNote>*/}
            <S_Selections>
                <S_YesSelection onClick={handleSelection(SELECTIONS_IDENTIFIERS.yes)} data-testid='yesSelection'>
                    <S_SelectionName data-testid='yesSelectionName'>
                        {yesSelectionLabel || yesSelection?.name}
                    </S_SelectionName>
                    <OddsArrow price={yesSelection?.price?.d} data-testid='yesSelectionOddsArrow' />
                    <S_SelectionPrice data-testid='yesSelectionPrice'>
                        {getPrice(yesSelection?.price, OddsFormat.Decimal)}
                    </S_SelectionPrice>
                </S_YesSelection>
                <S_NoSelection onClick={handleSelection(SELECTIONS_IDENTIFIERS.no)} data-testid='noSelection'>
                    <S_SelectionName data-testid='noSelectionName'>
                        {noSelectionLabel || noSelection?.name}
                    </S_SelectionName>
                    <OddsArrow price={noSelection?.price?.d} data-testid='noSelectionOddsArrow' />
                    <S_SelectionPrice data-testid='noSelectionPrice'>
                        {getPrice(noSelection?.price, OddsFormat.Decimal)}
                    </S_SelectionPrice>
                </S_NoSelection>
            </S_Selections>
            <S_ContextNote>{contextNote}</S_ContextNote>
        </S_SpeedBetCard>
    );
};

export default SpeedBetQuestionCard;
