import { useRecoilValue } from 'recoil';

import { I18n } from 'src/ui/common/Language/I18n';

import { priceChangeSelectorFamily } from '../../../../store/selectors/animation';

import { S_SelectionPriceAction, S_SelectionStatus } from './styled';

interface Props {
    betId: string;
    oddsPrice: string | number | null;
    isClosed: boolean;
    isSuspended: boolean;
}

const SelectionPrice = ({ betId, oddsPrice, isClosed, isSuspended }: Props) => {
    const priceDirection = useRecoilValue(priceChangeSelectorFamily(betId));

    return (
        <S_SelectionPriceAction
            priceChange={priceDirection}
            isSuspended={isSuspended}
            data-testid='selectionAction'
            data-test-direction={priceDirection}
        >
            {isClosed ? (
                <S_SelectionStatus>
                    <I18n langKey='betslip.selection.closed' defaultText='closed' />
                </S_SelectionStatus>
            ) : (
                <span data-testid='selectionPrice'>{oddsPrice}</span>
            )}
        </S_SelectionPriceAction>
    );
};

export default SelectionPrice;
