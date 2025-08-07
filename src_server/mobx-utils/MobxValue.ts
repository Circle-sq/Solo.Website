import type { IAtom } from 'mobx';
import { createAtom } from 'mobx';
import { createPromiseBox } from './createPromiseBox';

type OnDispose = () => void;
export type OnConnect = () => OnDispose;

const execOnConnectInNextTick = (connectFn: OnConnect): OnDispose => {
    const shouldDown = createPromiseBox<void>();

    setTimeout(async () => {
        const dispose = connectFn();
        await shouldDown.promise;
        dispose();
    }, 0);

    return () => {
        shouldDown.resolve();
    };
};

class ConnectionManager {
    private onConnectList: Array<OnConnect>;
    private onDisposeList: Array<OnDispose> | null;

    constructor() {
        this.onConnectList = [];
        this.onDisposeList = null;
    }

    onConnect(onConnectFn: OnConnect) {
        this.onConnectList.push(onConnectFn);

        if (this.onDisposeList !== null) {
            this.onDisposeList.push(execOnConnectInNextTick(onConnectFn));
        }
    }

    connect = () => {
        if (this.onDisposeList !== null) {
            console.error('MobxValue - error connect');
        }

        this.onDisposeList = [];

        const onConnectClone = this.onConnectList.concat();

        for (const item of onConnectClone) {
            this.onDisposeList.push(execOnConnectInNextTick(item));
        }
    };

    dispose = () => {
        if (this.onDisposeList === null) {
            console.error('MobxValue - error dispose');

            return;
        }

        const onDisposeListClone = this.onDisposeList.concat();

        for (const item of onDisposeListClone) {
            item();
        }

        this.onDisposeList = null;
    };
}

interface MobxValueParams<T> {
    initValue: T;
}

export class MobxValue<T> {
    private connectionManager: ConnectionManager;
    private readonly atom: IAtom;
    private value: T;

    constructor(params: MobxValueParams<T>) {
        this.connectionManager = new ConnectionManager();
        this.value = params.initValue;

        this.atom = createAtom('MobxValue', this.connectionManager.connect, this.connectionManager.dispose);
    }

    onConnect(onConnectFn: OnConnect) {
        this.connectionManager.onConnect(onConnectFn);
    }

    setValue(value: T) {
        if (this.value !== value) {
            this.value = value;
            this.atom.reportChanged();
        }
    }

    getValue(): T {
        this.atom.reportObserved();

        return this.value;
    }
}
