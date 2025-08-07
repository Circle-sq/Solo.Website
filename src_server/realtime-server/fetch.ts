import fetch from 'node-fetch';

const TIMEOUT = 30 * 1000;

const defaultHeaders = {
    'Content-Type': 'application/json',
};

const getAuthorization = (backendToken: string): Record<string, string> => ({
    Authorization: `Bearer ${backendToken}`,
});

const getHeaders = (backendToken: string | null, extraHeaders?: Record<string, string>): Record<string, string> => {
    const basicHeaders = {
        ...defaultHeaders,
        ...(backendToken !== null ? getAuthorization(backendToken) : {}),
    };

    if (extraHeaders) {
        return {
            ...basicHeaders,
            ...extraHeaders,
        };
    }

    return basicHeaders;
};

interface DataIn {
    status: number;
    postBody?: unknown;
    text?: unknown;
}

interface PostParamGeneral<P> {
    url: string;
    backendToken: string | null;
    postBody?: P;
    extraHeaders?: Record<string, string>;
}

export interface FetchGeneralResponseType {
    status: number;
    body: string;
}

const decodeResponseInner = async <R>(decode: (data: DataIn) => R | Error, data: { status: number }): Promise<R> => {
    const result = decode(data);

    if (result instanceof Error) {
        return Promise.reject(result);
    }

    return result;
};

export const decodeResponse = async <R>(
    resp: FetchGeneralResponseType,
    decode: (data: DataIn) => R | Error,
): Promise<R> => {
    const text = resp.body;

    try {
        const dataToDecode = {
            status: resp.status,
            bodyJson: JSON.parse(text),
        };

        return decodeResponseInner(decode, dataToDecode);
    } catch (_err) {
        const dataToDecode = {
            status: resp.status,
            text: text,
        };

        return decodeResponseInner(decode, dataToDecode);
    }
};

export const fetchGeneral = async <P>(
    method: 'POST' | 'PATCH' | 'GET',
    params: PostParamGeneral<P>,
): Promise<FetchGeneralResponseType> => {
    const { url, backendToken, postBody, extraHeaders } = params;

    const fetchParams = {
        method: method,
        body: method === 'GET' ? undefined : JSON.stringify(postBody),
        headers: getHeaders(backendToken, extraHeaders),
        timeout: TIMEOUT,
    };

    console.info(`FETCH-API ${method} REQUEST ${url}`);

    const resp = await fetch(url, fetchParams);

    console.info(`FETCH-API ${method} RESPONSE ${url} status=${resp.status}`);

    const body = await resp.text();

    return {
        status: resp.status,
        body: body,
    };
};

export interface PostParamWithoutToken<P, R> {
    url: string;
    postBody: P;
    decode: (data: DataIn) => R | Error;
    extraHeaders?: Record<string, string>;
}

export interface PostParam<P, R> {
    url: string;
    backendToken: string | null;
    postBody: P;
    decode: (data: DataIn) => R | Error;
    extraHeaders?: Record<string, string>;
}

export const fetchPost = async <P, R extends { status: number }>(params: PostParam<P, R>): Promise<R> => {
    const response = await fetchGeneral('POST', params);

    return decodeResponse(response, params.decode);
};

export const fetchPatch = async <P, R extends { status: number }>(params: PostParam<P, R>): Promise<R> => {
    const response = await fetchGeneral('PATCH', params);

    return decodeResponse(response, params.decode);
};

export interface GetParamsWithoutToken<R> {
    url: string;
    decode: (data: DataIn) => R | Error;
    extraHeaders?: Record<string, string>;
    withoutToken?: boolean;
}

export interface GetParams<R> {
    url: string;
    backendToken: string | null;
    decode: (data: DataIn) => R | Error;
    extraHeaders?: Record<string, string>;
}

export const fetchGet = async <R extends { status: number }>(params: GetParams<R>): Promise<R> => {
    const response = await fetchGeneral('GET', params);

    return decodeResponse(response, params.decode);
};
