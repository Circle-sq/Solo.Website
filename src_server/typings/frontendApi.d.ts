declare module '@solo/solo-frontend-api' {
    import type { RequestHandler } from 'express';

    interface Params {
        mode: string;
        wrapResponse: boolean;
        operators: any;
        buildInfo: any;
    }

    interface Session {
        initialized: boolean;
    }

    interface Handler {
        session: Record<string, Session>;
    }

    const api: (params: Params) => Handler & RequestHandler;

    export default api;
}
