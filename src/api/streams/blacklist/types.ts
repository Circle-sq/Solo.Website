interface Blacklist {
    id: number;
    providerName: string;
}

interface ErrorResponse {
    status: 'NOT_FOUND';
    code: 404;
    message: string;
}

export type BlacklistResponse = Blacklist[] | ErrorResponse;
