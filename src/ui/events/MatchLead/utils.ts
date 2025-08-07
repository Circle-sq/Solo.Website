import { enGB, ko } from 'date-fns/locale';

import { getShortLocale } from 'src/utils/common';

const langs = { ko: ko, en: enGB };

export const langToLocale = (lang: string | null) => {
    if (lang === null) {
        return ko;
    }

    return langs[lang as keyof typeof langs];
};

export const getBetRadarStatisticUrl = (requestId: string | number, userLang: string | null): string => {
    const lang = getShortLocale(userLang);

    return `https://s5.sir.sportradar.com/beteast/${lang}/match/${requestId}`;
};
