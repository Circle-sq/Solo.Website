import type { UnleashClient } from '@unleash/proxy-client-react';

enum FeatureFlag {
    AsianInPlayHandicapLine = 'SOLO-11808',
    AsianView = 'SOLO-9661',
    BetLinkGolf = 'SOLO-8007',
    ChineseLangSupport = 'SOLO-11884-CN',
    JapaneseLangSupport = 'SOLO-11884-JP',
    Search = 'SOLO-10491',
    SpeedBet = 'SOLO-12689',
    InPlayLHN = 'SOLO-13265',
}

export const getFeatureFlags = (client: UnleashClient) => ({
    asianInPlayHandicapLineFlag: client.isEnabled(FeatureFlag.AsianInPlayHandicapLine),
    asianViewFlag: client.isEnabled(FeatureFlag.AsianView),
    betLinkGolfFlag: client.isEnabled(FeatureFlag.BetLinkGolf),
    chineseLangSupportFlag: client.isEnabled(FeatureFlag.ChineseLangSupport),
    japaneseLangSupportFlag: client.isEnabled(FeatureFlag.JapaneseLangSupport),
    searchFlag: client.isEnabled(FeatureFlag.Search),
    speedBetFlag: client.isEnabled(FeatureFlag.SpeedBet),
    inPlayLHNFlag: client.isEnabled(FeatureFlag.InPlayLHN),
});

export type FeatureFlags = ReturnType<typeof getFeatureFlags>;
