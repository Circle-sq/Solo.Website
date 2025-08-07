import type { AxiosRequestHeaders } from 'axios';
import type { Map as ImmutableMap } from 'immutable';
import { fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import { autorun } from 'mobx';

import ROUTES from 'src/app/configRoutes';
import { ModalRouteName } from 'src/common/enums';
import { SPORT_BOOK_MESSAGES } from 'src/utils/constants';
import Router from 'src/utils/Router';
import { IFRAME_ACTION_TYPE, LogStandaloneMessage } from 'src/utils/standalone/utils';
import type { SportBookMessages } from 'src/utils/types';

import createStore from './create-store';

type AnyState = ImmutableMap<'items', any>;

function mapItems(state: AnyState): AnyState {
    return state.set(
        'items',
        state.get('items').mapKeys((id: string) => +id),
    );
}

interface ApplicationParams {
    url: string;
    data: any;
    apiHeaders?: AxiosRequestHeaders;
    apiUrl?: string;
}

class Application {
    url: string;
    data: any;
    store: any;
    router: Router;
    unsubscribeRouter: () => void;

    constructor(params: ApplicationParams) {
        const { url, data } = params;

        this.url = url;

        this.initializeData(data || {});

        this.initializeStore();

        this.router = new Router(this.url, ROUTES);

        const dispose = autorun(() => {
            const route = this.router.route;

            this.store.dispatch({
                type: 'ROUTER_ROUTE',
                ...route,
            });
        });

        this.unsubscribeRouter = () => {
            dispose();
        };
    }

    extract() {
        if (!this.store) {
            return this.data;
        }

        return this.store.getState();
    }

    initializeData(data: any) {
        this.data = data;

        Object.keys(data).forEach((module) => {
            if (module !== ModalRouteName.Betslip) {
                this.data[module] = fromJS(data[module]);
            }
        });

        for (const namespace of ['events', 'competitions']) {
            if (this.data[namespace] && this.data[namespace].get('items')) {
                this.data[namespace] = mapItems(this.data[namespace]);
            }
        }
    }

    initializeStore() {
        const data = this.extract();

        this.store = createStore(data, this);
    }

    postInternalMessage(hasError: boolean, data: any, type?: SportBookMessages) {
        if (window.self === window.top) {
            return;
        }

        if (hasError) {
            window.postMessage(
                {
                    type: SPORT_BOOK_MESSAGES.internalError,
                    value: data,
                },
                window.location.origin,
            );
        } else if (type !== undefined) {
            window.postMessage(
                {
                    type,
                    value: data,
                },
                window.location.origin,
            );
        }
    }

    postExternalMessage(type: string, data?: any) {
        const host = window.$appState?.env?.host;

        if (isEmpty(host)) {
            return;
        }

        try {
            const message = { type, ...(data !== undefined ? { value: data } : {}) };
            window.parent.postMessage(message, host);

            LogStandaloneMessage(
                IFRAME_ACTION_TYPE.push,
                `message: ${JSON.stringify(message, null, 2)}, host: ${host}`,
            );
        } catch (err) {
            console.error('MessageToParent:', err);
        }
    }

    destroy() {
        this.unsubscribeRouter();

        this.store.destroy();

        this.router.destroy();
    }
}

export default Application;
