import { useAtomValue } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import type { MouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { currencySelector } from '@solo-account/store/selectors';
import { DownArrowIcon, UpArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { useOnClickOutside } from 'src/appState/customHooks';
import { setShowBackdropTask } from 'src/ui/betting/store/tasks';
import { I18n } from 'src/ui/common/Language/I18n';
import { formatAmountWithCurrency } from 'src/utils/format';

import type { FreeBetAssignment } from '../../../api/types/freeBet';
import { pickFreeBetCredit } from '../../../helpers/freeBet';
import { betslipSelectionsCountSelector } from '../../../store/selectors/selections';
import FreeBetList from '../list/FreeBetList';

import {
    CheckBoxIcon,
    FreeBetsContainerHeader,
    FreeBetsContent,
    FreeBetsContentHeader,
    FreeBetsDropdownWrapper,
    FreeBetsLabel,
    FreeBetsLabelElWrapper,
    FreeBetsSelect,
    FreeBetsWrapper,
    S_FreeBetOverlay,
} from './styled';

interface Props {
    freeBets: FreeBetAssignment;
    onToggleFreeBet: () => void;
    onSelectFreeBet: (id: number) => void;
    isDisabled?: boolean;
}

const FreeBetsDropdown = ({ freeBets, onToggleFreeBet, onSelectFreeBet, isDisabled = false }: Props) => {
    const { credits } = freeBets;

    const [isOpen, setIsOpen] = useState(false);

    const selectedFreeBet = pickFreeBetCredit(freeBets);
    const betslipSelectionsCount = useRecoilValue(betslipSelectionsCountSelector);
    const currency = useAtomValue(currencySelector);

    const setShowBackdrop = useRecoilCallback(setShowBackdropTask, []);

    const closeFreeBetDropdown = () => {
        setIsOpen(false);
        setShowBackdrop(false);
    };

    const freeBetsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        closeFreeBetDropdown();
    }, [betslipSelectionsCount]);

    useOnClickOutside(freeBetsRef, () => {
        if (isOpen) {
            closeFreeBetDropdown();
        }
    });

    const disableRedirect = (e: MouseEvent) => () => {
        e.stopPropagation();
        e.preventDefault();
    };

    const handleSelect = (id: number) => {
        onSelectFreeBet(id);
        setIsOpen(!isOpen);
        setShowBackdrop(false);
    };

    const openDropdown = (e: MouseEvent) => {
        disableRedirect(e);

        if (isDisabled) {
            return;
        }

        setShowBackdrop(!isOpen);
        setIsOpen(!isOpen);
    };

    const isChecked = selectedFreeBet !== null;

    const activeFreeBetValue = useMemo(() => {
        const freeBetsCount = credits.length;

        if (freeBetsCount > 1 && !isChecked) {
            return (
                <span>
                    {freeBetsCount}&nbsp;
                    <I18n langKey='betslip.free-bets.freebets-label' defaultText='free bets available' />
                </span>
            );
        }

        const [credit] = credits;
        const amount = selectedFreeBet !== null && !isEmpty(selectedFreeBet) ? selectedFreeBet.amount : credit.amount;

        const formattedAmount = formatAmountWithCurrency(amount, currency, true);

        return formattedAmount;
    }, [currency, selectedFreeBet, credits.length, isChecked]);

    return (
        <FreeBetsWrapper onClick={disableRedirect} ref={freeBetsRef}>
            <FreeBetsSelect isOpen={isOpen}>
                <CheckBoxIcon
                    testId='checkFreeBet'
                    isChecked={isChecked}
                    onChange={onToggleFreeBet}
                    field='Checkbox'
                    color={cssColor('--checkbox-warning-color')}
                />
                <FreeBetsLabel onClick={openDropdown} data-testid='freebet-dropdown'>
                    <FreeBetsLabelElWrapper>
                        <I18n langKey='betslip.free-bets.freebet-label' defaultText='Free bet!' />
                    </FreeBetsLabelElWrapper>
                    <FreeBetsLabelElWrapper>{activeFreeBetValue}</FreeBetsLabelElWrapper>
                    <FreeBetsLabelElWrapper>
                        {isOpen ? (
                            <UpArrowIcon color={cssColor('--icon-arrow-primary-color')} style={{ fontSize: '8px' }} />
                        ) : (
                            <DownArrowIcon color={cssColor('--icon-arrow-primary-color')} style={{ fontSize: '8px' }} />
                        )}
                    </FreeBetsLabelElWrapper>
                </FreeBetsLabel>
            </FreeBetsSelect>
            <FreeBetsDropdownWrapper isOpen={isOpen} data-testid={`freebetDropdown-${isOpen ? 'open' : 'closed'}`}>
                <FreeBetsContainerHeader>
                    <I18n langKey='betslip.free-bets.freebet-selection' defaultText='Free bet selection' />
                </FreeBetsContainerHeader>
                <FreeBetsContent>
                    <FreeBetsContentHeader>
                        <I18n
                            langKey='betslip.free-bets.freebet-header'
                            defaultText='Any winnings will be paid, excluding the free bet amount'
                        />
                    </FreeBetsContentHeader>

                    <FreeBetList credits={credits} isOpen={isOpen} onSelect={handleSelect} />
                </FreeBetsContent>
            </FreeBetsDropdownWrapper>
            <S_FreeBetOverlay isActive={isDisabled} />
        </FreeBetsWrapper>
    );
};

export default FreeBetsDropdown;
