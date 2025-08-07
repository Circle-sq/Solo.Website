import includes from 'lodash/includes';

import { MarketTemplate } from 'src/common/enums/market';

export const isOverUnderTemplate = (templateId: string) => includes(templateId, MarketTemplate.OverUnder);

export const isHandicapTemplate = (templateId: string) => includes(templateId, MarketTemplate.Handicap);

export const isOverUnderMarket = <T extends { marketTypeGeneric: string }>(market: T) =>
    isOverUnderTemplate(market.marketTypeGeneric);

export const isHandicapMarket = <T extends { marketTypeGeneric: string }>(market: T) =>
    isHandicapTemplate(market.marketTypeGeneric);
