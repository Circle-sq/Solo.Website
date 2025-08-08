import { useAtomValue } from 'jotai';
import get from 'lodash/get';
import { observer } from 'mobx-react-lite';

import { oddsFormatSelector } from '@solo-account/store/selectors';
import type { PlacedBuildABetLeg } from '@solo-betslip/api/types/placedBet';
import { BuildABetIcon, BuildABetLeg } from '@solo-buildABet/ui';

import { useAppStateContext } from 'src/appState/AppState';
import { getOddsFormatPrice } from 'src/utils/common';
import { BAB_ICON_SIZES } from 'src/utils/constants';
import { formatDecimalPart } from 'src/utils/format';

import {
    S_BuildABetAmountContainer,
    S_BuildABetContent,
    S_BuildABetEventName,
    S_BuildABetSelection,
    S_BuildABetSelectionOdd,
    S_IconWrapper,
    TextWrapper,
} from '../styled';

const { width, height } = BAB_ICON_SIZES.xs;

const MultipleBuildBetLeg = ({ leg }: { leg: PlacedBuildABetLeg }) => {
    const { event: legEvent, price, marketsAndSelections } = leg;

    const oddsFormat = useAtomValue(oddsFormatSelector);
    const oddsPrice = getOddsFormatPrice(price, oddsFormat);

    const { models } = useAppStateContext();

    const selectionOdd = formatDecimalPart(oddsPrice);
    const eventId = get(legEvent, 'id', 0);
    const event = models.getEvent(Number(eventId));

    const eventName = event?.name ?? '';

    return (
        <S_BuildABetSelection>
            <S_BuildABetContent>
                <BuildABetLeg marketsAndSelections={marketsAndSelections} />

                <S_BuildABetEventName>
                    <S_IconWrapper>
                        <BuildABetIcon width={width} height={height} />
                    </S_IconWrapper>

                    <TextWrapper>{eventName}</TextWrapper>
                </S_BuildABetEventName>
            </S_BuildABetContent>

            <S_BuildABetAmountContainer>
                <S_BuildABetSelectionOdd>{selectionOdd}</S_BuildABetSelectionOdd>
            </S_BuildABetAmountContainer>
        </S_BuildABetSelection>
    );
};

export default observer(MultipleBuildBetLeg);
