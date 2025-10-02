import get from 'lodash/get';
import type { MouseEvent } from 'react';
import { useCallback } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { Button } from '@mui/material';

import { CheckBoxBlankOutlineIcon, CheckboxIcon, CloseIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { closeQuickBetTask } from 'src/ui/betting/store/tasks';
import { slug } from 'src/utils/deburr';

import { usePossibleBets } from '../../../api/possibleBets/queries';
import type { FreeBetAssignment } from '../../../api/types/freeBet';
import type { Leg } from '../../../api/types/leg';
import { PossibleBetsTriggeredBy } from '../../../enums';
import { isCheckedBetslipBetSelectorFamily } from '../../../store/selectors/betslipBets';
import { isSingleTabSelector } from '../../../store/selectors/betslipTab';
import { showCardFreeBetsDropdown } from '../../../store/selectors/freeBets';
import { toggleBetslipBetTask } from '../../../store/tasks/betslipBet/toggle';
import { selectSingleBetFreeBetTask, toggleSingleBetFreeBetTask } from '../../../store/tasks/freeBets';
import FreeBetsDropdown from '../../freeBet/dropdown/FreeBetsDropdown';
import { ContentLink } from '../../styled';
import { S_RemoveSelectionButton } from '../styled';

import CardAlertIcon from './CardAlertIcon';
import CardBetContent from './CardBetContent';
import { CardContentFreeBetsWrapper, CardContentMainWrapper, CardContentWrapper, ContentFirstColumn } from './styled';

interface Props {
    leg: Leg;
    eventId: number;
    freeBets: FreeBetAssignment;
    onRemoveSelection: (event: MouseEvent<HTMLButtonElement>) => void;
    changeStakeInput: (stakePerLine: number) => void;
}

const CardContent = ({ leg, eventId, freeBets, onRemoveSelection, changeStakeInput }: Props) => {
    const betId = leg.selectionId ?? leg.id;

    const { getPossibleBets } = usePossibleBets();

    const isSingleTab = useRecoilValue(isSingleTabSelector);
    const isChecked = useRecoilValue(isCheckedBetslipBetSelectorFamily(betId));
    const showFreeBetsDropdown = useRecoilValue(showCardFreeBetsDropdown(betId));

    const { models } = useAppStateContext();
    const event = models.getEvent(Number(eventId));

    const legEventName = get(leg, 'eventName', get(leg, 'event.name'));
    const eventOriginalName = event?.originalName ?? legEventName ?? '';

    const toggleBetslipBet = useRecoilCallback(toggleBetslipBetTask, []);
    const selectSingleBetFreeBet = useRecoilCallback(selectSingleBetFreeBetTask, []);
    const toggleSingleBetFreeBet = useRecoilCallback(toggleSingleBetFreeBetTask, []);

    const onToggleBetslipBet = useCallback(() => {
        toggleBetslipBet(betId);
        getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.ToggleBetslipBet });
    }, [betId, toggleBetslipBet, getPossibleBets]);

    const onSelectFreeBet = useCallback(
        (creditId: number) => {
            selectSingleBetFreeBet(betId, creditId);
            getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.SelectFreeBet });
        },
        [betId, getPossibleBets, selectSingleBetFreeBet],
    );

    const onToggleFreeBet = useCallback(() => {
        toggleSingleBetFreeBet(betId);
        getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.ToggleFreeBet });
    }, [betId, getPossibleBets, toggleSingleBetFreeBet]);

    const closeQuickBet = useRecoilCallback(closeQuickBetTask, []);

    return (
        <CardContentWrapper>
            <CardContentMainWrapper>
                <ContentFirstColumn>
                    <Button
                        sx={{ minWidth: 'unset', borderRadius: '15%', ':hover': { backgroundColor: 'unset' } }}
                        onClick={onToggleBetslipBet}
                        data-testid='selectionCheckbox'
                    >
                        {isChecked ? (
                            <CheckboxIcon fontSize='small' color={cssColor('--icon-selected-bg')} />
                        ) : (
                            <CheckBoxBlankOutlineIcon fontSize='small' color={cssColor('--icon-default-color')} />
                        )}
                    </Button>
                    <CardAlertIcon leg={leg} />
                </ContentFirstColumn>
                <ContentLink
                    route='event'
                    params={{ id: eventId, slug: slug(eventOriginalName) }}
                    onClick={closeQuickBet}
                >
                    <CardBetContent leg={leg} changeStakeInput={changeStakeInput} />
                </ContentLink>

                {!isSingleTab && (
                    <S_RemoveSelectionButton onClick={onRemoveSelection} testId='removeSelection' isMultiples>
                        <CloseIcon color={cssColor('--icon-color')} fontSize='small' />
                    </S_RemoveSelectionButton>
                )}
            </CardContentMainWrapper>

            {showFreeBetsDropdown && (
                <CardContentFreeBetsWrapper>
                    <FreeBetsDropdown
                        freeBets={freeBets}
                        onSelectFreeBet={onSelectFreeBet}
                        onToggleFreeBet={onToggleFreeBet}
                    />
                </CardContentFreeBetsWrapper>
            )}
        </CardContentWrapper>
    );
};

export default CardContent;
