import { format } from 'date-fns';
import { useAtomValue } from 'jotai';

import { currencySelector } from '@sc-account/store/selectors';

import { I18n } from 'src/ui/common/Language/I18n';
import ReadMore from 'src/ui/common/ReadMore';
import { DATE_FORMAT } from 'src/utils/constants';
import { formatAmountWithCurrency } from 'src/utils/format';

import type { FreeBetCredit } from '../../../api/types/freeBet';

import {
    S_FreeBetItemAmount,
    S_FreeBetItemDescription,
    S_FreeBetItemValidity,
    S_FreeBetItemWrapper,
    S_FreeBetListContainer,
} from './styled';

interface Props {
    credits: FreeBetCredit[];
    isOpen: boolean;
    onSelect: (id: number) => void;
}

const FreeBetList = ({ credits, isOpen, onSelect }: Props) => {
    const currency = useAtomValue(currencySelector);

    return (
        <S_FreeBetListContainer freeBetsCount={credits.length}>
            {credits.map(({ id, amount, friendlyDescription, expiryDate = '' }) => (
                <S_FreeBetItemWrapper key={id} data-testid={`freebet-item-${id}`} onClick={() => onSelect(id)}>
                    <S_FreeBetItemAmount data-testid='freebetAmount'>
                        {formatAmountWithCurrency(amount, currency, true)}
                    </S_FreeBetItemAmount>

                    {friendlyDescription != null && (
                        <S_FreeBetItemDescription data-testid='freebetDescription'>
                            <ReadMore text={friendlyDescription} lines={1} isOpen={isOpen} />
                        </S_FreeBetItemDescription>
                    )}

                    <S_FreeBetItemValidity data-testid='freebetValidity'>
                        <I18n langKey='betslip.free-bets.freebets-validity' defaultText='Validity:' />
                        &nbsp;
                        {format(new Date(expiryDate), DATE_FORMAT.NUMERIC_FULL_DATE_TIME_W_SEPARATOR)}
                    </S_FreeBetItemValidity>
                </S_FreeBetItemWrapper>
            ))}
        </S_FreeBetListContainer>
    );
};

export default FreeBetList;
