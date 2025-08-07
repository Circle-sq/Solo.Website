import capitalize from 'lodash/capitalize';
import type { MouseEvent } from 'react';
import { useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import { BetslipTab } from 'src/common/enums';

import { betslipActiveTabAtom } from '../../../store/atoms/betslipTab';
import { isDisabledTabSelectorFamily } from '../../../store/selectors/tabStatus';
import { S_TabItem } from '../styled';
import SystemInfoLink from '../SystemInfoLink/SystemInfoLink';
import type { TabItem } from '../types';

interface Props {
    item: TabItem;
    changeTab: (tab: BetslipTab) => void;
}

const BetslipTabItem = ({ item, changeTab }: Props) => {
    const { tab, langKey, defaultText } = item;
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const activeTab = useRecoilValue(betslipActiveTabAtom);
    const isDisabled = useRecoilValue(isDisabledTabSelectorFamily(tab));

    const isActive = activeTab === tab;

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        changeTab(tab);
    };

    return (
        <S_TabItem
            onClick={handleClick}
            isActive={isActive}
            isDisabled={isDisabled}
            href='#'
            data-testid={`${tab}Bets`}
            data-test-isactive={isActive}
        >
            {capitalize(getTranslation(langKey, defaultText).toLowerCase())}
            {tab === BetslipTab.System && <SystemInfoLink isDisabled={isDisabled} />}
        </S_TabItem>
    );
};

export default BetslipTabItem;
