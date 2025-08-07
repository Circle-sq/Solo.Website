import { type Dispatch, Fragment, memo, type SetStateAction } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import SeparatorLine from 'src/assets/icons/mobileSportIcons/SeparatorLine';
import {
    S_SportTabItem,
    S_SportTabs,
    S_SportTabsWrapper,
    S_SeparatorWrapper,
} from 'src/ui/common/Header/BurgerMenu/styled';
import { getSportTabItems } from 'src/ui/common/Header/BurgerMenu/utils';

interface Props {
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
}

const propsAreEqual = (prevProps: Props, nextProps: Props) => prevProps.activeTab === nextProps.activeTab;

const SportTabs = ({ activeTab, setActiveTab }: Props) => {
    const { router } = useAppStateContext();

    const tabs = getSportTabItems(router.route);

    const handleTabClick = (key: string) => () => {
        setActiveTab(key);
    };

    return (
        <S_SportTabsWrapper>
            <S_SportTabs>
                {tabs.map(({ key, Icon, label }, index) => {
                    const isActive = activeTab === key;
                    const showSeparator = index < tabs.length - 1;

                    return (
                        <Fragment key={key}>
                            <S_SportTabItem isActive={isActive} onClick={handleTabClick(key)}>
                                {Icon}
                                <span>{label}</span>
                                {showSeparator && (
                                    <S_SeparatorWrapper>
                                        <SeparatorLine />
                                    </S_SeparatorWrapper>
                                )}
                            </S_SportTabItem>
                        </Fragment>
                    );
                })}
            </S_SportTabs>
        </S_SportTabsWrapper>
    );
};

export default memo(SportTabs, propsAreEqual);
