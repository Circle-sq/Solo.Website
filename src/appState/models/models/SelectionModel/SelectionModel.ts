import * as t from 'io-ts';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

import type { Price, PriceHistory } from 'src/common/types/selectionPrice';
import { MARKET_TEMPLATE } from 'src/utils/constants';
import type { SortCriteriaType } from 'src/utils/sortNew';

import { LazyComputed, lazyComputedField } from '../../LazyComputed';
import { MobxValueLite } from '../../MobixValueLite';
import type { ModelBoxContext, RawModelType } from '../../ModelWrapper';
import { ModelWrapper } from '../../ModelWrapper';
import type { EventModel } from '../EventModel';
import type { MarketModel } from '../MarketModel';

import { SelectionViewModel } from './SelectionViewModel';

const FieldTagsIO = t.union([t.record(t.string, t.array(t.string)), t.undefined]);
type FieldTagsType = t.TypeOf<typeof FieldTagsIO>;

const PriceIO = t.type({
    d: t.number,
    f: t.string,
});

const TemplateIO = t.type({
    id: t.string,
    marketTemplateId: t.string,
});

type TemplateType = t.TypeOf<typeof TemplateIO>;

const PriceHistoryItemIO = t.type({
    t: t.string,
    p: t.type({
        d: t.number,
        f: t.string,
    }),
});

export class SelectionModel {
    private modelBoxContext: ModelBoxContext;
    private data: MobxValueLite<RawModelType>;

    private fieldId: LazyComputed<number>;
    private fieldDisplay: LazyComputed<boolean | undefined | null>;
    private fieldTags: LazyComputed<FieldTagsType>;
    private fieldEventId: LazyComputed<number>;
    private fieldPrice: LazyComputed<Price | undefined | null>;
    private fieldMarketId: LazyComputed<number>;
    private fieldTemplate: LazyComputed<TemplateType | undefined>;
    private fieldDisplayOrder: LazyComputed<number | undefined>;
    private fieldActive: LazyComputed<boolean | undefined | null>;
    private fieldName: LazyComputed<string | undefined>;
    private fieldState: LazyComputed<string | undefined>;
    private fieldNameWithoutLine: LazyComputed<string | undefined | null>;
    private fieldResult: LazyComputed<undefined | { type: string | undefined | null } | null>;
    private fieldResultType: LazyComputed<string | undefined | null>;
    private fieldPriceHistory: LazyComputed<PriceHistory[] | undefined | null>;
    private fieldLine: LazyComputed<string | undefined | null>;
    private fieldAsianInPlayLine: LazyComputed<string | undefined | null>;

    // TODO investigate - why void? - doesn't look different
    private computedSelectionIdentifiers: LazyComputed<string | void>;
    private computedForViewSpUndefined: LazyComputed<SelectionViewModel | null>;
    private computedForViewSpTrue: LazyComputed<SelectionViewModel | null>;
    private computedForViewSpFalse: LazyComputed<SelectionViewModel | null>;

    constructor(modelBoxContext: ModelBoxContext, data: RawModelType) {
        this.modelBoxContext = modelBoxContext;

        this.data = new MobxValueLite(data);

        this.fieldId = lazyComputedField('SelectionModel.id', t.number, 0, (): unknown => this.data.get().id);

        this.fieldDisplay = lazyComputedField(
            'SelectionModel.display',
            t.union([t.boolean, t.undefined, t.null]),
            undefined,
            (): unknown => this.data.get().display,
        );

        this.fieldTags = lazyComputedField(
            'SelectionModel.tags',
            FieldTagsIO,
            undefined,
            (): unknown => this.data.get().tags,
        );

        this.fieldEventId = lazyComputedField(
            'SelectionModel.eventId',
            t.number,
            0,
            (): unknown => this.data.get().eventId,
        );

        this.fieldPrice = lazyComputedField(
            'Selection.price',
            t.union([PriceIO, t.undefined, t.null]),
            undefined,
            () => this.data.get().price,
        );

        this.fieldMarketId = lazyComputedField('Selection.marketId', t.number, 0, () => this.data.get().marketId);

        this.fieldTemplate = lazyComputedField(
            'SelectionModel.template',
            t.union([TemplateIO, t.undefined]),
            undefined,
            () => this.data.get().template,
        );

        this.fieldDisplayOrder = lazyComputedField(
            'SelectionModel.displayOrder',
            t.union([t.number, t.undefined]),
            undefined,
            () => this.data.get().displayOrder,
        );

        this.fieldActive = lazyComputedField(
            'SelectionModel.active',
            t.union([t.boolean, t.undefined, t.null]),
            undefined,
            (): unknown => this.data.get().active,
        );

        this.fieldName = lazyComputedField(
            'SelectionModel.name',
            t.union([t.string, t.undefined]),
            undefined,
            (): unknown => this.data.get().name,
        );

        this.fieldState = lazyComputedField(
            'SelectionModel.state',
            t.union([t.string, t.undefined]),
            undefined,
            (): unknown => this.data.get().state,
        );

        this.fieldNameWithoutLine = lazyComputedField(
            'SelectionModel.nameWithoutLine',
            t.union([t.string, t.undefined, t.null]),
            undefined,
            (): unknown => this.data.get().nameWithoutLine,
        );

        this.fieldLine = lazyComputedField(
            'SelectionModel.line',
            t.union([t.string, t.undefined, t.null]),
            undefined,
            (): unknown => this.data.get().line,
        );

        this.fieldAsianInPlayLine = lazyComputedField(
            'SelectionModel.asianInPlayLine',
            t.union([t.string, t.undefined, t.null]),
            undefined,
            (): unknown => this.data.get().asianInPlayLine,
        );

        this.fieldResult = lazyComputedField(
            'SelectionModel.result',
            t.union([
                t.interface({
                    type: t.union([t.string, t.undefined, t.null]),
                }),
                t.undefined,
                t.null,
            ]),
            undefined,
            (): unknown => this.data.get().result,
        );

        this.fieldResultType = LazyComputed.create(() => {
            const value = this.fieldResult.get();

            if (value !== undefined && value !== null) {
                return value.type;
            }
        });

        this.fieldPriceHistory = lazyComputedField(
            'SelectionModel.priceHistory',
            t.union([t.undefined, t.null, t.array(PriceHistoryItemIO)]),
            [],
            () => {
                return this.data.get().priceHistory;
            },
        );

        this.computedSelectionIdentifiers = LazyComputed.create<string | void>(() => {
            const tags = this.fieldTags.get();

            if (tags !== undefined) {
                for (const [key, tag] of Object.entries(tags)) {
                    if (/selection-identifiers/.exec(key)) {
                        const result = tag[0];

                        if (typeof result === 'string') {
                            return result;
                        }

                        return undefined;
                    }
                }
            }
        });

        this.computedForViewSpUndefined = LazyComputed.create(() => this.forViewModel());

        this.computedForViewSpTrue = LazyComputed.create(() => this.forViewModel(true));

        this.computedForViewSpFalse = LazyComputed.create(() => this.forViewModel(false));
    }

    static create(modelBoxContext: ModelBoxContext, data: RawModelType): ModelWrapper<SelectionModel> {
        const model = new SelectionModel(modelBoxContext, data);

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

    get selectionIdentifiers(): string | void {
        return this.computedSelectionIdentifiers.get();
    }

    get display(): boolean {
        return this.fieldDisplay.get() === true ? true : false;
    }

    get eventId(): number {
        return this.fieldEventId.get();
    }

    getEvent(): EventModel | null {
        const eventId = this.eventId;

        return this.modelBoxContext.getEvent(eventId);
    }

    get marketId(): number {
        return this.fieldMarketId.get();
    }

    get spOnly(): boolean | void {
        const parentMarket = this.getMarket();

        if (parentMarket !== null) {
            return parentMarket.spOnly;
        }

        return false;
    }

    get displayOrder(): number | void {
        return this.fieldDisplayOrder.get();
    }

    getMarket(): MarketModel | null {
        const marketId = this.marketId;

        return this.modelBoxContext.getMarket(marketId);
    }

    get price(): Price | undefined {
        const price = this.fieldPrice.get();

        if (price === null) {
            return undefined;
        }

        return price;
    }

    get resultType(): string | undefined | null {
        return this.fieldResultType.get();
    }

    get tags(): FieldTagsType {
        return this.fieldTags.get();
    }

    get sp(): boolean {
        const parentMarket = this.getMarket();

        if (parentMarket !== null) {
            return parentMarket.sp;
        }

        return false;
    }

    get isSP(): boolean {
        const parentEvent = this.getEvent();

        if (parentEvent !== null) {
            return this.sp && parentEvent.timeSettingsStarted !== true;
        }

        return false;
    }

    get templateId(): string | void {
        const template = this.fieldTemplate.get();

        if (template !== undefined) {
            return template.id;
        }

        return undefined;
    }

    get active(): boolean {
        return this.fieldActive.get() === true ? true : false;
    }

    get activated(): boolean {
        const parentMarket = this.getMarket();

        if (parentMarket !== null) {
            return parentMarket.activated && this.active;
        }

        return false;
    }

    private forViewModel(sp?: boolean): SelectionViewModel | null {
        const eventModel = this.getEvent();

        if (eventModel === null) {
            return null;
        }

        const marketModel = this.getMarket();

        if (marketModel === null) {
            return null;
        }

        return new SelectionViewModel(this.modelBoxContext, eventModel, marketModel, this, sp);
    }

    forView(sp?: boolean): SelectionViewModel | null {
        if (sp === true) {
            return this.computedForViewSpTrue.get();
        } else if (sp === false) {
            return this.computedForViewSpFalse.get();
        } else {
            return this.computedForViewSpUndefined.get();
        }
    }

    get name(): string {
        const fieldName = this.fieldName.get();

        return fieldName !== undefined ? fieldName : '';
    }

    get state(): string {
        const fieldState = this.fieldState.get();

        return fieldState !== undefined ? fieldState : '';
    }

    get nameWithoutLine(): string {
        const fieldNameWithoutLine = this.fieldNameWithoutLine.get();

        if (isString(fieldNameWithoutLine)) {
            return fieldNameWithoutLine;
        }

        return '';
    }

    get marketDisplayTemplate(): string | typeof MARKET_TEMPLATE {
        const market = this.getMarket();

        if (market !== null && !isEmpty(market.displayTemplateFirst)) {
            return market.displayTemplateFirst as string;
        } else {
            return MARKET_TEMPLATE.default;
        }
    }

    get marketDisplayOrder(): number | undefined {
        const market = this.getMarket();

        if (market !== null) {
            return market.displayOrder;
        }
    }

    get marketSelectionOrdering(): SortCriteriaType | undefined {
        const market = this.getMarket();

        if (market !== null) {
            return market.displayOrderTag as SortCriteriaType;
        }
    }

    get identifier(): string | void {
        return this.selectionIdentifiers;
    }

    get priceHistory(): PriceHistory[] {
        const value = this.fieldPriceHistory.get();

        if (value) {
            return value;
        }

        return [];
    }

    get line(): string | undefined | null {
        return this.fieldLine.get();
    }

    get asianInPlayLine(): string | undefined | null {
        return this.fieldAsianInPlayLine.get();
    }
}
