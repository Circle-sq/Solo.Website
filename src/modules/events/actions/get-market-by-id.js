export const GET_MARKET_BY_ID_REQUEST = 'GET_MARKET_BY_ID_REQUEST';
export const GET_MARKET_BY_ID_ERROR = 'GET_MARKET_BY_ID_ERROR';

export const request = (eventId, marketId, translationData) => {
    return {
        type: GET_MARKET_BY_ID_REQUEST,
        eventId,
        marketId,
        translationData,
    };
};

export const error = (errors) => {
    return {
        type: GET_MARKET_BY_ID_ERROR,
        errors,
    };
};
