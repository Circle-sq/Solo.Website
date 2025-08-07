import { SPORT_TYPE } from 'src/utils/constants';

const { football, icehockey, americanfootball, baseball, basketball } = SPORT_TYPE;

// list of sports were Correctscore template is available
export const sportsWithCorrectScoreTemplate: string[] = [football, icehockey];

// list of sports were Goalscorer template is available
export const sportsWithGoalScorerTemplate: string[] = [];

// list of sports with GameLines template is available
export const sportsWithGameLinesTemplate: string[] = [americanfootball, baseball, basketball, icehockey];
