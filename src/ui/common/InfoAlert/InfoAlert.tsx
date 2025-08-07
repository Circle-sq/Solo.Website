import type { PropsWithChildren, ReactElement } from 'react';

import type { BetError } from '@sc-betslip/api/types/error';
import { InfoBlueIcon } from '@sc-ui/icons/svg';

import { ErrorIcon, SuccessIcon, WarningIcon } from 'src/assets/icons/alertIcons';

import { getError } from './errors';
import { S_InfoAlert, S_InfoBodyMessage, S_InfoHeaderMessage, S_InfoMessage, S_InfoTitleMessage } from './styled';
import type { AlertIconConfig } from './types';
import { cssColor } from '@sc-ui/system';

interface Props {
    type: string;
    header?: ReactElement;
    testId?: string;
    error?: BetError;
    iconPosition?: string;
}

const InfoAlert = (props: PropsWithChildren<Props>) => {
    const { header, children, type, error, iconPosition, testId = 'validationMessage' } = props;

    const config: AlertIconConfig = {
        warning: {
            icon: <WarningIcon />,
        },
        error: {
            icon: <ErrorIcon />,
        },
        success: {
            icon: <SuccessIcon />,
        },
        info: {
            icon: <InfoBlueIcon fontSize='small' color={cssColor('--icon-info-bg')} />,
        },
    };

    return (
        <S_InfoAlert type={type}>
            <S_InfoMessage type={type}>
                <S_InfoTitleMessage iconPosition={iconPosition} type={type}>
                    {config[type].icon}
                </S_InfoTitleMessage>
                <S_InfoBodyMessage data-testid={testId}>
                    {Boolean(header) && <S_InfoHeaderMessage>{header}</S_InfoHeaderMessage>}
                    {Boolean(error) && getError(error)}
                    {children}
                </S_InfoBodyMessage>
            </S_InfoMessage>
        </S_InfoAlert>
    );
};

export default InfoAlert;
