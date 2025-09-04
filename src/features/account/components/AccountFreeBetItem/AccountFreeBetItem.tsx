import { format } from 'date-fns';
import { useAtomValue } from 'jotai';

import { currencySelector } from '@solo-account/store/selectors';
import type { FreebetBonusCredit } from '@solo-account/types';

import { useAppStateContext } from 'src/appState/AppState';
import { I18n } from 'src/ui/common/Language/I18n';
import { DATE_FORMAT, LANGUAGES } from 'src/utils/constants';
import { formatAmountWithCurrency } from 'src/utils/format';

import { S_Chip, S_FreeBetBadgeWrapper, S_FreeBetDescription, S_FreeBetValidity, T_UpperBold } from './styled';

interface Props {
    freeBetDetails: FreebetBonusCredit;
}

const AccountFreeBetItem = ({ freeBetDetails }: Props) => {
    const { description = '', languageDescription = '', expiryDate, amount } = freeBetDetails;
    const {
        language: { userLang },
    } = useAppStateContext();

    const isKoreanLanguage = userLang === LANGUAGES.korean;

    const currency = useAtomValue(currencySelector);

    const freeBetAmount = formatAmountWithCurrency(amount, currency, true);
    const formattedValidityDate = format(new Date(expiryDate), DATE_FORMAT.NUMERIC_FULL_DATE_TIME_W_SEPARATOR);
    const friendlyDescription = isKoreanLanguage ? languageDescription : description;

    return (
        <>
            <S_FreeBetBadgeWrapper>
                <S_Chip>
                    <T_UpperBold variant='body5'>
                        <I18n langKey='betslip.free-bets.freebet-label' defaultText='Free bet!' />
                    </T_UpperBold>
                </S_Chip>
                <S_Chip>
                    <T_UpperBold variant='body5'>{freeBetAmount}</T_UpperBold>
                </S_Chip>
            </S_FreeBetBadgeWrapper>
            <S_FreeBetDescription>{`* ${friendlyDescription || languageDescription}`}</S_FreeBetDescription>
            <S_FreeBetValidity>
                <I18n langKey='betslip.free-bets.freebets-validity' defaultText='Validity:' />
                &nbsp;
                {formattedValidityDate}
            </S_FreeBetValidity>
        </>
    );
};

export default AccountFreeBetItem;
