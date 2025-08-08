import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';

import { oddsFormatSelector } from '@solo-account/store/selectors';
import { CrossBetIcon } from '@solo-ui/icons/svg';

import { useAppStateContext } from 'src/appState/AppState';
import { getOddsFormatPrice } from 'src/utils/common';
import { formatDecimalPart } from 'src/utils/format';

import type { PlacedCrossBetLeg } from '../../../../../api/types/placedBet';
import CrossBetLeg from '../../../../SelectionItem/CrossBet/CrossBetLeg/CrossBetLeg';
import { S_CrossBetAmount, S_CrossBetLegContent, S_OddPrice, S_SelectionOdd } from '../../styled';
import { S_EventName } from '../styled';

const MultipleCrossBetLeg = ({ leg }: { leg: PlacedCrossBetLeg }) => {
    const { event, price, marketsAndSelections } = leg;

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
                    <CrossBetIcon fontSize='small' />

                    <p>{eventName}</p>
                </S_EventName>
            </div>

            <S_CrossBetAmount>
                <S_SelectionOdd>
                    <S_OddPrice>{selectionOdd}</S_OddPrice>
                </S_SelectionOdd>
            </S_CrossBetAmount>
        </S_CrossBetLegContent>
    );
};

export default observer(MultipleCrossBetLeg);
