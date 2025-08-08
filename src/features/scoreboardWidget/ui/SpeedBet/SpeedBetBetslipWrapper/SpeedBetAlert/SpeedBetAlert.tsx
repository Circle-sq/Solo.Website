import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { typographyColor } from '@solo-ui/system';

import { I18n } from 'src/ui/common/Language/I18n';

import { CloseIcon } from '../../../../assets/icons';
import { speedBetAlertAtom } from '../../../../store/atoms';
import { closeSpeedBetAlertTask } from '../../../../store/tasks';

import { S_CloseButton, S_Icon, S_SpeedBetAlert } from './styled';
import { useSpeedBetAlertHandler } from './useSpeedBetAlertHandler';

const AUTO_HIDE_DURATION = 4000;

const SpeedBetAlert = () => {
    const { open, type } = useRecoilValue(speedBetAlertAtom);
    const { alertConfig } = useSpeedBetAlertHandler(type);

    const closeSpeedBetAlert = useRecoilCallback(closeSpeedBetAlertTask, []);

    useEffect(() => {
        if (!open || !alertConfig.autoHide) {
            return;
        }

        const timer = setTimeout(() => {
            closeSpeedBetAlert();
        }, AUTO_HIDE_DURATION);

        return () => clearTimeout(timer);
    }, [open, closeSpeedBetAlert, alertConfig.autoHide]);

    if (!open) {
        return null;
    }

    return (
        <S_SpeedBetAlert data-testid='speedBetBetslipAlert' variant={alertConfig.variant}>
            <S_Icon data-testid='speedBetBetslipAlertIcon'>{alertConfig.icon}</S_Icon>
            <Typography
                data-testid='speedBetBetslipAlertHeader'
                component='h3'
                variant='h3'
                sx={{
                    color: typographyColor.white,
                    marginBottom: '5px',
                }}
            >
                <I18n langKey={alertConfig.label.langKey} defaultText={alertConfig.label.defaultText} />
            </Typography>
            <Typography
                data-testid='speedBetBetslipAlertMessage'
                component='p'
                sx={{
                    color: typographyColor.textPrimary,
                    fontSize: '11px',
                    lineHeight: '17px',
                }}
            >
                <I18n
                    langKey={alertConfig.message.langKey}
                    defaultText={alertConfig.message.defaultText}
                    params={alertConfig.params}
                />
            </Typography>
            {!alertConfig.isPersistentError && (
                <S_CloseButton onClick={closeSpeedBetAlert} data-testid='speedBetBetslipAlertCloseButton'>
                    <CloseIcon />
                </S_CloseButton>
            )}
        </S_SpeedBetAlert>
    );
};

export default SpeedBetAlert;
