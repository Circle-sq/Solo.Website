export const FeaturesFlag = {
    mutltiLanguage: true,
    debugPanel: false,
};

export const mutltiLanguageForUniverse = (): boolean => {
    if (FeaturesFlag.mutltiLanguage) {
        return true;
    }

    return false;
};

export const hasAlternativeBalancesVisible = (): boolean => true;

export const hasFreeBetCreditsEnabled = (): boolean => true;

export const hasCashoutEnabled = (): boolean => true;

export const hasLanguageSwitcherInAccountMenu = (): boolean => true;
