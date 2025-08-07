export const decodeJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
            })
            .join(''),
    );

    return JSON.parse(jsonPayload);
};

export const encodeJwt = (data: Record<string, unknown>) => {
    return `${btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))}.${btoa(JSON.stringify(data))}`;
};

export const getTokenExpirationDate = (token: string) => new Date(decodeJwt(token).exp * 1000).toISOString();
