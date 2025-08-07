import { observable, action, computed, makeObservable } from 'mobx';
import orderBy from 'lodash/orderBy';

import type { SportModel } from 'src/appState/redux/types';
import type { LinkItem } from 'src/ui/common/NavigationPanel/types';

import { ReduxState } from '../redux/ReduxState';

import type { SportLinkType, SportModelType } from './types';
import { getSportsLinks } from './utils';

export class SportsList {
    sportsAZ: LinkItem[] = [];
    isMobileMenuOpen = false;

    private reduxState: ReduxState;

    constructor(reduxState: ReduxState) {
        makeObservable(this, {
            sportsAZ: observable.ref,
            isMobileMenuOpen: observable,
            updateSportsAZ: action,
            sports: computed,
            sportsLinks: computed,
            hideMobileSportsAZ: action,
        });

        this.reduxState = reduxState;
    }

    static createForContext(): SportsList {
        return new SportsList(ReduxState.createForContext());
    }

    updateSportsAZ(sports: LinkItem[]) {
        this.sportsAZ = sports;
    }

    get sports(): SportModelType[] {
        const sports: SportModelType[] = [];

        this.reduxState.sportsItems.forEach((sport: SportModel | undefined) => {
            if (sport) {
                sports.push({
                    id: sport.id,
                    label: sport.name as string,
                    displayOrder: sport.displayOrder as number,
                    tags: sport.tags,
                    testId: `sport-${sport.id}`,
                });
            }
        });

        return orderBy(sports, 'displayOrder', 'desc');
    }

    get sportsLinks(): SportLinkType[] {
        return getSportsLinks(this.sports);
    }

    hideMobileSportsAZ() {
        this.isMobileMenuOpen = false;
    }
}
