import { useAtomValue } from 'jotai';
import type { PropsWithChildren } from 'react';

import type { LHNTab } from '../../../enums';
import { lhnTabAtom } from '../../../store/lhn';

const TabPanel = ({ tab, children }: PropsWithChildren<{ tab: LHNTab }>) => {
    const lhnTab = useAtomValue(lhnTabAtom);

    if (tab === lhnTab) {
        return <>{children}</>;
    }

    return null;
};

export default TabPanel;
