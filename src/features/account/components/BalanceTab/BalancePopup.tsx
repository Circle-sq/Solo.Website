import { useWindowResize, useWindowWidth } from '@solo-hooks';

import type { PopUpProps } from 'src/common/types/popup';
import { I18n } from 'src/ui/common/Language/I18n';

import BalanceTab from './BalanceTab';
import { S_BalancePopupWindow } from './styled';

const BalancePopup = ({ onClose }: PopUpProps) => {
    const { isDesktop } = useWindowWidth();

    useWindowResize(() => {
        if (isDesktop) {
            onClose();
        }
    });

    return (
        <S_BalancePopupWindow
            title={<I18n langKey='account.tabs.balance.title' defaultText='My Balance' />}
            onCloseModal={onClose}
            className='' //Need this to forward the styled classes from @emotion/styled, to encapsulate styles just for BalancePopup.
        >
            <BalanceTab />
        </S_BalancePopupWindow>
    );
};

export default BalancePopup;
