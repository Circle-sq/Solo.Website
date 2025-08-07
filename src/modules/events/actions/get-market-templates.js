export const MARKET_TEMPLATES_REQUEST = 'MARKET_TEMPLATES_REQUEST';
export const MARKET_TEMPLATES_FINISH = 'MARKET_TEMPLATES_FINISH';
export const MARKET_TEMPLATES_ERROR = 'MARKET_TEMPLATES_ERROR';

export const request = (sport) => {
    return {
        type: MARKET_TEMPLATES_REQUEST,
        sport,
    };
};

export const finish = (sport, data) => {
    return {
        type: MARKET_TEMPLATES_FINISH,
        sport,
        data,
    };
};

export const error = (sport, errors) => {
    return {
        type: MARKET_TEMPLATES_ERROR,
        sport,
        errors,
    };
};
