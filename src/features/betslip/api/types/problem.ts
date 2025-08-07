import type { ErrorResource } from 'src/common/enums/error';
import type { ErrorDetails } from 'src/common/types/error';

export interface Problem<T = ErrorDetails> extends BaseProblem {
    pointer: string;
    details: T;
    debugDetails: string | null;
    field: string | null;
    ignorePointer?: string | null;
    selectionIds?: string[];
}

export interface BaseProblem {
    code: string;
    resource: ErrorResource;
}
