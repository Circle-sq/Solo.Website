export interface FreeBetCredit extends BaseFreeBetCredit {
    friendlyDescription?: string | null;
    expiryDate?: string;
}

export interface BaseFreeBetCredit {
    id: number;
    amount: number;
    promotionId: string | null;
}

export interface FreeBetRemark {
    code: string;
    resource: string;
    details: {
        pots: number[];
        minimum: number;
    };
}

export interface FreeBetAssignment<T = number | null> {
    credits: FreeBetCredit[];
    selectedId: T;
}

export interface FreeBetAssignments<T = number | null> {
    [selectionId: string]: FreeBetAssignment<T>;
}

export interface MultipleFreeBets {
    betId: string | null;
    multipleFreeBets: FreeBetAssignment;
}
