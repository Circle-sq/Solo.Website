import { useBannersDevTool } from './hooks';
import { S_DevToolItem } from './styled';

export function DebugBanners() {
    const { debug_banners, toggle: toggleDebugBanners } = useBannersDevTool();

    return (
        <S_DevToolItem>
            <label>
                <input type='checkbox' checked={debug_banners} onChange={toggleDebugBanners} />
                debug banners
            </label>
        </S_DevToolItem>
    );
}
