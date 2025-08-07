import classNames from 'classnames';
import { useAtomValue } from 'jotai';

import { OddsFormatLong } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';

import { useChangeOddsFormat } from '../../api/mutations';
import { oddsFormatSelector } from '../../store/selectors';

import { S_Gap, S_OddsRadioButtons, S_RadioButton } from './styled';

const OddsFormatSwitcher = () => {
    const oddsFormat = useAtomValue(oddsFormatSelector);

    const { mutate: changeOddsFormat } = useChangeOddsFormat();

    return (
        <S_OddsRadioButtons data-testid='balanceTab-oddsRadioButtons'>
            <S_RadioButton
                data-testid='fractionalOddsFormat'
                active={oddsFormat === OddsFormatLong.Fractional}
                onClick={() => changeOddsFormat(OddsFormatLong.Fractional)}
            >
                <I18n langKey='account.summary.odds-type.fractional.label' defaultText='Fractional' />
            </S_RadioButton>

            <S_Gap />

            <S_RadioButton
                data-testid='decimalOddsFormat'
                active={oddsFormat === OddsFormatLong.Decimal}
                className={classNames({ active: oddsFormat === OddsFormatLong.Decimal })}
                onClick={() => changeOddsFormat(OddsFormatLong.Decimal)}
            >
                <I18n langKey='account.summary.odds-type.decimal.label' defaultText='Decimal' />
            </S_RadioButton>
        </S_OddsRadioButtons>
    );
};

export default OddsFormatSwitcher;
