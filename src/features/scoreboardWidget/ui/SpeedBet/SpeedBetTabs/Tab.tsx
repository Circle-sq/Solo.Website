import type { PropsWithChildren } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import type { SpeedBetTab } from '../../../enums';
import { speedBetActiveTabAtom } from '../../../store/atoms';
import { setSpeedBetTabTask } from '../../../store/tasks';

import { S_Tab } from './styled';

const Tab = ({ tab, children }: PropsWithChildren<{ tab: SpeedBetTab }>) => {
    const speedBetTab = useRecoilValue(speedBetActiveTabAtom);

    const setSpeedBetTab = useRecoilCallback(setSpeedBetTabTask, []);

    const onChangeTab = () => setSpeedBetTab(tab);

    const isActiveTab = tab === speedBetTab;

    return (
        <S_Tab active={isActiveTab} onClick={onChangeTab}>
            {children}
        </S_Tab>
    );
};

export default Tab;
