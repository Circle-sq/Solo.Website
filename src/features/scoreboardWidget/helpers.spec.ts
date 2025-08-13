import { enGB, ko } from 'date-fns/locale';

import { participants } from './__mocks__/participants';
import { langs } from './constants';
import { getBetRadarStatisticUrl, getSportBG, getTeamByType } from './helpers';

describe('getSportBG', () => {
    it('should render bg image for football', () => {
        expect(getSportBG('football', { FOOTBALL: './assets/football.webp' })).toBe(`url(./assets/football.webp)`);
    });

    it('should render bg image for tennis', () => {
        expect(getSportBG('tennis', { TENNIS: './assets/tennis.webp' })).toBe(`url(./assets/tennis.webp)`);
    });

    it('should render bg image for ice hockey', () => {
        expect(getSportBG('icehockey', { ICEHOCKEY: './assets/ice_hockey.webp' })).toBe(
            `url(./assets/ice_hockey.webp)`,
        );
    });

    it('should render radial-gradient if there is no bg image for specific sport', () => {
        expect(getSportBG('randomSport', {}).startsWith('radial-gradient')).toBe(true);
    });
});

describe('getTeamByType', () => {
    it('should return the home team when "home" is passed as the type', () => {
        const result = getTeamByType(participants, 'home');
        expect(result).toEqual(participants[959580]);
    });

    it('should return the away team when "away" is passed as the type', () => {
        const result = getTeamByType(participants, 'away');
        expect(result).toEqual(participants[959581]);
    });

    it('should return undefined if the type does not match any team role', () => {
        const result = getTeamByType(participants, 'invalid-role');
        expect(result).toBeUndefined();
    });
});

describe('getBetRadarStatisticUrl', () => {
    it('should return the correct URL when userLang is en', () => {
        const requestId = '48334873';
        const userLang = 'en-US';
        const expectedUrl = `https://s5.sir.sportradar.com/solo/en/match/48334873`;

        const result = getBetRadarStatisticUrl(requestId, userLang);

        expect(result).toBe(expectedUrl);
    });

    it('should return the correct URL when userLang is ko', () => {
        const requestId = '48334873';
        const userLang = 'ko-KR';
        const expectedUrl = `https://s5.sir.sportradar.com/solo/ko/match/48334873`;

        const result = getBetRadarStatisticUrl(requestId, userLang);

        expect(result).toBe(expectedUrl);
    });

    it('should handle different userLang values correctly', () => {
        const requestId = '48334873';

        const enResult = getBetRadarStatisticUrl(requestId, 'en-US');
        const enExpectedUrl = `https://s5.sir.sportradar.com/solo/en/match/48334873`;
        expect(enResult).toBe(enExpectedUrl);

        const koResult = getBetRadarStatisticUrl(requestId, 'ko-KR');
        const koExpectedUrl = `https://s5.sir.sportradar.com/solo/ko/match/48334873`;
        expect(koResult).toBe(koExpectedUrl);

        const jaResult = getBetRadarStatisticUrl(requestId, 'ja-JP');
        const jaExpectedUrl = `https://s5.sir.sportradar.com/solo/ja/match/48334873`;
        expect(jaResult).toBe(jaExpectedUrl);
    });

    it('should match the langs values with date-fns/locale', () => {
        expect(langs.en).toBe(enGB);
        expect(langs.ko).toBe(ko);
    });
});
