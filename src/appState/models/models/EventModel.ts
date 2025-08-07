import { getUnixTime } from 'date-fns';
import * as t from 'io-ts';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import reduce from 'lodash/reduce';
import reject from 'lodash/reject';

import { compareArrays, LazyComputed, lazyComputedField } from 'src/appState/models/LazyComputed';
import { MobxValueLite } from 'src/appState/models/MobixValueLite';
import { compareRecordParticipant } from 'src/appState/models/models/helpers';
import type { MarketModel } from 'src/appState/models/models/MarketModel';
import type { ModelBoxContext, RawModelType } from 'src/appState/models/ModelWrapper';
import { ModelWrapper } from 'src/appState/models/ModelWrapper';
import type { SportType } from 'src/common/enums';
import { getMappedPeriod } from 'src/common/helpers/event';
import type { Participant, Pitchers, Tags, TimeSettings, TranslationData } from 'src/common/types/event';
import type { Media, MediaItem } from 'src/common/types/media';
import type { Score, Statistics } from 'src/common/types/statistics';
import { getMarketTemplates } from 'src/ui/crossbetting/EventCardMobile/helpers';
import { TEAM_IDENTIFIER } from 'src/utils/constants';

const TimeSettingsIO = t.type({
    startTime: t.string,
    started: t.boolean,
    tradedInPlay: t.boolean,
    timeZone: t.string,
});

const ValueIO = t.type({
    value: t.union([t.string, t.number, t.boolean]),
});

const ParticipantTypeIO = t.type({
    id: t.number,
    name: t.union([t.string, t.undefined]),
    role: t.union([t.string, t.undefined, t.null]),
    tags: t.union([t.type({ uniformUrl: t.array(t.string) }), t.undefined]),
});

const ScoreValueIO = t.type({
    home: t.union([t.number, t.string]),
    away: t.union([t.number, t.string]),
});

const ScoreIO = t.union([
    t.type({
        formatted: t.string,
        value: t.array(ScoreValueIO),
        set: t.union([t.string, t.undefined]),
    }),
    t.null,
]);

type ScoreType = t.TypeOf<typeof ScoreIO>;

const PlatformIO = t.type({
    id: t.string,
    metaId: t.union([ValueIO, t.undefined]),
});

const StatisticsTimerIO = t.type({
    value: t.string,
    timer: t.union([t.string, t.undefined]),
    timerBase: t.union([t.string, t.undefined]),
});

const StatisticValueIO = t.type({
    value: t.string,
});

const StatisticsIO = t.partial({
    score: t.union([ScoreValueIO, t.undefined]),
    'yellow-cards': t.union([ScoreValueIO, t.undefined]),
    'red-cards': t.union([ScoreValueIO, t.undefined]),
    woodworks: t.union([ScoreValueIO, t.undefined]),
    substitution: t.union([ScoreValueIO, t.undefined]),
    homeruns: t.union([ScoreValueIO, t.undefined]),
    time: t.union([StatisticValueIO, t.undefined]),
    'match-status': t.union([StatisticValueIO, t.undefined]),
    inninghalf: t.union([StatisticValueIO, t.undefined]),
    inningshalf: t.union([StatisticValueIO, t.undefined]),
    balls: t.union([StatisticValueIO, t.undefined]),
    outs: t.union([StatisticValueIO, t.undefined]),
    strikes: t.union([StatisticValueIO, t.undefined]),
    set: t.union([StatisticValueIO, t.undefined]),
    'base-one': t.union([StatisticValueIO, t.undefined]),
    'base-two': t.union([StatisticValueIO, t.undefined]),
    'base-three': t.union([StatisticValueIO, t.undefined]),
    turn: t.union([StatisticValueIO, t.undefined]),
    period: t.union([StatisticValueIO, t.undefined]),
    'match-mode': t.union([StatisticValueIO, t.undefined]),
    timer: t.union([StatisticsTimerIO, t.undefined]),
    'set-score': t.union([ScoreValueIO, t.undefined]),
    'game-score': t.union([ScoreValueIO, t.undefined]),
    'point-score': t.union([ScoreValueIO, t.undefined]),
    frame: t.union([StatisticValueIO, t.undefined]),
    'leg-score': t.union([ScoreValueIO, t.undefined]),
    'game-state-type': t.union([StatisticValueIO, t.undefined]),
    'current-game-state': t.union([StatisticValueIO, t.undefined]),
    'final-game-state': t.union([StatisticValueIO, t.undefined]),
    'yellow-flag': t.union([StatisticValueIO, t.undefined]),
    'red-flag': t.union([StatisticValueIO, t.undefined]),
    'safety-car': t.union([StatisticValueIO, t.undefined]),
    'overall-laps': t.union([StatisticValueIO, t.undefined]),
    lap: t.union([StatisticValueIO, t.undefined]),
});

const MediaProviderIO = t.type({
    id: t.union([t.string, t.undefined, t.null]),
    provider: t.string,
});

const MediaIO = t.type({
    statistics: t.array(MediaProviderIO),
    liveTrackers: t.array(MediaProviderIO),
    streams: t.array(MediaProviderIO),
});

const MarketIndexTypeIO = t.type({
    active: t.boolean,
    display: t.boolean,
    id: t.number,
    marketState: t.string,
    marketType: t.string,
    name: t.string,
    outright: t.boolean,
    templateId: t.string,
});

const MarketIndexes = t.array(MarketIndexTypeIO);

type MarketIndexType = t.TypeOf<typeof MarketIndexes>;

type StatisticsType = t.TypeOf<typeof StatisticsIO>;

type PlatformType = t.TypeOf<typeof PlatformIO>;

const MISSING_REVISION = -3;

export class EventModel {
    private readonly modelBoxContext: ModelBoxContext;

    private data: MobxValueLite<RawModelType>;
    private fieldId: LazyComputed<number>;
    private fieldDisplayOrder: LazyComputed<number>;
    private fieldTimeSettings: LazyComputed<TimeSettings>;
    private fieldTags: LazyComputed<Tags>;
    private fieldMarketIndex: LazyComputed<MarketIndexType>;
    private fieldStreams: LazyComputed<string[]>;
    private fieldActive: LazyComputed<boolean>;
    private fieldMarketIds: LazyComputed<number[]>;
    private fieldDisplay: LazyComputed<boolean>;
    private fieldState: LazyComputed<string>;
    private fieldName: LazyComputed<string>;
    private fieldRevision: LazyComputed<number>;
    private fieldOriginalName: LazyComputed<string>;
    private fieldParticipant: LazyComputed<Record<number, Participant>>;
    private fieldScore: LazyComputed<ScoreType>;
    private fieldCompetitionId: LazyComputed<number>;
    private fieldSport: LazyComputed<string>;
    private fieldStatistics: LazyComputed<StatisticsType>;
    private fieldTemplate: LazyComputed<string>;
    private fieldFeedData: LazyComputed<undefined | Record<string, string | null>>;
    private fieldPlatform: LazyComputed<PlatformType | undefined>;
    private fieldMedia: LazyComputed<Media>;

    private computedMarkets: LazyComputed<MarketModel[]>;
    private computedPlatformId: LazyComputed<string | null>;
    private computedMetaId: LazyComputed<string | null>;
    private computedTimeSettingsStartTimeUnixSeconds: LazyComputed<number>;

    private computedTimeMatchInPlay: LazyComputed<boolean>;

    constructor(modelBoxContext: ModelBoxContext, data: RawModelType) {
        this.modelBoxContext = modelBoxContext;

        this.data = new MobxValueLite(data);

        this.fieldId = lazyComputedField('EventModel.id', t.number, 0, () => this.data.get().id);

        this.fieldDisplayOrder = lazyComputedField(
            'EventModel.displayOrder',
            t.number,
            0,
            () => this.data.get().displayOrder ?? 0,
        );

        this.fieldStreams = lazyComputedField(
            'EventModel.streams',
            t.array(t.string),
            [],
            () => this.data.get().streams,
        );

        this.fieldTimeSettings = lazyComputedField(
            'EventModel.timeSettings',
            TimeSettingsIO,
            {
                startTime: '',
                started: false,
                tradedInPlay: false,
                timeZone: '',
            },
            () => this.data.get().timeSettings,
            (a: TimeSettings, b: TimeSettings): boolean => {
                return (
                    a.startTime === b.startTime &&
                    a.started === b.started &&
                    a.tradedInPlay === b.tradedInPlay &&
                    a.timeZone === b.timeZone
                );
            },
        );

        this.fieldTags = lazyComputedField(
            'EventModel.tags',
            t.record(t.string, t.union([t.array(t.string), t.string])),
            {},
            () => this.data.get().tags,
        );

        this.fieldActive = lazyComputedField(
            'EventModel.active',
            t.boolean,
            false,
            (): unknown => this.data.get().active,
        );

        this.fieldMarketIndex = lazyComputedField(
            'MarketModel.marketIndex',
            MarketIndexes,
            [],
            () => this.data.get().marketIndex,
        );

        this.fieldDisplay = lazyComputedField('EventModel.display', t.boolean, false, () => this.data.get().display);

        this.fieldStatistics = lazyComputedField(
            'EventModel.statistics',
            StatisticsIO,
            {},
            () => this.data.get().statistics,
        );

        this.fieldState = lazyComputedField('EventModel.state', t.string, '', () => this.data.get().state);

        this.fieldMarketIds = lazyComputedField(
            'EventModel.MarketIds',
            t.array(t.number),
            [],
            () => {
                const list: Record<string, unknown> = this.data.get().markets;
                const keys = Object.keys(list);
                const out: number[] = [];

                for (const keyItem of keys) {
                    const id = parseInt(keyItem, 10);

                    if (isNaN(id)) {
                        console.error('Expected number', keyItem);
                    } else {
                        out.push(id);
                    }
                }

                return out;
            },
            compareArrays,
        );

        this.fieldName = lazyComputedField('EventModel.name', t.string, '', (): unknown => this.data.get().name);
        this.fieldRevision = lazyComputedField(
            'EventModel.revision',
            t.number,
            MISSING_REVISION,
            (): unknown => this.data.get().revision,
        );

        this.fieldOriginalName = lazyComputedField(
            'EventModel.originalName',
            t.string,
            '',
            (): unknown => this.data.get().originalName,
        );

        this.fieldParticipant = lazyComputedField<Record<number, Participant>>(
            'EventModel.participant',
            t.record(t.string, ParticipantTypeIO),
            {},
            () => this.data.get().participants,
            (a: Record<number, Participant>, b: Record<number, Participant>): boolean => {
                return compareRecordParticipant(a, b);
            },
        );

        this.fieldFeedData = lazyComputedField<undefined | Record<string, string | null>>(
            'EventModel.feedData',
            t.union([t.record(t.string, t.union([t.string, t.null])), t.undefined]),
            {},
            () => this.data.get().feedData,
        );

        this.fieldScore = lazyComputedField('EventModel.score', ScoreIO, null, () => this.data.get().score);

        this.fieldCompetitionId = lazyComputedField(
            'EventModel.competition',
            t.number,
            0,
            () => this.data.get().competition,
        );

        this.fieldSport = lazyComputedField('EventModel.sport', t.string, '', () => this.data.get().sport);

        this.fieldTemplate = lazyComputedField('EventModel.template', t.string, '', () => this.data.get().template);

        this.fieldPlatform = lazyComputedField(
            'EventModel.platform',
            t.union([PlatformIO, t.undefined]),
            undefined,
            () => this.data.get().platform,
        );

        this.fieldMedia = lazyComputedField<Media>(
            'EventModel.media',
            MediaIO,
            { statistics: [], liveTrackers: [], streams: [] },
            () => this.data.get().media,
        );

        this.computedMarkets = new LazyComputed<MarketModel[]>((): MarketModel[] => {
            const out: MarketModel[] = [];
            const ids = this.fieldMarketIds.get();

            for (const id of ids) {
                const item = this.modelBoxContext.getMarket(id);

                if (item) {
                    out.push(item);
                }
            }

            return out;
        }, compareArrays);

        this.computedPlatformId = LazyComputed.create(() => {
            const value = this.fieldPlatform.get();

            if (value !== undefined) {
                return value.id;
            }

            return null;
        });

        this.computedMetaId = LazyComputed.create(() => {
            const value = this.data.get().platformObject?.metaId?.value;

            if (value !== undefined) {
                return value;
            }

            return null;
        });

        this.computedTimeSettingsStartTimeUnixSeconds = LazyComputed.create(() => {
            return getUnixTime(new Date(this.timeSettingsStartTime));
        });

        this.computedTimeMatchInPlay = LazyComputed.create(() => {
            return this.modelBoxContext.serverTime.inPlay.match(this.timeSettingsStartTimeUnixSeconds);
        });
    }

    static create(modelBoxContext: ModelBoxContext, data: RawModelType): ModelWrapper<EventModel> {
        const model = new EventModel(modelBoxContext, data);

        return new ModelWrapper(model, (data: RawModelType) => {
            model.data.set(data);
        });
    }

    getRawData(): RawModelType {
        return this.data.get();
    }

    get id(): number {
        return this.fieldId.get();
    }

    get displayOrder(): number {
        return this.fieldDisplayOrder.get();
    }

    get marketIndex(): MarketIndexType {
        return this.fieldMarketIndex.get();
    }

    get templateIds(): Array<string> {
        const marketIndex = this.marketIndex;

        return getMarketTemplates(marketIndex);
    }

    get streams(): string[] {
        return this.fieldStreams.get();
    }

    get platformObject(): RawModelType {
        const platform = this.data.get().platformObject;

        if (platform !== null) {
            return { ...platform };
        }

        return {};
    }

    get name(): string {
        return this.fieldName.get();
    }

    get revision() {
        return this.fieldRevision.get();
    }

    get originalName(): string {
        return this.fieldOriginalName.get();
    }

    get stats(): Statistics {
        return this.fieldStatistics.get() as Statistics;
    }

    get competitionId(): number {
        return this.fieldCompetitionId.get();
    }

    get sport(): SportType {
        return this.fieldSport.get() as SportType;
    }

    get template(): string {
        return this.fieldTemplate.get();
    }

    get hasAmericanFormat(): boolean {
        const americanFormat = 'american-format';
        const tags: string[] = this.getTag(americanFormat);

        return tags.length > 0 && tags[0] === 'yes';
    }

    getTag(name: string): string[] {
        const tags = this.fieldTags.get();
        const value = tags[name];

        if (Array.isArray(value)) {
            return value;
        }

        if (typeof value === 'string') {
            return [value];
        }

        return [];
    }

    get markets(): MarketModel[] {
        return this.computedMarkets.get();
    }

    get marketGroups(): string[] {
        const data = this.computedMarkets.get();

        if (data !== null) {
            const arr: string[] = [];

            // TODO: refactor this in phase 2 for speedbet
            for (const template of data) {
                if (
                    template.displayed &&
                    (!this.timeSettingsStarted || template.tradedInPlay) &&
                    !template.templateId.includes('kerosports')
                ) {
                    arr.push(...template.marketGroups);
                }
            }

            return arr.filter((item, index, array) => array.indexOf(item) === index);
        }

        return [];
    }

    get participants(): Record<number, Participant> {
        return this.fieldParticipant.get();
    }

    get tagsRegion(): string | undefined {
        return this.getTag('region')[0];
    }

    get tagsCountry(): string | undefined {
        return this.getTag('country')[0];
    }

    get tagsCategory(): string | undefined {
        return this.getTag('category')[0];
    }

    get tagsTennisTour(): string | undefined {
        return this.getTag('tennis-tour')[0];
    }

    get tagsOutright(): string | undefined {
        return this.getTag('outright')[0];
    }

    get isOutright(): boolean {
        return this.tagsOutright !== undefined && this.tagsOutright === 'yes';
    }

    get isSpeedBet(): boolean {
        return this.getTag('speed-bet')[0] === 'yes';
    }

    get feedId(): string | undefined | null {
        const feedData = this.fieldFeedData.get();

        if (feedData) {
            return feedData.feedId;
        }
    }

    get timeSettings(): TimeSettings {
        return this.fieldTimeSettings.get();
    }

    get timeSettingsStartTime(): string {
        return this.fieldTimeSettings.get().startTime;
    }

    get timeSettingsStarted(): boolean {
        return this.fieldTimeSettings.get().started;
    }

    get timeSettingsTradedInPlay(): boolean {
        return this.fieldTimeSettings.get().tradedInPlay;
    }

    get scoreSet(): string | void {
        const score = this.fieldScore.get();

        if (score !== null) {
            return score.set;
        }

        return undefined;
    }

    get isEventScore(): boolean {
        const activeEvent = this.data.get();
        const { stats } = this.data.get();

        const scoreSet = activeEvent.scoreSet;
        const scoreValue = activeEvent.score;
        const setScore = get(stats, 'set-score');
        const pointScore = get(stats, 'point-score');
        const pointsScore = get(stats, 'points-score');
        const gameScore = get(stats, 'game-score');
        const framesScore = get(stats, 'frames-score');

        return isEmpty(scoreSet || scoreValue || setScore || pointScore || pointsScore || gameScore || framesScore);
    }

    get active(): boolean {
        return this.fieldActive.get();
    }

    get display(): boolean {
        return this.fieldDisplay.get();
    }

    get state(): string {
        return this.fieldState.get();
    }

    get homeParticipant(): string | null {
        for (const participant of Object.values(this.fieldParticipant.get())) {
            if (participant.role === TEAM_IDENTIFIER.home) {
                return !isEmpty(participant.name) ? `${participant.name}` : null;
            }
        }

        return null;
    }

    get awayParticipant(): string | null {
        for (const participant of Object.values(this.fieldParticipant.get())) {
            if (participant.role === TEAM_IDENTIFIER.away) {
                return !isEmpty(participant.name) ? `${participant.name}` : null;
            }
        }

        return null;
    }

    get homeParticipantUniform(): string {
        for (const participant of Object.values(this.fieldParticipant.get())) {
            if (participant.role === TEAM_IDENTIFIER.home) {
                const uniformUrl = get(participant, 'tags.uniformUrl.0', '');

                return isEmpty(uniformUrl) ? '' : uniformUrl;
            }
        }

        return '';
    }

    get awayParticipantUniform(): string {
        for (const participant of Object.values(this.fieldParticipant.get())) {
            if (participant.role === TEAM_IDENTIFIER.away) {
                const uniformUrl = get(participant, 'tags.uniformUrl.0', '');

                return isEmpty(uniformUrl) ? '' : uniformUrl;
            }
        }

        return '';
    }

    get platformId(): string | null {
        return this.computedPlatformId.get();
    }

    get metaId(): string | null {
        return this.computedMetaId.get();
    }

    get timeSettingsStartTimeUnixSeconds(): number {
        return this.computedTimeSettingsStartTimeUnixSeconds.get();
    }

    get timeMatchInPlay(): boolean {
        return this.computedTimeMatchInPlay.get();
    }

    get mappedPeriod(): string {
        const stats = this.fieldStatistics.get();
        const period = stats?.period?.value ?? '';

        return getMappedPeriod(period, this.sport);
    }

    get matchMode(): string | undefined {
        const stats = this.fieldStatistics.get();

        return get(stats, 'match-mode.value');
    }

    get timer(): string {
        const { timer } = this.fieldStatistics.get();
        const { value = '' } = { ...timer };

        return value;
    }

    get score(): Score | undefined {
        const { score } = this.fieldStatistics.get();

        return score;
    }

    get media(): Media {
        return this.fieldMedia.get();
    }

    get mediaStreams(): MediaItem[] {
        const { streams } = this.fieldMedia.get();

        return streams;
    }

    get pitchers(): { home: string; away: string } | undefined {
        const pitchers = this.stats['pitchers'];

        if (isUndefined(pitchers) || this.timeSettingsStarted || isEmpty(pitchers)) {
            return;
        }

        return reduce(
            reject(pitchers, { name: '' }),
            (acc, item) => {
                acc[item.role] = item.name;

                return acc;
            },
            {} as { [key in Pitchers['role']]: string },
        );
    }

    get translations(): Partial<TranslationData> {
        return this.data.get().translationData;
    }
}
