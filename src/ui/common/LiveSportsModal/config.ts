import get from 'lodash/get';
import type { Map } from 'immutable';

import { NUMBERS, SPORT_TYPE } from 'src/utils/constants';
import type { SportModel } from 'src/appState/redux/types';

const koreanGroups: Record<string, string[]> = {
    ㄱ: [SPORT_TYPE.golf, SPORT_TYPE.combatsports],
    ㄴ: [SPORT_TYPE.basketball],
    ㄷ: [SPORT_TYPE.darts, SPORT_TYPE.dota2],
    ㄹ: [SPORT_TYPE.rugbyleague, SPORT_TYPE.rugbyunion, SPORT_TYPE.lol],
    ㅁ: [SPORT_TYPE.motorbikes, SPORT_TYPE.americanfootball],
    ㅂ: [SPORT_TYPE.volleyball, SPORT_TYPE.badminton, SPORT_TYPE.boxing, SPORT_TYPE.beachvolleyball],
    ㅅ: [SPORT_TYPE.snooker, SPORT_TYPE.specials, SPORT_TYPE.starcraft],
    ㅇ: [SPORT_TYPE.icehockey, SPORT_TYPE.baseball, SPORT_TYPE.olympicgames],
    ㅊ: [SPORT_TYPE.football],
    ㅋ: [SPORT_TYPE.cricket, SPORT_TYPE.csgo],
    ㅌ: [SPORT_TYPE.tabletennis, SPORT_TYPE.tennis],
    ㅍ: [SPORT_TYPE.formulaone, SPORT_TYPE.futsal],
    ㅎ: [SPORT_TYPE.handball],
};

// TODO: Find other means to group korean sports by first character
const getKoreanSportGrouping = (sports: Map<string, SportModel>): Record<string, SportModel[]> => {
    const groups = Object.entries(koreanGroups).reduce((acc, entry) => {
        const [groupId, sportIds] = entry;

        const groupSports: SportModel[] = [];

        sportIds.forEach((sportId) => {
            const sport = sports.get(sportId);

            if (sport !== undefined) {
                groupSports.push(sport);
            }
        });

        if (groupSports.length > NUMBERS.zero) {
            return {
                ...acc,
                [groupId]: groupSports,
            };
        }

        return acc;
    }, {});

    return groups;
};

export const groupSportsByAlphabet = (
    sportList: Map<string, SportModel>,
    userLang: null | string,
): Record<string, SportModel[]> => {
    if (userLang !== null && userLang.match(/kr|ko/gi) !== null) {
        return getKoreanSportGrouping(sportList);
    }

    const sportObjects = Object.values<SportModel>(sportList.toJS());
    const letterPosition = 0;

    return sportObjects
        .sort((prev, next): number => {
            const prevName = prev.name;
            const nextName = next.name;

            return prevName === undefined || nextName === undefined ? 0 : prevName.localeCompare(nextName);
        })
        .reduce((acc: Record<string, SportModel[]>, sportObj) => {
            if (sportObj.name === undefined || sportObj.id === undefined) {
                return {
                    ...acc,
                };
            }

            const firstLetter = sportObj.name.charAt(letterPosition).toLowerCase();
            const sportId = sportObj.id.toString();
            const sport = sportList.get(sportId);

            return {
                ...acc,
                [firstLetter]: get(acc, `${firstLetter}`, [] as SportModel[]).concat([sport]),
            };
        }, {});
};
