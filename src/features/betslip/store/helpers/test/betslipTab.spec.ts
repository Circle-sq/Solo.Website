import size from 'lodash/size';

import { BetslipTab } from 'src/common/enums';
import { ErrorResource } from 'src/common/enums/error';

import type { Combinations } from '../../../api/types/combination';
import type { Leg } from '../../../api/types/leg';
import { defineActiveTab } from '../betslipTab';

describe('defineActiveTab', () => {
    const isPossibleBetsLoading = false;
    const hasCheckedMultiBet = true;
    let currentActiveTab: BetslipTab;
    let combinations: Combinations;

    beforeEach(() => {
        currentActiveTab = BetslipTab.Single;
        combinations = {
            DBL: {
                type: 'DBL',
                name: 'Double',
                ewOffered: false,
                legs: [],
                problems: [],
                isFreebet: false,
                potentialReturns: 0,
                potentialReturnsEw: null,
                price: {
                    f: '5237/1000',
                    d: 6.237,
                    a: '',
                },
            },
        } as Combinations;
    });

    it('should return active tab multi', () => {
        const betslipBets = [
            {
                selectionId: '4',
                eventId: 2,
            },
            {
                selectionId: '124',
                eventId: 19,
            },
        ] as Leg[];

        const activeTab = defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: size(betslipBets),
            combinations,
            currentActiveTab,
            isPossibleBetsLoading,
            hasCheckedMultiBet,
        });

        expect(activeTab).toBe(BetslipTab.Multi);
    });

    it('should switch to multi tab when 2 cross bets added', () => {
        const betslipBets = [
            {
                id: '34-7',
            } as unknown,
        ] as Leg[];

        let activeTab = defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: size(betslipBets),
            combinations,
            currentActiveTab,
            isPossibleBetsLoading,
            hasCheckedMultiBet,
        });

        expect(activeTab).toBe(BetslipTab.Single);

        betslipBets.push({
            selectionId: '22',
            eventId: 2,
        } as Leg);

        activeTab = defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: size(betslipBets),
            combinations,
            currentActiveTab,
            isPossibleBetsLoading,
            hasCheckedMultiBet,
        });

        expect(activeTab).toBe(BetslipTab.Multi);
    });

    it('should not switch to multi tab when event has singles-only market setting', () => {
        const betslipBets = [
            {
                selectionId: '4',
                eventId: 2,
            },
            {
                selectionId: '124',
                eventId: 19,
            },
        ] as Leg[];

        combinations['DBL'].problems = [
            {
                resource: ErrorResource.Market,
                code: 'singles-only',
                field: null,
                debugDetails: null,
                details: null,
                pointer: '/selectedBets/0/legs/0/market',
                ignorePointer: null,
            },
        ];

        const activeTab = defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: size(betslipBets),
            combinations,
            currentActiveTab,
            hasCheckedMultiBet,
            isPossibleBetsLoading,
        });

        expect(activeTab).toBe(BetslipTab.Single);
    });

    it('should not auto switch tab when tab is selected by user', () => {
        const betslipBets = [
            {
                selectionId: '4',
                eventId: 2,
            },
            {
                selectionId: '124',
                eventId: 19,
            },
        ] as Leg[];

        let activeTab = defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: size(betslipBets),
            combinations,
            currentActiveTab,
            isPossibleBetsLoading,
            hasCheckedMultiBet,
        });

        expect(activeTab).toBe(BetslipTab.Multi);

        betslipBets.push({
            selectionId: '22',
            eventId: 2,
        } as Leg);
        const isTabSelectedByUser = true;

        activeTab = defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: size(betslipBets),
            combinations,
            currentActiveTab,
            isPossibleBetsLoading,
            isTabSelectedByUser,
            hasCheckedMultiBet,
        });

        expect(activeTab).toBe(BetslipTab.Single);
    });

    it('should switch from multi to system when a crossbet is added', () => {
        const betslipBets = [
            {
                selectionId: '150',
                eventId: 21,
            },
            {
                selectionId: '170',
                eventId: 24,
            },
            {
                selectionId: '175',
                eventId: 25,
            },
        ] as Leg[];

        currentActiveTab = BetslipTab.System;
        const isTabSelectedByUser = true;

        let activeTab = defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: size(betslipBets),
            combinations,
            currentActiveTab,
            isPossibleBetsLoading,
            isTabSelectedByUser,
            hasCheckedMultiBet: false,
        });

        expect(activeTab).toBe(BetslipTab.System);

        betslipBets.push({
            selectionId: '184',
            eventId: 25,
        } as Leg);
        betslipBets.push({
            id: '175-184',
        } as Leg);

        activeTab = defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: size(betslipBets),
            combinations,
            currentActiveTab,
            isPossibleBetsLoading,
            hasCheckedMultiBet,
        });

        expect(activeTab).toBe(BetslipTab.Multi);
    });

    it('should not auto switch to sigle when system tab is selected and related selection is added', () => {
        const betslipBets = [
            {
                selectionId: '150',
                eventId: 21,
            },
            {
                selectionId: '170',
                eventId: 24,
            },
            {
                selectionId: '116',
                eventId: 16,
            },
        ] as Leg[];

        currentActiveTab = BetslipTab.System;
        const isTabSelectedByUser = true;

        let activeTab = defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: 0,
            combinations,
            currentActiveTab,
            isPossibleBetsLoading,
            isTabSelectedByUser,
            hasCheckedMultiBet,
        });

        expect(activeTab).toBe(BetslipTab.System);

        betslipBets.push({
            selectionId: '119',
            eventId: 16,
        } as Leg);

        activeTab = defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: 0,
            combinations,
            currentActiveTab,
            isPossibleBetsLoading,
            isTabSelectedByUser,
            hasCheckedMultiBet,
        });

        expect(activeTab).toBe(BetslipTab.System);
    });
});
