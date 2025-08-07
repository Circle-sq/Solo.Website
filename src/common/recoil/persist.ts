import { recoilPersist as persist } from 'recoil-persist';

export enum PersistKey {
    App = 'app',
    Betslip = 'betslip',
    AsianView = 'asianView',
    BuildABet = 'buildABet',
    CrossBetPage = 'crossBetPage',
    Events = 'events',
}

export const recoilPersist = (key = PersistKey.App) =>
    persist({
        key: `${key}::recoil-persist`,
    });

export const { persistAtom: persistBetslipAtom } = recoilPersist(PersistKey.Betslip);
