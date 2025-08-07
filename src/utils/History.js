// TODO @VA: create safe access for window here SC-3447
const History = window.history || {};

// Fallback for IE<10
if (!History.pushState) {
    const parser = document.createElement('a');

    History.pushState = function (_state, _title, originalUrl) {
        let url = originalUrl;

        if (window.onpopstate && url !== window.location.pathname.split('?').shift()) {
            if (url.indexOf('//') !== -1) {
                parser.href = url;

                url = parser.pathname + parser.search + parser.hash;
            }

            window.onpopstate();
        }
    };
}

const pushState = History.pushState;

History.pushState = function () {
    const result = pushState.apply(this, arguments);

    if (typeof window.onpushstate === 'function') {
        window.onpushstate();
    }

    return result;
};

History.popState = function () {
    window.history.go(-2);
};

export default History;
