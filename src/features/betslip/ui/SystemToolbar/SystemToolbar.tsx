import { memo, useMemo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import DropdownList from 'src/ui/common/DropdownList/DropdownList';

import { usePossibleBets } from '../../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../../enums';
import { systemBetTypeAtom } from '../../store/atoms/combinations';
import { systemCombinationTypesSelector } from '../../store/selectors/combinations';
import { hasOfferSelector } from '../../store/selectors/offer';
import { changeSystemBetTypeTransaction } from '../../store/transactions/combinations';

import { S_Option, S_Toolbar } from './styled';

const SystemToolbar = () => {
    const hasOffer = useRecoilValue(hasOfferSelector);
    const systemBetType = useRecoilValue(systemBetTypeAtom);
    const systemCombinationTypes = useRecoilValue(systemCombinationTypesSelector);

    const {
        language: { getTranslation },
    } = useAppStateContext();

    const { getPossibleBetsWithCombination } = usePossibleBets();

    const onSystemBetTypeChange = useRecoilCallback(
        ({ transact_UNSTABLE: transact }) =>
            (betType: string) => {
                transact(changeSystemBetTypeTransaction(betType));

                getPossibleBetsWithCombination({ triggeredBy: PossibleBetsTriggeredBy.ChangeSystemBetType });
            },
        [getPossibleBetsWithCombination],
    );

    const items = useMemo(
        () =>
            systemCombinationTypes.map((type) => ({
                id: type,
                label: getTranslation(type, type),
            })),
        [systemCombinationTypes, getTranslation],
    );

    return (
        <S_Toolbar isDisabled={hasOffer}>
            <DropdownList
                items={items}
                selected={systemBetType}
                onChange={onSystemBetTypeChange}
                optionRenderer={(item) => {
                    if (item === undefined) {
                        return null;
                    }

                    const { label } = item;

                    return <S_Option data-testid={`betType-${label}`}>{label}</S_Option>;
                }}
            />
        </S_Toolbar>
    );
};

export default memo(SystemToolbar);
