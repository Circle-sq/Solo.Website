import type { LanguageStore } from './LanguageStore';
import type { GetTranslationFunc } from 'src/utils/types';

import { MATCH_PERIOD } from 'src/utils/constants';

export const buildTranslateStatisticsPeriodNameHelper = (language: LanguageStore): ((period: string) => string) => {
    return (statisticsPeriod: string): string => {
        switch (statisticsPeriod) {
            case MATCH_PERIOD.endOfThirdQuarter:
                return language.getTranslation('events.row.time.endOfThirdQuarter', 'End of 3rd quarter');

            case MATCH_PERIOD.penalties:
                return language.getTranslation('events.row.time.penalties', 'Penalties');

            case MATCH_PERIOD.startingSoon:
                return language.getTranslation('events.row.time.startingSoon', 'Starting soon');

            case MATCH_PERIOD.firstHalf:
                return language.getTranslation('events.row.time.firstHalf', '1st half');

            case MATCH_PERIOD.halftime:
                return language.getTranslation('events.row.time.halftime', 'Halftime');

            case MATCH_PERIOD.secondHalf:
                return language.getTranslation('events.row.time.secondHalf', '2nd half');

            case MATCH_PERIOD.finished:
                return language.getTranslation('events.row.time.finished', 'Finished');

            case MATCH_PERIOD.extraTimeToStart:
                return language.getTranslation('events.row.time.extraTimeToStart', 'Extra time to start');

            case MATCH_PERIOD.firstHalfExtraTime:
                return language.getTranslation('events.row.time.firstHalfExtraTime', '1st half Extra time');

            case MATCH_PERIOD.extraTimeHalftime:
                return language.getTranslation('events.row.time.extraTimeHalftime', 'Extra time halftime');

            case MATCH_PERIOD.secondHalfExtraTime:
                return language.getTranslation('events.row.time.secondHalfExtraTime', '2nd half Extra time');

            case MATCH_PERIOD.penaltyShootoutStartingSoon:
                return language.getTranslation(
                    'events.row.time.penaltyShootoutStartingSoon',
                    'Penalty shootout starting soon',
                );

            case MATCH_PERIOD.penaltyShootOut:
                return language.getTranslation('events.row.time.penaltyShootOut', 'Penalty shoot out');

            case MATCH_PERIOD.interrupted:
                return language.getTranslation('events.row.time.interrupted', 'Interrupted');

            case MATCH_PERIOD.abandoned:
                return language.getTranslation('events.row.time.abandoned', 'Abandoned');

            case MATCH_PERIOD.suspended:
                return language.getTranslation('events.row.time.suspended', 'Suspended');

            case MATCH_PERIOD.firstPeriod:
                return language.getTranslation('events.row.time.firstPeriod', '1st period');

            case MATCH_PERIOD.secondPeriod:
                return language.getTranslation('events.row.time.secondPeriod', '2nd period');

            case MATCH_PERIOD.firstQuarter:
                return language.getTranslation('events.row.time.firstQuarter', '1st quarter');

            case MATCH_PERIOD.secondQuarter:
                return language.getTranslation('events.row.time.secondQuarter', '2nd quarter');

            case MATCH_PERIOD.thirdQuarter:
                return language.getTranslation('events.row.time.thirdQuarter', '3rd quarter');

            case MATCH_PERIOD.fourthQuarter:
                return language.getTranslation('events.row.time.fourthQuarter', '4th quarter');

            case MATCH_PERIOD.overtimeStartingSoon:
                return language.getTranslation('events.row.time.overtimeStartingSoon', 'Overtime starting soon');

            case MATCH_PERIOD.ended:
                return language.getTranslation('events.row.time.ended', 'Ended');

            case MATCH_PERIOD.overtime:
                return language.getTranslation('events.row.time.overtime', 'Overtime');

            case MATCH_PERIOD.sixthBreak:
                return language.getTranslation('events.row.time.sixthBreak', '6th break');

            case MATCH_PERIOD.fifthBreak:
                return language.getTranslation('events.row.time.fifthBreak', '5th break');

            case MATCH_PERIOD.fourthBreak:
                return language.getTranslation('events.row.time.fourthBreak', '4th break');

            case MATCH_PERIOD.thirdBreak:
                return language.getTranslation('events.row.time.thirdBreak', '3rd break');

            case MATCH_PERIOD.secondBreak:
                return language.getTranslation('events.row.time.secondBreak', '2nd break');

            case MATCH_PERIOD.firstBreak:
                return language.getTranslation('events.row.time.firstBreak', '1st break');

            case MATCH_PERIOD.firstInningTop:
                return language.getTranslation('events.row.time.topOfFirst', 'Top of 1st');

            case MATCH_PERIOD.secondInningTop:
                return language.getTranslation('events.row.time.topOfSecond', 'Top of 2nd');

            case MATCH_PERIOD.thirdInningTop:
                return language.getTranslation('events.row.time.topOfThird', 'Top of 3rd');

            case MATCH_PERIOD.fourthInningTop:
                return language.getTranslation('events.row.time.topOfFourth', 'Top of 4th');

            case MATCH_PERIOD.fifthInningTop:
                return language.getTranslation('events.row.time.topOfFifth', 'Top of 5th');

            case MATCH_PERIOD.sixthInningTop:
                return language.getTranslation('events.row.time.topOfSixth', 'Top of 6th');

            case MATCH_PERIOD.seventhInningTop:
                return language.getTranslation('events.row.time.topOfSeventh', 'Top of 7th');

            case MATCH_PERIOD.eighthInningTop:
                return language.getTranslation('events.row.time.topOfEighth', 'Top of 8th');

            case MATCH_PERIOD.ninthInningTop:
                return language.getTranslation('events.row.time.topOfNinth', 'Top of 9th');

            case MATCH_PERIOD.firstInningBottom:
                return language.getTranslation('events.row.time.bottomOfFirst', 'Bottom of 1st');

            case MATCH_PERIOD.secondInningBottom:
                return language.getTranslation('events.row.time.bottomOfSecond', 'Bottom of 2nd');

            case MATCH_PERIOD.thirdInningBottom:
                return language.getTranslation('events.row.time.bottomOfThird', 'Bottom of 3rd');

            case MATCH_PERIOD.fourthInningBottom:
                return language.getTranslation('events.row.time.bottomOfFourth', 'Bottom of 4th');

            case MATCH_PERIOD.fifthInningBottom:
                return language.getTranslation('events.row.time.bottomOfFifth', 'Bottom of 5th');

            case MATCH_PERIOD.sixthInningBottom:
                return language.getTranslation('events.row.time.bottomOfSixth', 'Bottom of 6th');

            case MATCH_PERIOD.seventhInningBottom:
                return language.getTranslation('events.row.time.bottomOfSeventh', 'Bottom of 7th');

            case MATCH_PERIOD.eighthInningBottom:
                return language.getTranslation('events.row.time.bottomOfEighth', 'Bottom of 8th');

            case MATCH_PERIOD.ninthInningBottom:
                return language.getTranslation('events.row.time.bottomOfNinth', 'Bottom of 9th');

            case MATCH_PERIOD.extraInningBottom:
                return language.getTranslation('events.row.time.extraInningBottom', 'Extra inning bottom');

            case MATCH_PERIOD.extraInningTop:
                return language.getTranslation('events.row.time.extraInningTop', 'Extra inning top');

            case MATCH_PERIOD.breakTopFirstBottomFirst:
                return language.getTranslation('events.row.time.breakTopFirst', 'Break top 1');

            case MATCH_PERIOD.breakTopSecondBottomSecond:
                return language.getTranslation('events.row.time.breakTopSecond', 'Break top 2');

            case MATCH_PERIOD.breakTopThirdBottomThird:
                return language.getTranslation('events.row.time.breakTopThird', 'Break top 3');

            case MATCH_PERIOD.breakTopFourthBottomFourth:
                return language.getTranslation('events.row.time.breakTopFourth', 'Break top 4');

            case MATCH_PERIOD.breakTopFifthBottomFifth:
                return language.getTranslation('events.row.time.breakTopFifth', 'Break top 5');

            case MATCH_PERIOD.breakTopSixthBottomSixth:
                return language.getTranslation('events.row.time.breakTopSixth', 'Break top 6');

            case MATCH_PERIOD.breakTopSeventhBottomSeventh:
                return language.getTranslation('events.row.time.breakTopSeventh', 'Break top 7');

            case MATCH_PERIOD.breakTopEighthBottomEighth:
                return language.getTranslation('events.row.time.breakTopEighth', 'Break top 8');

            case MATCH_PERIOD.breakTopNinthBottomNinth:
                return language.getTranslation('events.row.time.breakTopNinth', 'Break top 9');

            case MATCH_PERIOD.breakTopSecondBottomFirst:
                return language.getTranslation('events.row.time.breakBottomFirst', 'Break bottom 1');

            case MATCH_PERIOD.breakTopThirdBottomSecond:
                return language.getTranslation('events.row.time.breakBottomSecond', 'Break bottom 2');

            case MATCH_PERIOD.breakTopFourthBottomThird:
                return language.getTranslation('events.row.time.breakBottomThird', 'Break bottom 3');

            case MATCH_PERIOD.breakTopFifthBottomFourth:
                return language.getTranslation('events.row.time.breakBottomFourth', 'Break bottom 4');

            case MATCH_PERIOD.breakTopSixthBottomFifth:
                return language.getTranslation('events.row.time.breakBottomFifth', 'Break bottom 5');

            case MATCH_PERIOD.breakTopSeventhBottomSixth:
                return language.getTranslation('events.row.time.breakBottomSixth', 'Break bottom 6');

            case MATCH_PERIOD.breakTopEighthBottomSeventh:
                return language.getTranslation('events.row.time.breakBottomSeventh', 'Break bottom 7');

            case MATCH_PERIOD.breakTopNinthBottomEighth:
                return language.getTranslation('events.row.time.breakBottomEighth', 'Break bottom 8');

            case MATCH_PERIOD.breakTopEIBottomNinth:
                return language.getTranslation('events.row.time.breakBottomNinth', 'Break bottom 9');

            case MATCH_PERIOD.breakTopEIBottomEI:
                return language.getTranslation('events.row.time.breakTopEI', 'Break top EI');

            case MATCH_PERIOD.breakTopEIBottomSeventh:
                return language.getTranslation('events.row.time.breakBottomSeventh', 'Break bottom 7');

            case MATCH_PERIOD.firstSet:
                return language.getTranslation('events.row.time.firstSet', '1st set');

            case MATCH_PERIOD.secondSet:
                return language.getTranslation('events.row.time.secondSet', '2nd set');

            case MATCH_PERIOD.thirdSet:
                return language.getTranslation('events.row.time.thirdSet', '3rd set');

            case MATCH_PERIOD.fourthSet:
                return language.getTranslation('events.row.time.fourthSet', '4th set');

            case MATCH_PERIOD.fifthSet:
                return language.getTranslation('events.row.time.fifthSet', '5th set');

            case MATCH_PERIOD.firstGame:
                return language.getTranslation('events.row.time.firstGame', '1st game');

            case MATCH_PERIOD.secondGame:
                return language.getTranslation('events.row.time.secondGame', '2nd game');

            case MATCH_PERIOD.thirdGame:
                return language.getTranslation('events.row.time.thirdGame', '3rd game');

            case MATCH_PERIOD.fourthGame:
                return language.getTranslation('events.row.time.fourthGame', '4th game');

            case MATCH_PERIOD.fifthGame:
                return language.getTranslation('events.row.time.fifthGame', '5th game');

            case MATCH_PERIOD.retired:
                return language.getTranslation('events.row.time.retired', 'Retired');

            case MATCH_PERIOD.startDelayed:
                return language.getTranslation('events.row.time.startDelayed', 'Start delayed');

            case MATCH_PERIOD.walkoverPlayerFirstWon:
                return language.getTranslation('events.row.time.walkoverPlayerFirstWon', 'Walkover, player 1 won');

            case MATCH_PERIOD.walkoverPlayerSecondWon:
                return language.getTranslation('events.row.time.walkoverPlayerSecondWon', 'Walkover, player 2 won');

            case MATCH_PERIOD.playerFirstRetiredPlayerSecondWon:
                return language.getTranslation(
                    'events.row.time.playerFirstRetiredPlayerSecondWon',
                    'Player 1 retired, player 2 won',
                );

            case MATCH_PERIOD.playerSecondRetiredPlayerFirstWon:
                return language.getTranslation(
                    'events.row.time.playerSecondRetiredPlayerFirstWon',
                    'Player 2 retired, player 1 won',
                );

            case MATCH_PERIOD.goldenSet:
                return language.getTranslation('events.row.time.goldenSet', 'Golden set');

            case MATCH_PERIOD.awaitingGoldenSet:
                return language.getTranslation('events.row.time.awaitingGoldenSet', 'Awaiting golden set');

            case MATCH_PERIOD.awaitingExtraTime:
                return language.getTranslation('events.row.time.awaitingExtraTime', 'Awaiting extra time');

            case MATCH_PERIOD.afterGoldenSet:
                return language.getTranslation('events.row.time.afterGoldenSet', 'After golden set');

            case MATCH_PERIOD.sixthSet:
                return language.getTranslation('events.row.time.sixthSet', '6th set');

            case MATCH_PERIOD.seventhSet:
                return language.getTranslation('events.row.time.seventhSet', '7th set');

            case MATCH_PERIOD.playerSecondDefaultedPlayerFirstWon:
                return language.getTranslation(
                    'events.row.time.playerSecondDefaultedPlayerFirstWon',
                    'Player 2 defaulted, player 1 won',
                );

            case MATCH_PERIOD.playerFirstDefaultedPlayerSecondWon:
                return language.getTranslation(
                    'events.row.time.playerFirstDefaultedPlayerSecondWon',
                    'Player 1 defaulted, player 2 won',
                );

            case MATCH_PERIOD.break:
                return language.getTranslation('events.row.time.break', 'Break');

            case MATCH_PERIOD.inProgress:
                return language.getTranslation('events.row.time.inProgress', 'In progress');

            case MATCH_PERIOD.thirdPeriod:
                return language.getTranslation('events.row.time.thirdPeriod', '3rd period');

            default:
                return language.getTranslation(`events.row.time.${statisticsPeriod}`, statisticsPeriod);
        }
    };
};

export const getCurrencyTranslations = (getTranslation: GetTranslationFunc): Record<string, string> => {
    return Object.freeze({
        KRW: getTranslation('currency.symbol.krw', 'KRW'),
        USD: getTranslation('currency.symbol.usd', 'USD'),
        JPY: getTranslation('currency.symbol.jpy', 'JPY'),
        USDC: getTranslation('currency.symbol.USDC', 'USDC'),
        USDT: getTranslation('currency.symbol.USDT', 'USDT'),
        XRP: getTranslation('currency.symbol.XRP', 'XRP'),
        mETH: getTranslation('currency.symbol.mETH', 'mETH'),
        mLTC: getTranslation('currency.symbol.mLTC', 'mLTC'),
        uBTC: getTranslation('currency.symbol.uBTC', 'uBTC'),
        mBCH: getTranslation('currency.symbol.mBCH', 'mBCH'),
        // more currency will be added - so far these have been confirmed
    });
};
