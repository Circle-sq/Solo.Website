import { useWindowResize, useWindowWidth } from '@sc-hooks';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { useModalRoute } from 'src/appState/customHooks';
import PopupWindow from 'src/ui/common/PopupWindow/PopupWindow';
import isLocal from 'src/utils/isLocal';

import { DebugBanners } from './DebugBanners';
import { DevLang } from './DevLang';
import { ReactQueryDevtoolsDisplayTogler } from './QueryDebugToolDisplayTogler';
import { S_DevTools_Items, S_DevTools_Wrapper } from './styled';
import { ThemeSelectorDevTool } from './ThemeSelectorDevTool';
import { WebSocketDisplayToggler } from './WebSocketDisplayToggler';
import { WebSocketLogsToggler } from './WebSocketLogsToggler';

const S_Divider = () => <hr style={{ width: '100%' }} />;

const DevToolsPopup = () => {
    const { isVisible, onClose } = useModalRoute('devtools');
    const [devToolsAccessible, setDevToolsAccessible] = useState(false);

    const { isDesktop } = useWindowWidth();

    useWindowResize(() => {
        if (isDesktop) {
            onClose();
        }
    });

    useEffect(() => {
        if (isLocal()) {
            setDevToolsAccessible(true);
        }
    }, []);

    if (!devToolsAccessible) {
        return null;
    }

    return isVisible ? (
        <PopupWindow title='Dev Tools' onCloseModal={onClose} transparent={true}>
            <S_DevTools_Wrapper>
                <S_DevTools_Items>
                    <ThemeSelectorDevTool />
                    <S_Divider />
                    <WebSocketDisplayToggler />
                    <S_Divider />
                    <WebSocketLogsToggler />
                    <S_Divider />
                    <DebugBanners />
                    <S_Divider />
                    <ReactQueryDevtoolsDisplayTogler />
                    <S_Divider />
                    <DevLang />
                </S_DevTools_Items>
            </S_DevTools_Wrapper>
        </PopupWindow>
    ) : null;
};

export default observer(DevToolsPopup);
