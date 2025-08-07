import * as t from 'io-ts';
import type { RawModelType, ModelBoxContext } from '../ModelWrapper';
import { ModelWrapper } from '../ModelWrapper';
import { MobxValueLite } from '../MobixValueLite';
import type { LazyComputed } from '../LazyComputed';
import { lazyComputedField } from '../LazyComputed';
import type { PlatformObjectType } from './types';
import { PlatformObjectIO } from './types';

export class CompetitionModel {
    private data: MobxValueLite<RawModelType>;

    private fieldId: LazyComputed<number>;
    private fieldDisplayOrder: LazyComputed<number>;
    private fieldName: LazyComputed<string>;
    private fieldPlatformObject: LazyComputed<PlatformObjectType | undefined | null>;

    constructor(_modelBoxContext: ModelBoxContext, data: RawModelType) {
        this.data = new MobxValueLite(data);

        this.fieldId = lazyComputedField(
            'CompetitionModel.displayOrder',
            t.number,
            0,
            (): unknown => this.data.get().id,
        );

        this.fieldDisplayOrder = lazyComputedField('CompetitionModel.displayOrder', t.number, 0, (): number => {
            const displayOrder = this.data.get().displayOrder;

            if (typeof displayOrder === 'number') {
                return displayOrder;
            }

            if (typeof displayOrder === 'string') {
                const valueNumber = parseInt(displayOrder, 10);

                if (!isNaN(valueNumber)) {
                    return valueNumber;
                }
            }

            throw Error('CompetitionModel.displayOrder - number expected');
        });

        this.fieldName = lazyComputedField('CompetitionModel.name', t.string, '', () => this.data.get().name);

        this.fieldPlatformObject = lazyComputedField(
            'CompetitionModel.platformObject',
            t.union([PlatformObjectIO, t.undefined, t.null]),
            undefined,
            () => this.data.get().platformObject,
        );
    }

    static create(modelBoxContext: ModelBoxContext, data: RawModelType): ModelWrapper<CompetitionModel> {
        const model = new CompetitionModel(modelBoxContext, data);

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

    get name(): string {
        return this.fieldName.get();
    }

    get platformObject(): PlatformObjectType | undefined | null {
        return this.fieldPlatformObject.get();
    }
}
