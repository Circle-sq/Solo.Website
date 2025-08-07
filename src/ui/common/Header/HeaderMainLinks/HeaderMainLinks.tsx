import { useAsianViewFlag } from '@sc-feature-flags';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { useSyncCrossSelections } from '@sc-betslip/store/hooks/useSyncCrossSelections';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName, SportType } from 'src/common/enums';

import { getTopHeaderItems, asianViewHeader } from './helpers';
import { S_HeaderMainLinkWrapper, HeaderStyledLink, S_LabelBadge } from './styled';
import type { HeaderItem } from './types';

const HeaderMainLinks = () => {
    const {
        models,
        language: { getTranslation },
        router: { route },
    } = useAppStateContext();

    const syncCrossEligibleSelections = useSyncCrossSelections();

    const asianViewFlag = useAsianViewFlag();

    const topHeaderItems = useMemo(() => {
        const items = getTopHeaderItems();

        if (asianViewFlag) {
            items.push(asianViewHeader);
        }

        return items;
    }, [asianViewFlag]);

    const isActiveItem = (item: HeaderItem, itemLabel: string): boolean => {
        let isLive = false;

        if (route.params.id && route.name !== RouteName.Competition) {
            const event = models.getEvent(+route.params.id);
            isLive = Boolean(event?.timeMatchInPlay);
        }

        if (item.isActive(route.name, isLive)) {
            return true;
        }

        if (route.params.id === SportType.HorseRacing) {
            return false;
        }

        if (!isEmpty(item.params)) {
            for (const param of Object.keys(item.params)) {
                if (item.params[param] !== route.params[param]) {
                    return false;
                }
            }

            return true;
        }

        const activeRoute = `${route.name}${route.params.account ? `/${route.params.account}` : ''}`;

        return activeRoute === `${item.route}${itemLabel}` || activeRoute === item.route;
    };

    return (
        <S_HeaderMainLinkWrapper data-testid='header-main-link-wrapper'>
            {topHeaderItems.map((item) => {
                const { defaultText, langKey, route: itemRoute, params, testId } = item;

                const label = getTranslation(langKey, defaultText);
                const isActive = isActiveItem(item, label);
                const className = classNames('x-HeaderStyledLink', 'header__link', {
                    'header__link--active': isActive,
                });

                const onClick = () => syncCrossEligibleSelections(itemRoute);

                return (
                    <HeaderStyledLink
                        key={itemRoute}
                        active={isActive}
                        className={className}
                        route={itemRoute}
                        params={params}
                        testId={testId}
                        onClick={onClick}
                    >
                        {item.route === RouteName.AsianView && (
                            <S_LabelBadge>{getTranslation('common.labels.new', 'NEW')}</S_LabelBadge>
                        )}
                        <p className='label'>{label}</p>
                    </HeaderStyledLink>
                );
            })}
        </S_HeaderMainLinkWrapper>
    );
};

export default observer(HeaderMainLinks);
