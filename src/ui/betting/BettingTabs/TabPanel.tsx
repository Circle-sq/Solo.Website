import type { PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';

import type { BettingTab } from 'src/common/enums';
import { bettingTabSelector } from 'src/ui/betting/store/selectors';

const TabPanel = ({ tab, children }: PropsWithChildren<{ tab: BettingTab }>) => {
    const bettingTab = useRecoilValue(bettingTabSelector);
    const isActive = tab === bettingTab;

    if (isActive) {
        return <>{children}</>;
    }

    return null;
};

export default TabPanel;
