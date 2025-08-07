import { type ReactElement } from 'react';

import { useSyncCrossSelections } from '@sc-betslip/store/hooks/useSyncCrossSelections';
import isEmpty from 'lodash/isEmpty';
import reject from 'lodash/reject';
import { useAppStateContext } from 'src/appState/AppState';
import { RouteName, SportType } from 'src/common/enums';
import { isStandalone } from 'src/infra.client';

import type { SubHeaderItem } from './helpers';
import { getSubHeaderItems } from './helpers';
import { S_Icon, S_NavLink, S_SubHeaderWrapper, S_TextWrapper } from './styled';

const SubHeader = () => {
    const {
        models,
        router: { route },
    } = useAppStateContext();
    const syncCrossEligibleSelections = useSyncCrossSelections();

    let tabs = getSubHeaderItems();

    if (isStandalone()) {
        tabs = reject(tabs, { route: RouteName.CrossBetting });
    }

    const isActiveItem = (item: SubHeaderItem, itemLabel: ReactElement): boolean => {
        let isLive = false;

        if (route.params?.id) {
            const event = models.getEvent(+route.params.id);
            isLive = Boolean(event?.timeMatchInPlay);
        }

        if (item.isActive(route.name, isLive)) {
            return true;
        }

        if (route.params?.id === SportType.HorseRacing) {
            return false;
        }

        if (!isEmpty(item.params)) {
            if (route.params) {
                for (const param of Object.keys(item.params)) {
                    if (item.params[param] !== route.params[param]) {
                        return false;
                    }
                }

                return true;
            } else {
                return false;
            }
        }

        const activeRoute = `${route.name}${route.params?.account ? `/${route.params?.account}` : ''}`;

        return activeRoute === `${item.route}${itemLabel}` || activeRoute === item.route;
    };

    return (
        <S_SubHeaderWrapper>
            {tabs.map((item) => {
                const { label, icon, route } = item;

                const isActive = isActiveItem(item, label);
                const onClick = () => syncCrossEligibleSelections(route);

                return (
                    <S_NavLink key={route} isActive={isActive} route={route} onClick={onClick}>
                        <S_Icon>{icon}</S_Icon>
                        <S_TextWrapper>{label}</S_TextWrapper>
                    </S_NavLink>
                );
            })}
        </S_SubHeaderWrapper>
    );
};

export default SubHeader;
