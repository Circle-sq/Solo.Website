declare namespace Express {
    export interface PortalRequestPayload {
        logintoken: string;
        loginjwt?: string;
        dateFormat: string;
        language: string;
        oddsFormat: string;
        shortDateFormat: string;
        gameId: string;
        portalMessage: string;
        redirectURL: string;
        referer?: string;
        parentReferer?: string;
        theme?: string;
        guestCurrency?: string;
    }

    export interface Request {
        portalBody: Partial<PortalRequestPayload>;
        operator: string;
        logger?: Console;
    }

    export interface Application {
        session: object;
        operators: any;
    }
}
