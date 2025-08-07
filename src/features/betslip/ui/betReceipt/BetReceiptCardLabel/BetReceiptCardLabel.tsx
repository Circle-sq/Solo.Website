import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import { PlacedBetType } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';

import { betTypeNameTranslations } from '../../../i18n/betType';
import { betReceiptAtom } from '../../../store/atoms/betReceipt';
import { betTypeNameSelector, identifiedBetTypeSelector } from '../../../store/selectors/betReceipt';

const BetReceiptCardLabel = () => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const betTypeName = useRecoilValue(betTypeNameSelector);
    const placedBetType = useRecoilValue(identifiedBetTypeSelector);
    const { betsCount, legs } = useRecoilValue(betReceiptAtom);

    const translatedBetType = useMemo(() => {
        if (isEmpty(betTypeName)) {
            return '';
        }

        if (!(betTypeName in betTypeNameTranslations)) {
            return betTypeName;
        }

        const { key, defaultText } = betTypeNameTranslations[betTypeName];

        return getTranslation(key, defaultText);
    }, [betTypeName]);

    switch (placedBetType) {
        case PlacedBetType.Single: {
            const betsCount = legs.length;

            return (
                <I18n
                    langKey='betslip.receipt.card-label.single'
                    defaultText={`Single - {betsCount} bet${betsCount > 1 ? 's' : ''}`}
                    params={{ betsCount }}
                />
            );
        }

        case PlacedBetType.Multi:
            return <>{translatedBetType}</>;

        case PlacedBetType.System:
            return (
                <I18n
                    langKey='betslip.receipt.card-label.system'
                    defaultText='{betTypeName} - {betsCount} bets'
                    params={{ betTypeName: translatedBetType, betsCount }}
                />
            );

        default:
            return null;
    }
};

export default BetReceiptCardLabel;
