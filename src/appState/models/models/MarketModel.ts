import * as t from 'io-ts';
import sortBy from 'lodash/sortBy';

import { isOverUnderMarket } from 'src/common/helpers/market';
import { SELECTIONS_IDENTIFIERS } from 'src/utils/constants';

import { compareArrays, LazyComputed, lazyComputedField } from '../LazyComputed';
import { MobxValueLite } from '../MobixValueLite';
import type { ModelBoxContext, RawModelType } from '../ModelWrapper';
import { ModelWrapper } from '../ModelWrapper';

import type { EventModel } from './EventModel';
import type { SelectionModel } from './SelectionModel/SelectionModel';

const MarketTemplateModelTypeIO = t.type({
    id: t.string,
    name: t.string,
    marketTypeGeneric: t.string,
    marketTemplateType: t.union([t.string, t.null]),
    mainGroup: t.union([t.string, t.null, t.undefined]),
    customName: t.union([t.string, t.null]),
    period: t.union([t.string, t.null]),
    sportId: t.string,
});

type MarketTemplateModelType = t.TypeOf<typeof MarketTemplateModelTypeIO>;
const TermsModelTypeIO = t.type({
    places: t.number,
    reduction: t.string,
});

type TagsType = Record<string, string[]>;

const EachWayIO = t.type({
    offered: t.boolean,
    terms: t.array(TermsModelTypeIO),
    termsWithBet: t.boolean,
});

type EachWayType = t.TypeOf<typeof EachWayIO>;

const MISSING_REVISION = -4;

export class MarketModel {
    private readonly modelBoxContext: ModelBoxContext;
    private data: MobxValueLite<RawModelType>;

    private fieldId: LazyComputed<number>;
    private fieldDisplay: LazyComputed<boolean | undefined>;
    private fieldDisplayed: LazyComputed<boolean>;
    private fieldTemplate: LazyComputed<MarketTemplateModelType>;
    private fieldGenericType: LazyComputed<MarketTemplateModelType>;
    private fieldTags: LazyComputed<TagsType>;
    private fieldSelectionsIds: LazyComputed<Record<string, true>>;
    private fieldLine: LazyComputed<number | null | undefined>;
    private fieldAsianInPlayLine: LazyComputed<number | null | undefined>;
    private fieldEachWay: LazyComputed<EachWayType | null>;
    private fieldEventId: LazyComputed<number>;
    private fieldActive: LazyComputed<boolean>;
    private fieldName: LazyComputed<string>;
    private fieldRevision: LazyComputed<number>;
    private fieldTeam: LazyComputed<string | null>;
    private fieldTime: LazyComputed<string | null>;

    private fieldTradedInPlay: LazyComputed<boolean>;
    private fieldSpOnly: LazyComputed<boolean | undefined | null>;
    private fieldSp: LazyComputed<boolean>;
    private fieldBp: LazyComputed<boolean>;
    private fieldDisplayOrder: LazyComputed<number>;

    private computedSelections: LazyComputed<SelectionModel[]>;
    private computedMarketGroups: LazyComputed<string[]>;

    constructor(modelBoxContext: ModelBoxContext, data: RawModelType) {
        this.modelBoxContext = modelBoxContext;

        this.data = new MobxValueLite(data);

        this.fieldId = lazyComputedField('MarketModel.id', t.number, 0, () => this.data.get().id);

        this.fieldDisplay = lazyComputedField(
            'SelectionModel.display',
            t.union([t.boolean, t.undefined]),
            undefined,
            (): unknown => this.data.get().display,
        );

        this.fieldDisplayed = LazyComputed.create(() => {
            if (this.fieldDisplay.get() === false) {
                return false;
            }

            for (const selectionId of this.selectionsIds) {
                const selectionModel = this.modelBoxContext.getSelection(selectionId);

                if (selectionModel !== null && selectionModel.display === true) {
                    return true;
                }
            }

            return false;
        });

        this.fieldTemplate = lazyComputedField(
            'MarketModel.template',
            MarketTemplateModelTypeIO,
            {
                id: '',
                name: '',
                marketTypeGeneric: '',
                customName: null,
                marketTemplateType: '',
                mainGroup: '',
                period: '',
                sportId: '',
            },
            () => {
                const rawTemplate = this.data.get().template;

                return {
                    ...rawTemplate,
                    period:
                        typeof rawTemplate?.period === 'string' || rawTemplate?.period === null
                            ? rawTemplate.period
                            : null,
                };
            },
            (a: MarketTemplateModelType, b: MarketTemplateModelType): boolean => a.id === b.id && a.name === b.name,
        );

        this.fieldGenericType = lazyComputedField(
            'MarketModel.marketTypeGeneric',
            MarketTemplateModelTypeIO,
            {
                id: '',
                name: '',
                marketTypeGeneric: '',
                customName: null,
                marketTemplateType: '',
                mainGroup: '',
                period: '',
                sportId: '',
            },
            () => this.data.get().template,
            (a: MarketTemplateModelType, b: MarketTemplateModelType): boolean =>
                a.marketTypeGeneric === b.marketTypeGeneric,
        );

        this.fieldTags = lazyComputedField(
            'MarketModel.tags',
            t.record(t.string, t.array(t.string)),
            {},
            () => this.data.get().tags,
        );

        this.fieldSelectionsIds = lazyComputedField(
            'MarketModel.SelectionsIds',
            t.record(t.string, t.literal(true)),
            {},
            () => this.data.get().selections,
            //compareArrays
        );

        this.fieldLine = lazyComputedField<number | undefined | null>(
            'MarketModel.line',
            t.union([t.number, t.null, t.undefined]),
            undefined,
            () => this.data.get().line,
        );

        this.fieldAsianInPlayLine = lazyComputedField<number | undefined | null>(
            'MarketModel.asianInPlayLine',
            t.union([t.number, t.null, t.undefined]),
            undefined,
            () => this.data.get().asianInPlayLine,
        );

        this.fieldEachWay = lazyComputedField(
            'MarketModel.eachWay',
            t.union([EachWayIO, t.null]),
            null,
            () => this.data.get().eachWay ?? null,
            (a: EachWayType | null, b: EachWayType | null): boolean => {
                if (a === null) {
                    return b === null;
                }

                if (b === null) {
                    return false;
                }

                return a.offered === b.offered;
            },
        );

        this.fieldEventId = lazyComputedField('MarketModel.eventId', t.number, 0, () => this.data.get().eventId);

        this.fieldActive = lazyComputedField('MarketModel.active', t.boolean, false, () => this.data.get().active);

        this.fieldName = lazyComputedField('MarketModel.name', t.string, '', () => this.data.get().name);
        this.fieldRevision = lazyComputedField(
            'MarketModel.revision',
            t.number,
            MISSING_REVISION,
            () => this.data.get().revision,
        );

        this.fieldTime = lazyComputedField(
            'MarketModel.time',
            t.union([t.string, t.null]),
            '',
            () => this.data.get().time,
        );

        this.fieldTeam = lazyComputedField(
            'MarketModel.team',
            t.union([t.string, t.null]),
            '',
            () => this.data.get().team,
        );

        this.fieldTradedInPlay = lazyComputedField(
            'MarketModel.tradedInPlay',
            t.boolean,
            false,
            () => this.data.get().tradedInPlay,
        );

        this.fieldSpOnly = lazyComputedField(
            'MarketModel.spOnly',
            t.union([t.boolean, t.undefined, t.null]),
            false,
            () => this.data.get().spOnly,
        );

        this.fieldSp = lazyComputedField('MarketModel.sp', t.boolean, false, () => this.data.get().sp);

        this.fieldBp = lazyComputedField('MarketModel.bp', t.boolean, false, () => this.data.get().bp);

        this.fieldDisplayOrder = lazyComputedField(
            'MarketModel.displayOrder',
            t.number,
            0,
            () => this.data.get().displayOrder,
        );

        this.computedMarketGroups = LazyComputed.create(() => {
            const groups = this.data.get().tags['market-group'];

            if (groups !== null) {
                return groups;
            }

            return null;
        });

        this.computedSelections = LazyComputed.create<SelectionModel[]>(() => {
            const overUnderSelectionsOrder = [SELECTIONS_IDENTIFIERS.over, SELECTIONS_IDENTIFIERS.under];
            const out: SelectionModel[] = [];

            const selectionsIds = Object.keys(this.fieldSelectionsIds.get());

            for (const idStr of selectionsIds) {
                const id = parseInt(idStr, 10);

                const item = this.modelBoxContext.getSelection(id);

                if (item !== null) {
                    out.push(item);
                }
            }

            // We need to preserve selections order for over under markets, "Over" selection first.
            // Sometimes "Under" selection comes first from backend because id for this selection is lower than id for "Over" selection.
            if (isOverUnderMarket(this)) {
                return sortBy(out, (selection) => overUnderSelectionsOrder.indexOf(String(selection.identifier)));
            }

            return out;
        }, compareArrays);
    }

    static create(modelBoxContext: ModelBoxContext, data: RawModelType): ModelWrapper<MarketModel> {
        const model = new MarketModel(modelBoxContext, data);

        return new ModelWrapper(model, (data: RawModelType) => {
            model.data.set(data);
        });
    }

    getRawData(): RawModelType {
        return this.data.get();
    }

    get marketData(): RawModelType {
        return this.getRawData();
    }

    get id(): number {
        return this.fieldId.get();
    }

    get displayed(): boolean {
        return this.fieldDisplayed.get();
    }

    get visible(): boolean {
        return this.displayed && this.tradedCorrectly;
    }

    get template(): MarketTemplateModelType {
        return this.fieldTemplate.get();
    }

    get tags(): TagsType {
        return this.fieldTags.get();
    }

    get templateId(): string {
        return this.fieldTemplate.get().id;
    }

    get time(): string | null {
        return this.fieldTime.get();
    }

    get team(): string | null {
        return this.fieldTeam.get();
    }

    get marketTypeGeneric(): string {
        const value = this.fieldGenericType.get().marketTypeGeneric;

        return value !== null ? value : '';
    }

    get marketGroups(): string[] {
        return this.computedMarketGroups.get();
    }

    get name(): string {
        return this.fieldName.get();
    }

    get revision() {
        return this.fieldRevision.get();
    }

    private getTag(name: string): string[] {
        const tags = this.fieldTags.get();
        const value = tags[name];

        if (Array.isArray(value)) {
            return value;
        }

        return [];
    }

    //x.getIn(['tags', 'website-main'], List()).includes('yes')
    //m.tags['website-main'].indexOf('yes') !== -1
    get websiteMain(): boolean {
        const websiteMain = this.getTag('website-main');

        return websiteMain.includes('yes');
    }

    get websitePopular(): boolean {
        //market.getIn([ 'tags', 'website-popular', 0 ]) !== '-';
        const websitetPopular = this.getTag('website-popular');

        return !websitetPopular.includes('-');
    }

    get displayOrderTag(): string | undefined {
        const displayOrderTag = this.getTag('display-order')[0];

        if (displayOrderTag) {
            return displayOrderTag;
        }
    }

    get inPlayLhn(): boolean {
        return this.getTag('in-play-lhn').includes('yes');
    }

    get selectionsIds(): number[] {
        //return this.fieldSelectionsIds.get();

        const out: number[] = [];
        const idKeys = Object.keys(this.fieldSelectionsIds.get());

        for (const idStr of idKeys) {
            const id = parseInt(idStr, 10);

            out.push(id);
        }

        return out;
    }

    get selections(): SelectionModel[] {
        return this.computedSelections.get();
    }

    get tradedCorrectly(): boolean {
        const parentEvent = this.eventModel;

        if (parentEvent === null) {
            return true;
        }

        const { timeSettingsStarted } = parentEvent;

        return (timeSettingsStarted && this.tradedInPlay) || !timeSettingsStarted;
    }

    get isSuspended(): boolean {
        return this.selections.every((selection) => {
            const modelForView = selection?.forView();
            const price = selection.price;
            const priceForView = modelForView?.price;
            const suspended = modelForView?.suspended;

            return suspended === true || price === undefined || priceForView === undefined || !this.tradedCorrectly;
        });
    }

    get tradedInPlay(): boolean {
        return this.fieldTradedInPlay.get();
    }

    get spOnly(): boolean {
        return this.fieldSpOnly.get() ?? false;
    }

    get sp(): boolean {
        return this.fieldSp.get();
    }

    get bp(): boolean {
        return this.fieldBp.get();
    }

    get marketName(): string {
        return this.name;
    }

    get displayOrder(): number {
        return this.fieldDisplayOrder.get();
    }

    get displayTemplate(): string[] {
        //TODO - change to private
        return this.getTag('display-template');
    }

    get displayTemplateFirst(): string | undefined {
        return this.displayTemplate[0];
    }

    get eachWay(): EachWayType | null {
        return this.fieldEachWay.get();
    }

    get eachWayOffered(): boolean {
        const eachWay = this.eachWay;

        if (eachWay) {
            return eachWay.offered;
        }

        return false;
    }

    get eachWayTermsPlaces(): number | undefined {
        const eachWay = this.eachWay;

        if (eachWay) {
            const termsItem = eachWay.terms[0];

            if (termsItem) {
                return termsItem.places;
            }
        }

        return undefined;
    }

    get eachWayTermsReduction(): string | undefined {
        const eachWay = this.eachWay;

        if (eachWay) {
            const termsItem = eachWay.terms[0];

            if (termsItem) {
                return termsItem.reduction;
            }
        }

        return undefined;
    }

    get active(): boolean {
        return this.fieldActive.get();
    }

    get display(): boolean | undefined {
        return this.fieldDisplay.get();
    }

    get eventId(): number {
        return this.fieldEventId.get();
    }

    get eventModel(): EventModel | null {
        return this.modelBoxContext.getEvent(this.eventId);
    }

    getEvent(): EventModel | null {
        return this.modelBoxContext.getEvent(this.eventId);
    }

    get activated(): boolean {
        const parentEvent = this.eventModel;

        if (parentEvent !== null) {
            return parentEvent.active && this.active;
        }

        return false;
    }

    get line(): number | null {
        const value = this.fieldLine.get();

        if (value === undefined) {
            return null;
        }

        return value;
    }

    get asianInPlayLine(): number | null {
        const value = this.fieldAsianInPlayLine.get();

        if (value === undefined) {
            return null;
        }

        return value;
    }
}
