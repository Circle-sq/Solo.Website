import type { PriceForView } from 'src/common/types/selectionPrice';
import { PriceType } from 'src/common/types/selectionPrice';

import { getPriceForView, isSelected, isSuspended } from './helpers';
import type { PriceForViewParams } from './types';
import type { SelectionModel } from './SelectionModel';

describe('SelectionViewModel helpers', () => {
    const selectionPrice = { d: 2.5, f: '7/2' };

    describe('getPriceForView', () => {
        const defaultSelection = {
            sp: false,
            templateId: '',
            activated: true,
        } as SelectionModel;
        const defaultParams: PriceForViewParams = {
            selection: defaultSelection,
            started: false,
            isSPOnly: false,
        };

        it('should return selection Price if selection is activated and price is available', () => {
            const selection = { ...defaultSelection, activated: true, price: selectionPrice } as SelectionModel;
            const params = { ...defaultParams, selection };

            expect(getPriceForView(params)).toBe(selectionPrice);
        });

        it('should return SP (Starting Price type) if selection price is not available and priceType is SP', () => {
            const params = { ...defaultParams, priceType: PriceType.SP };

            expect(getPriceForView(params)).toBe(PriceType.SP);
        });

        it('should return SP if isSP is true and sp is not false and selection templateId is "unnamed-favourite"', () => {
            const selection = { ...defaultSelection, sp: true, templateId: 'unnamed-favourite' } as SelectionModel;
            const params = { ...defaultParams, selection };

            expect(getPriceForView(params)).toBe(PriceType.SP);
        });

        it('should return SP if isSP is true and sp is true', () => {
            const selection = { ...defaultSelection, sp: true } as SelectionModel;
            const params = { ...defaultParams, selection };

            expect(getPriceForView(params)).toBe(PriceType.SP);
        });

        it('should return SP if isLegSP is true and sp is not true', () => {
            const params = {
                ...defaultParams,
                priceType: PriceType.SP,
                sp: false,
            };
            expect(getPriceForView(params)).toBe(PriceType.SP);
        });

        it('should return undefined if none of the conditions are met', () => {
            const selection = { ...defaultSelection, sp: false, price: undefined, activated: false } as SelectionModel;
            const params = { ...defaultParams, selection };

            expect(getPriceForView(params)).toBeUndefined();
        });
    });

    describe('isSelected', () => {
        it('should return false when priceType is undefined and price is undefined', () => {
            const result = isSelected();

            expect(result).toBe(false);
        });

        it('should return false when priceType is SP and price is undefined', () => {
            const result = isSelected(PriceType.SP);

            expect(result).toBe(false);
        });

        it('should return false when priceType is FP and price is undefined', () => {
            const result = isSelected(PriceType.FP);

            expect(result).toBe(false);
        });

        it('should return true when priceType is SP and price is SP', () => {
            const result = isSelected(PriceType.SP, PriceType.SP);

            expect(result).toBe(true);
        });

        it('should return false when priceType is SP and price is FP', () => {
            const result = isSelected(PriceType.SP, PriceType.FP as PriceForView);

            expect(result).toBe(false);
        });

        it('should return false when priceType is FP and price is SP', () => {
            const result = isSelected(PriceType.FP, PriceType.SP);

            expect(result).toBe(false);
        });

        it('should return true when priceType is FP and price is FP', () => {
            const result = isSelected(PriceType.FP, PriceType.FP as PriceForView);

            expect(result).toBe(true);
        });

        it('should return false when priceType is undefined and price is FP', () => {
            const result = isSelected(undefined, PriceType.FP as PriceForView);

            expect(result).toBe(false);
        });

        it('should return false when priceType is undefined and price is SP', () => {
            const result = isSelected(undefined, PriceType.SP);

            expect(result).toBe(false);
        });

        it('should return false when priceType is undefined and price is a Price object', () => {
            const result = isSelected(undefined, selectionPrice);

            expect(result).toBe(false);
        });

        it('should return true when priceType is FP and price is a Price object', () => {
            const result = isSelected(PriceType.FP, selectionPrice);

            expect(result).toBe(true);
        });
    });

    describe('isSuspended', () => {
        it('should return false when isSP is true and sp is true', () => {
            const params = {
                selection: { sp: true, activated: true } as SelectionModel,
                sp: true,
                started: false,
                tradedInPlay: false,
                isSPOnly: false,
            };
            const result = isSuspended(params);

            expect(result).toBe(false);
        });

        it('should return false when isSP is false, tradedInPlay is false, started is false, and isSPOnly is false', () => {
            const params = {
                selection: { sp: false, activated: true } as SelectionModel,
                started: false,
                tradedInPlay: false,
                isSPOnly: false,
            };
            const result = isSuspended(params);

            expect(result).toBe(false);
        });

        it('should return true when isSP is false, tradedInPlay is true, started is true, and isSPOnly is false', () => {
            const params = {
                selection: { sp: true, activated: false } as SelectionModel,
                started: true,
                tradedInPlay: true,
                isSPOnly: false,
            };
            const result = isSuspended(params);

            expect(result).toBe(true);
        });

        it('should return false when isSP is false, tradedInPlay is false, started is false, and isSPOnly is true', () => {
            const params = {
                selection: { sp: false, activated: false } as SelectionModel,
                started: false,
                tradedInPlay: false,
                isSPOnly: true,
            };
            const result = isSuspended(params);

            expect(result).toBe(false);
        });

        it('should return true when isSP is true and sp is false', () => {
            const params = {
                selection: { sp: true, activated: true } as SelectionModel,
                sp: false,
                started: true,
                tradedInPlay: false,
                isSPOnly: false,
            };
            const result = isSuspended(params);

            expect(result).toBe(true);
        });

        it('should return true when isSP is true and sp is undefined', () => {
            const params = {
                selection: { sp: true, activated: true } as SelectionModel,
                started: true,
                tradedInPlay: false,
                isSPOnly: false,
            };
            const result = isSuspended(params);

            expect(result).toBe(true);
        });
    });
});
