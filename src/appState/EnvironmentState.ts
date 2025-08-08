import { computed, observable, makeObservable } from 'mobx';

import { BeteastTheme } from '@solo-ui/system';

import { SPORT_REMAPPING as SPORT_REMAPPING_DEFAULT } from 'src/config/config';

import type { AppStateSerializedType } from './AppStateImportExport';
import { convertMapToRecordDefault } from './utils';

export class EmotionTheme {
    private readonly getEnv: () => string;

    constructor(getEnv: () => string) {
        makeObservable(this, {
            star: computed,
        });

        this.getEnv = getEnv;
    }

    get star() {
        return BeteastTheme;
    }

    get universe(): string {
        return this.getEnv();
    }
}

const FETCH_MARKETS_GROUP_SIZE_DEFAULT = 200;
const ACCOUNT_UPDATE_DELAY_TIMEOUT = 0;

export class EnvironmentState {
    readonly universeValue: string;
    readonly websocket_host: string;
    readonly cashout_websocket_host: string;
    readonly userAgent: string;
    readonly img_api_url: string;
    readonly refreshTimeout: number;
    readonly fetchMarketsGroupSize: number;
    readonly accountUpdateDelayTimeout: number;
    readonly shouldRefreshEvent: boolean;
    readonly featureTogglingProxyUri: string;
    readonly featureTogglingProxyToken: string;
    readonly sportRemapping: Record<string, string>;
    readonly host: string;

    constructor(
        universe: string,
        userAgent: string,
        websocket_host: string,
        cashout_websocket_host: string,
        img_api_url: string,
        refreshTimeout: number,
        fetchMarketsGroupSize: number,
        options: Pick<
            AppStateSerializedType,
            'accountUpdateDelayTimeout' | 'featureTogglingProxyUri' | 'featureTogglingProxyToken'
        >,
        shouldRefreshEvent: boolean,
        sportRemapping: Record<string, string>,
        host: string,
    ) {
        makeObservable<EnvironmentState, 'universeValue'>(this, {
            universeValue: observable,
            universe: computed,
        });

        const { accountUpdateDelayTimeout, featureTogglingProxyUri, featureTogglingProxyToken } = options;

        this.universeValue = universe;

        this.websocket_host = websocket_host;

        this.cashout_websocket_host = cashout_websocket_host;

        this.userAgent = userAgent;

        this.img_api_url = img_api_url;

        this.refreshTimeout = refreshTimeout;

        this.fetchMarketsGroupSize = fetchMarketsGroupSize;

        this.accountUpdateDelayTimeout = accountUpdateDelayTimeout;

        this.shouldRefreshEvent = shouldRefreshEvent;

        this.featureTogglingProxyUri = featureTogglingProxyUri;

        this.featureTogglingProxyToken = featureTogglingProxyToken;

        this.sportRemapping = sportRemapping;

        this.host = host;
    }

    static createForContext(): EnvironmentState {
        return new EnvironmentState(
            'star',
            '',
            '',
            '',
            '',
            6000,
            FETCH_MARKETS_GROUP_SIZE_DEFAULT,
            {
                accountUpdateDelayTimeout: ACCOUNT_UPDATE_DELAY_TIMEOUT,
                featureTogglingProxyUri: '',
                featureTogglingProxyToken: '',
            },
            false,
            convertMapToRecordDefault(SPORT_REMAPPING_DEFAULT),
            '',
        );
    }

    get universe(): string {
        return this.universeValue;
    }
}
