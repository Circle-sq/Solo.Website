import type { PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';

import type { SpeedBetTab } from '../../../enums';
import { speedBetActiveTabAtom } from '../../../store/atoms';

const TabPanel = ({ tab, children }: PropsWithChildren<{ tab: SpeedBetTab }>) => {
    const speedBetTab = useRecoilValue(speedBetActiveTabAtom);

    const isActiveTab = tab === speedBetTab;

    if (isActiveTab) {
        return <>{children}</>;
    }

    return null;
};

export default TabPanel;
