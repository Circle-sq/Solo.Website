import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { isAuthenticatedAtom } from '@sc-account/store/atoms';
import { BinIcon, GearIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import type { TimeOut } from 'src/common/types/main';
import { I18n } from 'src/ui/common/Language/I18n';
import Tooltip from 'src/ui/common/Tooltip/Tooltip';

import { betslipBetsCounterSelector } from '../../store/selectors/betslipBets';
import {
    closeBettingSettingsPopupTask,
    openBettingSettingsPopupTask,
    resetBetslipStateTask,
} from '../../store/tasks/betslip';

import { Button, S_ConfirmDeleteBtn, S_MarginBox } from './styled';

const CONFIRM_DELETE_ALL_TIMEOUT = 5000;

const ActionButtons = () => {
    const timeout = useRef<TimeOut | null>(null);

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const betsCount = useRecoilValue(betslipBetsCounterSelector);

    const closeBettingSettingsPopup = useRecoilCallback(closeBettingSettingsPopupTask, []);
    const openBettingSettingsPopup = useRecoilCallback(openBettingSettingsPopupTask, []);
    const resetBetslipState = useRecoilCallback(resetBetslipStateTask, []);

    const [showConfirmDeleteBtn, setShowConfirmDeleteBtn] = useState(false);

    const showDeleteConfirmation = betsCount > 0 && showConfirmDeleteBtn;

    useEffect(() => {
        return () => {
            if (timeout.current !== null) {
                clearTimeout(timeout.current);
            }

            closeBettingSettingsPopup();
        };
    }, []);

    const onConfirmDeleteAll = () => {
        setShowConfirmDeleteBtn(true);

        timeout.current = setTimeout(() => {
            setShowConfirmDeleteBtn(false);
        }, CONFIRM_DELETE_ALL_TIMEOUT);
    };

    if (showDeleteConfirmation) {
        return (
            <S_ConfirmDeleteBtn onClick={resetBetslipState} data-testid='confirmDeleteSelections'>
                <I18n langKey='betslip.action.confirm-delete' defaultText='Confirm delete all' />
                <S_MarginBox>
                    <BinIcon fontSize='small' color={cssColor('--icon-generic-color')} />
                </S_MarginBox>
            </S_ConfirmDeleteBtn>
        );
    }

    return (
        <>
            {isAuthenticated && (
                <Button data-testid='bettingSettings' onClick={openBettingSettingsPopup}>
                    <Tooltip title={<I18n langKey='betslip.settings.title' defaultText='Betting settings' />}>
                        <GearIcon fontSize='small' color={cssColor('--icon-color')} />
                    </Tooltip>
                </Button>
            )}

            <Button onClick={onConfirmDeleteAll} data-testid='removeAllSelections'>
                <Tooltip title={<I18n langKey='betslip.delete.selections' defaultText='Delete all' />}>
                    <BinIcon fontSize='small' color={cssColor('--icon-color')} />
                </Tooltip>
            </Button>
        </>
    );
};

export default ActionButtons;
