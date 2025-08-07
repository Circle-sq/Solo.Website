import { startOfDay } from 'date-fns';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import isNumber from 'lodash/isNumber';
import join from 'lodash/join';
import map from 'lodash/map';
import some from 'lodash/some';

import { isMultiBetLegType } from '@sc-betslip/typeGuards/leg';

import type { EventModel } from 'src/appState/models/models/EventModel';
import type { ModelsState } from 'src/appState/models/ModelsState';
import { BetStatus, MyBetsTab, OddsFormat } from 'src/common/enums';
import { hasNonLivePeriod } from 'src/common/helpers/event';
import type { CashOutLegEvent, EventTags, MyBet, MyBetLeg, MyMultiBetLeg, Result } from 'src/common/types/myBet';
import type { Price } from 'src/common/types/selectionPrice';
import { isValidOutrightDate } from 'src/ui/events/Outrights/utils';

import { TabStatus } from '../store/types';

import type { BetSelectionStatusParams } from './types';

const hasLiveBet = (bets: MyBet[]) =>
    some(bets, ({ legs, status }) => some(legs, ({ event }) => isLiveLeg(event, status)));

const hasOpenBet = (bets: MyBet[]) =>
    some(bets, ({ status }) => includes([BetStatus.Open, BetStatus.Unsettled, BetStatus.Failed], status));

export const defineMyBetsTab = (bets: MyBet[]): MyBetsTab => {
    if (hasLiveBet(bets)) {
        return MyBetsTab.Live;
    }

    if (hasOpenBet(bets)) {
        return MyBetsTab.CashOut;
    }

    return MyBetsTab.Settled;
};

export const isLiveLeg = (
    { timeSettings, statistics }: Pick<CashOutLegEvent, 'timeSettings' | 'statistics'>,
    status: BetStatus,
) => {
    const isSettledOrCancelled = status === BetStatus.Settled || status === BetStatus.Cancelled;
    const isStarted = get(timeSettings, 'started', false);
    const period = get(statistics, 'period.value', '');

    return !hasNonLivePeriod(period) && isStarted && !isSettledOrCancelled;
};

export const getLiveBets = (models: ModelsState, settledBetId: string | null, bets: MyBet[] = []): MyBet[] => {
    if (!isArray(bets) || isEmpty(bets)) {
        return [];
    }

    return bets.filter((bet) => {
        const isRecentlySettledBet = bet.id === settledBetId;
        const hasLiveLeg = some(bet.legs, ({ event }) => {
            const eventModel = models.getEvent(Number(event.id));

            if (eventModel !== null) {
                const { timeSettings, stats: statistics } = eventModel;

                return isLiveLeg({ timeSettings, statistics }, bet.status);
            }

            return isLiveLeg(event, bet.status);
        });

        return isRecentlySettledBet || hasLiveLeg;
    });
};

export const filterBetsByStatus = (tabStatus: TabStatus, bets?: MyBet[]): MyBet[] => {
    if (bets === undefined) {
        return [];
    }

    switch (tabStatus) {
        case TabStatus.Lost:
            return bets.filter(({ payout }) => !isNil(payout) && payout === 0);

        case TabStatus.Cancelled:
            return bets.filter(({ payout, totalStake }) => !isNil(payout) && payout === totalStake);

        case TabStatus.Settled:
            return bets.filter(({ payout }) => !isNil(payout) && payout > 0);

        default:
            return bets;
    }
};

export const getSettledBets = (tabStatus: TabStatus, bets: MyBet[] = []): MyBet[] => {
    if (!isArray(bets) || isEmpty(bets)) {
        return [];
    }

    let day: number | undefined;
    const result: MyBet[] = [];

    const betsByStatus = filterBetsByStatus(tabStatus, bets);

    betsByStatus.forEach((bet) => {
        const settlementDate = startOfDay(new Date(bet.settledAt)).getTime();

        result.push({
            ...bet,
            displayDate: day !== settlementDate,
        });

        day = settlementDate;
    });

    return result;
};

export const getPrice = (price: Price, oddsFormat: keyof Price): string | number => {
    if (!price) {
        return price;
    }

    const result = price[oddsFormat];
    const decimals = 2;

    if (oddsFormat === OddsFormat.Decimal) {
        return parseFloat(String(result)).toFixed(decimals);
    }

    return result;
};

export const getBetSelectionStatus = ({
    betStatus,
    resultType,
    payout,
    totalStake,
    isCashedOut,
    isSingleBet,
}: BetSelectionStatusParams): BetStatus => {
    if (betStatus === BetStatus.Cancelled) {
        return BetStatus.Cancelled;
    }

    if (betStatus === BetStatus.Settled) {
        if (isSingleBet && resultType !== undefined) {
            return resultType;
        }

        if (totalStake === payout) {
            if (isCashedOut) {
                return BetStatus.Cancelled;
            }

            return BetStatus.Void;
        }

        if (isCashedOut) {
            return BetStatus.CashOut;
        }

        if (payout === 0) {
            return BetStatus.Lost;
        }

        if (isNumber(payout) && totalStake !== payout) {
            return BetStatus.Won;
        }
    }

    return betStatus;
};

export const getMultipleBetLabel = (legs: MyBetLeg[] = []) => {
    return join(
        map(legs, (leg) => {
            if (isMultiBetLegType<MyMultiBetLeg>(leg)) {
                return join(map(leg.marketsAndSelections, 'selection.name'), ' | ');
            }

            return leg.selection.name;
        }),
        ' | ',
    );
};

export const getBetLegStatus = (betStatus: BetStatus | undefined, legResult?: Result | null) => {
    if (betStatus === BetStatus.Cancelled || legResult?.type == null) {
        return betStatus;
    }

    return legResult.type;
};

export const isLiveMyBet = ({ timeSettings }: CashOutLegEvent, event: EventModel | null) => {
    return timeSettings?.started || event?.timeSettingsStarted === true;
};

export const showLegEventTime = ({ tags, startTime }: { tags: EventTags | null; startTime?: string }) => {
    const isOutrightEvent = !isNull(tags) ? get(tags, 'outright.0', 'no') === 'yes' : false;

    return (startTime !== undefined && !isOutrightEvent) || (isOutrightEvent && isValidOutrightDate(startTime));
};

export const getEventIds = (bets: MyBet[] = []): number[] => {
    return bets.reduce<number[]>((acc, bet) => {
        bet.legs.forEach((leg) => {
            const eventId = Number(leg.event.id);

            if (eventId && !acc.includes(eventId)) {
                acc.push(eventId);
            }
        });

        return acc;
    }, []);
};
