import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';

import { oddsFormatSelector } from '@solo-account/store/selectors';

import { useAppStateContext } from 'src/appState/AppState';
import { getOddsFormatPrice } from 'src/utils/common';
import { formatDecimalPart } from 'src/utils/format';

import type { PlacedCrossBetLeg } from '../../../../../api/types/placedBet';
import CrossBetLeg from '../../../../SelectionItem/CrossBet/CrossBetLeg/CrossBetLeg';
import { S_CrossBetAmount, S_CrossBetLegContent, S_OddPrice, S_SelectionOdd } from '../../styled';
import BetReceiptLegStakeInfo from '../BetReceiptLegStakeInfo/BetReceiptLegStakeInfo';
import { S_EventName, S_EventNameText } from '../styled';

const SingleCrossBet = ({ leg }: { leg: PlacedCrossBetLeg }) => {
    const { event, price, potentialReturns, stakePerLine = null, marketsAndSelections } = leg;

    const { models } = useAppStateContext();

    const oddsFormat = useAtomValue(oddsFormatSelector);
    const oddsPrice = getOddsFormatPrice(price, oddsFormat);
    const selectionOdd = formatDecimalPart(oddsPrice);

    const eventModel = models.getEvent(Number(event.id));
    const eventName = eventModel?.name ?? '';

    return (
        <S_CrossBetLegContent>
            <div>
                <CrossBetLeg marketsAndSelections={marketsAndSelections} showScore eventId={+event.id} />

                <S_EventName>
                    <S_EventNameText>{eventName}</S_EventNameText>
                </S_EventName>
            </div>

            <S_CrossBetAmount>
                <S_SelectionOdd>
                    <S_OddPrice>{selectionOdd}</S_OddPrice>
                </S_SelectionOdd>

                <BetReceiptLegStakeInfo stakePerLine={stakePerLine} potentialReturns={potentialReturns} />
            </S_CrossBetAmount>
        </S_CrossBetLegContent>
    );
};

export default observer(SingleCrossBet);
