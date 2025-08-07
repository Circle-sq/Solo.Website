import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import SwiperSlider from 'src/ui/common/Carousel/SwiperSlider';
import { S_GroupNavMenu } from 'src/ui/common/GroupingNavigation/styled';
import type { MarketTemplateTabs } from 'src/ui/events/DisplayTemplates/types';
import { sortTabKeys } from 'src/ui/events/utils/helpers';

import { S_TabButton, S_TabList, S_TabTitle } from './styled';

interface Props {
    tabs: MarketTemplateTabs;
    changeTab: (tab: string) => void;
    activeTabKey: string;
    displaySingleTab?: boolean;
}

const MarketGroupTabs = ({ tabs, changeTab, activeTabKey, displaySingleTab = false }: Props) => {
    const { translationsStore } = useAppStateContext();

    const tabKeys = useMemo(() => sortTabKeys(tabs), [tabs]);

    const shouldDisplayTabs = displaySingleTab || tabKeys.length > 1;

    if (!shouldDisplayTabs) {
        return null;
    }

    return (
        <S_TabList>
            <S_GroupNavMenu borderBottom={false}>
                <SwiperSlider>
                    {tabKeys.map((tabName) => {
                        return (
                            <S_TabButton
                                key={tabName}
                                isActive={activeTabKey === tabName}
                                onClick={() => changeTab(tabName)}
                                data-testid='tabButton'
                            >
                                <S_TabTitle>{translationsStore.translateMarketTab(tabName)}</S_TabTitle>
                            </S_TabButton>
                        );
                    })}
                </SwiperSlider>
            </S_GroupNavMenu>
        </S_TabList>
    );
};

export default observer(MarketGroupTabs);
