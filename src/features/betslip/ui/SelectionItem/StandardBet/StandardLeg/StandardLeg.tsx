import { observer } from 'mobx-react-lite';
import { useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';

import type { Leg } from '../../../../api/types/leg';
import { isSingleTabSelector } from '../../../../store/selectors/betslipTab';
import { S_MarketName, S_SelectionName, SelectionName, SelectionNameWrapper } from '../styled';

const StandardLeg = ({ leg }: { leg: Leg }) => {
    const selectionId = leg.selectionId ?? leg.selection?.id;

    const { models } = useAppStateContext();

    const isSingleTab = useRecoilValue(isSingleTabSelector);

    const selection = models.getSelection(Number(selectionId));
    const selectionName = selection?.name;

    const marketId = leg.marketId ?? leg.market?.id;
    const market = models.getMarket(Number(marketId));
    const marketName = market?.name ?? '';

    return (
        <S_SelectionName data-testid={`selectionName-${selectionName}`} isSingleTab={isSingleTab}>
            <SelectionNameWrapper isSingleTab={isSingleTab}>
                <SelectionName title={selectionName}>{selectionName}</SelectionName>
                <S_MarketName data-testid='marketName'>{marketName}</S_MarketName>
            </SelectionNameWrapper>
        </S_SelectionName>
    );
};

export default observer(StandardLeg);
