import type { PropsWithChildren } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import type { BettingTab } from 'src/common/enums';
import { bettingTabSelector } from 'src/ui/betting/store/selectors';
import { setBettingTabTask } from 'src/ui/betting/store/tasks';
import { S_Tab, S_TabButton } from 'src/ui/common/Tabs/styled';

const Tab = ({ tab, children }: PropsWithChildren<{ tab: BettingTab }>) => {
    const bettingTab = useRecoilValue(bettingTabSelector);

    const setBettingTab = useRecoilCallback(setBettingTabTask, []);

    const onChangeTab = () => {
        setBettingTab(tab);
    };

    const isActive = tab === bettingTab;

    return (
        <S_Tab active={isActive}>
            <S_TabButton data-testid={`${tab}_tab`} active={isActive} onClick={onChangeTab}>
                {children}
            </S_TabButton>
        </S_Tab>
    );
};

export default Tab;
