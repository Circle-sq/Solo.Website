import { useAtomValue, useSetAtom } from 'jotai';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import type { MultiValue, SingleValue } from 'react-select';

import { currenciesAtomWithQuery } from '@sc-account/store/queries';
import type { MediaOption } from '@sc-media/ui/videoStream/dropdown/types';

import { hasLanguageSwitcherInAccountMenu } from 'src/config/features_flags';
import { isStandalone } from 'src/infra.client';
import DropdownSelect from 'src/ui/common/DropdownSelect/DropdownSelect';
import LanguageSelector from 'src/ui/common/Header/BurgerMenu/LanguageSelector';
import { I18n } from 'src/ui/common/Language/I18n';
import type { Option } from 'src/ui/crossbetting/FilterDropdown/types';
import { formatAmountWithCurrency } from 'src/utils/format';
import isLocal from 'src/utils/isLocal';

import { userDataAtom } from '../../store/atoms';
import { setUserWallet } from '../../store/helpers';
import { currencySelector, playableBalanceSelector } from '../../store/selectors';
import AccountSummary from '../AccountSummary/AccountSummary';
import LogoutButton from '../LogoutButton/LogoutButton';

import BalanceTabFreeBetSection from './BalanceTabFreeBetSection';
import { S_Container, S_Item, S_Label, S_LanguagePlaceholderItem, S_Value, S_Wrapper } from './styled';

const isSingleValue = <T,>(value: SingleValue<T> | MultiValue<T>): value is SingleValue<T> =>
    !Array.isArray(value) && value !== null;

const BalanceTab = () => {
    const showLanguageMenu = hasLanguageSwitcherInAccountMenu();
    const isIFrame = window.parent !== window.self;

    const playableBalance = useAtomValue(playableBalanceSelector);
    const currency = useAtomValue(currencySelector);
    const balance = formatAmountWithCurrency(playableBalance, currency);
    const setUserData = useSetAtom(userDataAtom);
    const { data: currencies } = useAtomValue(currenciesAtomWithQuery);

    const onCurrencyChange = (newValue: SingleValue<Option | MediaOption> | MultiValue<Option | MediaOption>) => {
        if (isEmpty(newValue) || !isSingleValue(newValue)) {
            return;
        }

        const balance = find(currencies?.balances, ({ currency }) => currency === newValue.value);

        if (balance !== undefined) {
            setUserData(setUserWallet(balance));
        }
    };

    return (
        <S_Container data-testid='balanceTabContainer'>
            <S_Wrapper>
                <S_Item data-testid='balanceTab-totalBalance'>
                    <S_Label data-testid='balanceTab-totalBalanceLabel'>
                        <I18n langKey='balancetab.totalbalance.label' defaultText='Total Balance' />
                    </S_Label>
                    <S_Value data-testid='balanceTab-totalBalanceValue'>{balance}</S_Value>
                </S_Item>
                <S_Item data-testid='balanceTab-totalBalance'>
                    {!isEmpty(currencies?.balances) && !isStandalone() && isLocal() && (
                        <>
                            <S_Label>Select Currency </S_Label>
                            <DropdownSelect
                                value={{
                                    label: currency,
                                    value: currency,
                                }}
                                options={map(currencies?.balances, (currencyData) => ({
                                    label: currencyData.currency,
                                    value: currencyData.currency,
                                }))}
                                showAllItems={true}
                                onChange={onCurrencyChange}
                            />
                        </>
                    )}
                </S_Item>
                <BalanceTabFreeBetSection />
                {showLanguageMenu && (
                    <S_LanguagePlaceholderItem last={isIFrame}>
                        <S_Label data-testid='balanceTab-languageLabel'>
                            <I18n langKey='account.summary.language.label' defaultText='Language' />
                        </S_Label>
                        <S_Value data-testid='balanceTab-languageValue'>
                            <LanguageSelector />
                        </S_Value>
                    </S_LanguagePlaceholderItem>
                )}
            </S_Wrapper>

            {isLocal() && !isIFrame ? (
                <>
                    <S_Wrapper>
                        <S_Item>Dev zone:</S_Item>
                    </S_Wrapper>
                    <LogoutButton />
                    <AccountSummary />
                </>
            ) : null}
        </S_Container>
    );
};

export default BalanceTab;
