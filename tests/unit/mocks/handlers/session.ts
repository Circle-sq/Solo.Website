import { http, HttpResponse } from 'msw';

import { encodeJwt } from 'src/utils/jwt';

export const createAnonymousSessionHandler = http.post('/api/create-anonymous-session', async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const token = encodeJwt({ exp: date.getTime() });

    return HttpResponse.json({
        accountId: null,
        accountName: 'anonymous',
        accountType: 'anonymous',
        refresh_token: '',
        token,
    });
});
