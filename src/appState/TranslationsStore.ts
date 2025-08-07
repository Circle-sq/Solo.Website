import { MARKET_TABS_PERIODS } from 'src/utils/constants';

import { LanguagesState } from './LanguagesState';
import { buildTranslateStatisticsPeriodNameHelper } from './translation-helper';

export default class TranslationsStore {
    readonly language: LanguagesState;
    translatePeriodName: (period: string) => string;

    constructor(language: LanguagesState) {
        this.language = language;

        this.translatePeriodName = buildTranslateStatisticsPeriodNameHelper(this.language);
    }

    static createForContext(): TranslationsStore {
        return new TranslationsStore(LanguagesState.createForContext());
    }

    public translateMarketTab = (tabName: string): string => {
        switch (tabName) {
            case MARKET_TABS_PERIODS.regularPlay:
                return this.language.getTranslation('event.market.tabs.regularPlay', 'Regular play');

            case MARKET_TABS_PERIODS.firstHalf:
                return this.language.getTranslation('event.market.tabs.firstHalf', '1st Half');

            case MARKET_TABS_PERIODS.secondHalf:
                return this.language.getTranslation('event.market.tabs.secondHalf', '2nd Half');

            case MARKET_TABS_PERIODS.includingOvertime:
                return this.language.getTranslation('event.market.tabs.includingOvertime', 'Including overtime');

            case MARKET_TABS_PERIODS.includingOvertimeAndPenalty:
                return this.language.getTranslation(
                    'event.market.tabs.includingOvertimeAndPenalty',
                    'Including overtime and penalty',
                );

            case MARKET_TABS_PERIODS.includingExtraInnings:
                return this.language.getTranslation(
                    'event.market.tabs.includingExtraInnings',
                    'Including extra innings',
                );

            case MARKET_TABS_PERIODS.inningsOneToFive:
                return this.language.getTranslation('event.market.tabs.inningsOneToFive', 'Innings 1 to 5');

            case MARKET_TABS_PERIODS.inningsSevenToNine:
                return this.language.getTranslation('event.market.tabs.inningsSevenToNine', 'Innings 7 to 9');

            case MARKET_TABS_PERIODS.overtime:
                return this.language.getTranslation('event.market.tabs.overtime', 'Overtime');

            case MARKET_TABS_PERIODS.overtimeFirstHalf:
                return this.language.getTranslation('event.market.tabs.overtimeFirstHalf', 'Overtime 1st half');

            case MARKET_TABS_PERIODS.secondHalfIncludingOvertime:
                return this.language.getTranslation(
                    'event.market.tabs.secondHalfIncludingOvertime',
                    '2nd half including overtime',
                );

            case MARKET_TABS_PERIODS.penaltyShootout:
                return this.language.getTranslation('event.market.tabs.penaltyShootout', 'Penalty shootout');

            case MARKET_TABS_PERIODS.firstSetTiebreak:
                return this.language.getTranslation('event.market.tabs.firstSetTiebreak', '1st set tiebreak');

            case MARKET_TABS_PERIODS.secondSetTiebreak:
                return this.language.getTranslation('event.market.tabs.secondSetTiebreak', '2nd set tiebreak');

            case MARKET_TABS_PERIODS.thirdSetTiebreak:
                return this.language.getTranslation('event.market.tabs.thirdSetTiebreak', '3rd set tiebreak');

            case MARKET_TABS_PERIODS.forthSetTiebreak:
                return this.language.getTranslation('event.market.tabs.forthSetTiebreak', '4th set tiebreak');

            case MARKET_TABS_PERIODS.fifthSetTiebreak:
                return this.language.getTranslation('event.market.tabs.fifthSetTiebreak', '5th set tiebreak');

            case MARKET_TABS_PERIODS.firstQuarter:
                return this.language.getTranslation('event.market.tabs.firstQuarter', '1st Quarter');

            case MARKET_TABS_PERIODS.secondQuarter:
                return this.language.getTranslation('event.market.tabs.secondQuarter', '2nd Quarter');

            case MARKET_TABS_PERIODS.thirdQuarter:
                return this.language.getTranslation('event.market.tabs.thirdQuarter', '3rd Quarter');

            case MARKET_TABS_PERIODS.fourthQuarter:
                return this.language.getTranslation('event.market.tabs.fourthQuarter', '4th Quarter');

            case MARKET_TABS_PERIODS.firstQuarterIncludingOvertime:
                return this.language.getTranslation(
                    'event.market.tabs.firstQuarterIncludingOvertime',
                    '1st Quarter including overtime',
                );

            case MARKET_TABS_PERIODS.secondQuarterIncludingOvertime:
                return this.language.getTranslation(
                    'event.market.tabs.secondQuarterIncludingOvertime',
                    '2nd Quarter including overtime',
                );

            case MARKET_TABS_PERIODS.thirdQuarterIncludingOvertime:
                return this.language.getTranslation(
                    'event.market.tabs.thirdQuarterIncludingOvertime',
                    '3rd Quarter including overtime',
                );

            case MARKET_TABS_PERIODS.fourthQuarterIncludingOvertime:
                return this.language.getTranslation(
                    'event.market.tabs.fourthQuarterIncludingOvertime',
                    '4th Quarter including overtime',
                );

            case MARKET_TABS_PERIODS.firstPeriod:
                return this.language.getTranslation('event.market.tabs.firstPeriod', '1st Period');

            case MARKET_TABS_PERIODS.secondPeriod:
                return this.language.getTranslation('event.market.tabs.secondPeriod', '2nd Period');

            case MARKET_TABS_PERIODS.thirdPeriod:
                return this.language.getTranslation('event.market.tabs.thirdPeriod', '3rd Period');

            case MARKET_TABS_PERIODS.firstInning:
                return this.language.getTranslation('event.market.tabs.firstInning', '1st Inning');

            case MARKET_TABS_PERIODS.secondInning:
                return this.language.getTranslation('event.market.tabs.secondInning', '2nd Inning');

            case MARKET_TABS_PERIODS.thirdInning:
                return this.language.getTranslation('event.market.tabs.thirdInning', '3rd Inning');

            case MARKET_TABS_PERIODS.fourthInning:
                return this.language.getTranslation('event.market.tabs.fourthInning', '4th Inning');

            case MARKET_TABS_PERIODS.fifthInning:
                return this.language.getTranslation('event.market.tabs.fifthInning', '5th Inning');

            case MARKET_TABS_PERIODS.sixthInning:
                return this.language.getTranslation('event.market.tabs.sixthInning', '6th Inning');

            case MARKET_TABS_PERIODS.seventhInning:
                return this.language.getTranslation('event.market.tabs.seventhInning', '7th Inning');

            case MARKET_TABS_PERIODS.eighthInning:
                return this.language.getTranslation('event.market.tabs.eighthInning', '8th Inning');

            case MARKET_TABS_PERIODS.ninthInning:
                return this.language.getTranslation('event.market.tabs.ninthInning', '9th Inning');

            case MARKET_TABS_PERIODS.firstFrame:
                return this.language.getTranslation('event.market.tabs.firstFrame', '1st Frame');

            case MARKET_TABS_PERIODS.secondFrame:
                return this.language.getTranslation('event.market.tabs.secondFrame', '2nd Frame');

            case MARKET_TABS_PERIODS.thirdFrame:
                return this.language.getTranslation('event.market.tabs.thirdFrame', '3rd Frame');

            case MARKET_TABS_PERIODS.fourthFrame:
                return this.language.getTranslation('event.market.tabs.fourthFrame', '4th Frame');

            case MARKET_TABS_PERIODS.fifthFrame:
                return this.language.getTranslation('event.market.tabs.fifthFrame', '5th Frame');

            case MARKET_TABS_PERIODS.sixthFrame:
                return this.language.getTranslation('event.market.tabs.sixthFrame', '6th Frame');

            case MARKET_TABS_PERIODS.seventhFrame:
                return this.language.getTranslation('event.market.tabs.seventhFrame', '7th Frame');

            case MARKET_TABS_PERIODS.eighthFrame:
                return this.language.getTranslation('event.market.tabs.eighthFrame', '8th Frame');

            case MARKET_TABS_PERIODS.ninthFrame:
                return this.language.getTranslation('event.market.tabs.ninthFrame', '9th Frame');

            case MARKET_TABS_PERIODS.tenthFrame:
                return this.language.getTranslation('event.market.tabs.tenthFrame', '10th Frame');

            case MARKET_TABS_PERIODS.eleventhFrame:
                return this.language.getTranslation('event.market.tabs.eleventhFrame', '11th Frame');

            case MARKET_TABS_PERIODS.twelfthFrame:
                return this.language.getTranslation('event.market.tabs.twelfthFrame', '12th Frame');

            case MARKET_TABS_PERIODS.thirteenthFrame:
                return this.language.getTranslation('event.market.tabs.thirteenthFrame', '13th Frame');

            case MARKET_TABS_PERIODS.fourteenthFrame:
                return this.language.getTranslation('event.market.tabs.fourteenthFrame', '14th Frame');

            case MARKET_TABS_PERIODS.fifteenthFrame:
                return this.language.getTranslation('event.market.tabs.fifteenthFrame', '15th Frame');

            case MARKET_TABS_PERIODS.sixteenthFrame:
                return this.language.getTranslation('event.market.tabs.sixteenthFrame', '16th Frame');

            case MARKET_TABS_PERIODS.seventeenthFrame:
                return this.language.getTranslation('event.market.tabs.seventeenthFrame', '17th Frame');

            case MARKET_TABS_PERIODS.eighteenthFrame:
                return this.language.getTranslation('event.market.tabs.eighteenthFrame', '18th Frame');

            case MARKET_TABS_PERIODS.nineteenthFrame:
                return this.language.getTranslation('event.market.tabs.nineteenthFrame', '19th Frame');

            case MARKET_TABS_PERIODS.twentiethFrame:
                return this.language.getTranslation('event.market.tabs.twentiethFrame', '20th Frame');

            case MARKET_TABS_PERIODS.twentyfirstFrame:
                return this.language.getTranslation('event.market.tabs.twentyfirstFrame', '21st Frame');

            case MARKET_TABS_PERIODS.twentysecondFrame:
                return this.language.getTranslation('event.market.tabs.twentysecondFrame', '22nd Frame');

            case MARKET_TABS_PERIODS.twentythirdFrame:
                return this.language.getTranslation('event.market.tabs.twentythirdFrame', '23rd Frame');

            case MARKET_TABS_PERIODS.twentyfourthFrame:
                return this.language.getTranslation('event.market.tabs.twentyfourthFrame', '24th Frame');

            case MARKET_TABS_PERIODS.twentyfifthFrame:
                return this.language.getTranslation('event.market.tabs.twentyfifthFrame', '25th Frame');

            case MARKET_TABS_PERIODS.twentysixsthFrame:
                return this.language.getTranslation('event.market.tabs.twentysixsthFrame', '26th Frame');

            case MARKET_TABS_PERIODS.twentyseventhFrame:
                return this.language.getTranslation('event.market.tabs.twentyseventhFrame', '27th Frame');

            case MARKET_TABS_PERIODS.twentyeighthFrame:
                return this.language.getTranslation('event.market.tabs.twentyeighthFrame', '28th Frame');

            case MARKET_TABS_PERIODS.twentyninthFrame:
                return this.language.getTranslation('event.market.tabs.twentyninthFrame', '29th Frame');

            case MARKET_TABS_PERIODS.thirtiethFrame:
                return this.language.getTranslation('event.market.tabs.thirtiethFrame', '30th Frame');

            case MARKET_TABS_PERIODS.thirtyfirstFrame:
                return this.language.getTranslation('event.market.tabs.thirtyfirstFrame', '31st Frame');

            case MARKET_TABS_PERIODS.thirtysecondFrame:
                return this.language.getTranslation('event.market.tabs.thirtysecondFrame', '32nd Frame');

            case MARKET_TABS_PERIODS.thirtythirdFrame:
                return this.language.getTranslation('event.market.tabs.thirtythirdFrame', '33rd Frame');

            case MARKET_TABS_PERIODS.thirtyfourthFrame:
                return this.language.getTranslation('event.market.tabs.thirtyfourthFrame', '34th Frame');

            case MARKET_TABS_PERIODS.thirtyfifthFrame:
                return this.language.getTranslation('event.market.tabs.thirtyfifthFrame', '35th Frame');

            case MARKET_TABS_PERIODS.firstInnings:
                return this.language.getTranslation('event.market.tabs.firstInnings', '1st Innings');

            case MARKET_TABS_PERIODS.secondInnings:
                return this.language.getTranslation('event.market.tabs.secondInnings', '2nd Innings');

            case MARKET_TABS_PERIODS.thirdInnings:
                return this.language.getTranslation('event.market.tabs.thirdInnings', '3rd Innings');

            case MARKET_TABS_PERIODS.fourthInnings:
                return this.language.getTranslation('event.market.tabs.fourthInnings', '4th Innings');

            case MARKET_TABS_PERIODS.fifthInnings:
                return this.language.getTranslation('event.market.tabs.fifthInnings', '5th Innings');

            case MARKET_TABS_PERIODS.sixthInnings:
                return this.language.getTranslation('event.market.tabs.sixthInnings', '6th Innings');

            case MARKET_TABS_PERIODS.seventhInnings:
                return this.language.getTranslation('event.market.tabs.seventhInnings', '7th Innings');

            case MARKET_TABS_PERIODS.eighthInnings:
                return this.language.getTranslation('event.market.tabs.eighthInnings', '8th Innings');

            case MARKET_TABS_PERIODS.ninthInnings:
                return this.language.getTranslation('event.market.tabs.ninthInnings', '9th Innings');

            case MARKET_TABS_PERIODS.firstSet:
                return this.language.getTranslation('event.market.tabs.firstSet', '1st Set');

            case MARKET_TABS_PERIODS.secondSet:
                return this.language.getTranslation('event.market.tabs.secondSet', '2nd Set');

            case MARKET_TABS_PERIODS.thirdSet:
                return this.language.getTranslation('event.market.tabs.thirdSet', '3rd Set');

            case MARKET_TABS_PERIODS.fourthSet:
                return this.language.getTranslation('event.market.tabs.fourthSet', '4th Set');

            case MARKET_TABS_PERIODS.fifthSet:
                return this.language.getTranslation('event.market.tabs.fifthSet', '5th Set');

            case MARKET_TABS_PERIODS.sixthSet:
                return this.language.getTranslation('event.market.tabs.sixthSet', '6th Set');

            case MARKET_TABS_PERIODS.seventhSet:
                return this.language.getTranslation('event.market.tabs.seventhSet', '7th Set');

            case MARKET_TABS_PERIODS.eighthSet:
                return this.language.getTranslation('event.market.tabs.eighthSet', '8th Set');

            case MARKET_TABS_PERIODS.ninthSet:
                return this.language.getTranslation('event.market.tabs.ninthSet', '9th Set');

            case MARKET_TABS_PERIODS.tenthSet:
                return this.language.getTranslation('event.market.tabs.tenthSet', '10th Set');

            case MARKET_TABS_PERIODS.eleventhSet:
                return this.language.getTranslation('event.market.tabs.eleventhSet', '11th Set');

            case MARKET_TABS_PERIODS.twelfthSet:
                return this.language.getTranslation('event.market.tabs.twelfthSet', '12th Set');

            case MARKET_TABS_PERIODS.thirteenthSet:
                return this.language.getTranslation('event.market.tabs.thirteenthSet', '13th Set');

            case MARKET_TABS_PERIODS.oneMinute:
                return this.language.getTranslation('event.market.tabs.oneMinute', '1 minute');

            case MARKET_TABS_PERIODS.fiveMinutes:
                return this.language.getTranslation('event.market.tabs.fiveMinutes', '5 minutes');

            case MARKET_TABS_PERIODS.tenMinutes:
                return this.language.getTranslation('event.market.tabs.tenMinutes', '10 minutes');

            case MARKET_TABS_PERIODS.fifteenMinutes:
                return this.language.getTranslation('event.market.tabs.fifteenMinutes', '15 minutes');

            default:
                return tabName;
        }
    };

    public translateStatisticsPeriodName = (statisticsPeriod: string): string => {
        return this.translatePeriodName(statisticsPeriod);
    };
}
