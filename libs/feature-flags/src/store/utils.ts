import type { UnleashClient } from '@unleash/proxy-client-react';

enum FeatureFlag {
    AsianInPlayHandicapLine = 'SC-11808',
    AsianView = 'SC-9661',
    BetLinkGolf = 'SC-8007',
    ChineseLangSupport = 'SC-11884-CN',
    JapaneseLangSupport = 'SC-11884-JP',
    Search = 'SC-10491',
    SpeedBet = 'SC-12689',
    InPlayLHN = 'SC-13265',
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
