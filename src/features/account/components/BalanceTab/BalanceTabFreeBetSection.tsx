import { useAtomValue } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { memo, useRef, useState } from 'react';

import { DownArrowIcon, UpArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { I18n } from 'src/ui/common/Language/I18n';
import { formatAmountWithCurrency } from 'src/utils/format';

import { freebetCreditsAtomWithQuery } from '../../store/queries';
import { currencySelector } from '../../store/selectors';
import AccountFreeBetItem from '../AccountFreeBetItem/AccountFreeBetItem';

import {
    S_BalanceTabFreeBetsItemsContainer,
    S_FreeBetCount,
    S_Item,
    S_Label,
    S_ToggleButton,
    S_Value,
    S_ValueWrapper,
} from './styled';

interface Props {
    isDesktop?: boolean;
    toggleHandler?: () => void;
}

const BalanceTabFreeBetSection = ({ isDesktop = true, toggleHandler }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const creditItemsContainerRef = useRef<HTMLDivElement>(null);

    const {
        data: { bonusCredits, totalAmount },
    } = useAtomValue(freebetCreditsAtomWithQuery);

    const currency = useAtomValue(currencySelector);
    const formattedTotalAmount = formatAmountWithCurrency(totalAmount, currency);

    const onToggle = () => {
        const newIsOpen = !isOpen;

        if (newIsOpen && creditItemsContainerRef.current !== null && creditItemsContainerRef?.current?.scrollIntoView) {
            requestAnimationFrame(() => {
                creditItemsContainerRef?.current?.scrollIntoView({ behavior: 'instant', block: 'end' });
            });
        }

        if (toggleHandler !== undefined) {
            toggleHandler();
        }

        setIsOpen(newIsOpen);
    };

    const renderCreditItems = () => {
        if (!isOpen) {
            return null;
        }

        const credits = map(bonusCredits, (freeBetCredit) => (
            <S_Item isFreeBet={true} showItemsBorder={isDesktop} key={freeBetCredit.id} data-testid='freeBetItem'>
                <AccountFreeBetItem freeBetDetails={freeBetCredit} />
            </S_Item>
        ));

        if (isDesktop) {
            return <>{credits}</>;
        }

        return <S_BalanceTabFreeBetsItemsContainer>{credits}</S_BalanceTabFreeBetsItemsContainer>;
    };

    return (
        <>
            <S_Item data-testid='balanceTab-freeBet'>
                <S_Label data-testid='balanceTab-freeBetLabel'>
                    <I18n langKey='balancetab.freebet.label' defaultText='Freebet' />
                    {!isEmpty(bonusCredits) && (
                        <S_FreeBetCount data-testid='freeBetCount'>{bonusCredits.length}</S_FreeBetCount>
                    )}
                </S_Label>

                <S_ValueWrapper>
                    {!isEmpty(bonusCredits) && (
                        <S_ToggleButton isOpen={isOpen} onClick={onToggle} data-testid='freeBetDropdownToggle'>
                            {isOpen ? (
                                <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-light-color')} />
                            ) : (
                                <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-light-color')} />
                            )}
                        </S_ToggleButton>
                    )}
                    <S_Value data-testid='balanceTab-freeBetValue'>{formattedTotalAmount}</S_Value>
                </S_ValueWrapper>
            </S_Item>

            <div ref={creditItemsContainerRef}>{renderCreditItems()}</div>
        </>
    );
};

export default memo(BalanceTabFreeBetSection);
