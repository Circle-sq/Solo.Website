import type { IAtom } from 'mobx';
import { createAtom } from 'mobx';

export class MobxValueLite<T> {
    private readonly atom: IAtom;
    private value: T;

    constructor(value: T) {
        this.value = value;

        this.atom = createAtom('MobxValueLite');
    }

    set(value: T) {
        this.value = value;

        this.atom.reportChanged();
    }

    get(): T {
        this.atom.reportObserved();

        return this.value;
    }

    /*
    getValueSilent(): T {
        return this.value;
    }*/
}
