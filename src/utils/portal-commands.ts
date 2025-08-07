import { SPORT_BOOK_MESSAGES } from 'src/utils/constants';

export const relogin = () => {
    if (process.env.NODE_ENV !== 'production') {
        console.info('sent login signal');
    }

    window.parent.postMessage({ type: SPORT_BOOK_MESSAGES.relogin }, '*');
};

export const sessionExpired = () => {
    if (process.env.NODE_ENV !== 'production') {
        console.info('sent Session Expired signal');
    }
    window.parent.postMessage({ type: SPORT_BOOK_MESSAGES.sessionExpired }, '*');
};
