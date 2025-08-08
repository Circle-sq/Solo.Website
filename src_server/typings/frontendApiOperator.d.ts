declare module '@solo/solo-frontend-api/src/lib/middlewares/operator' {
    import type { RequestHandler } from 'express';

    const middleware: RequestHandler;

    export default middleware;
}
