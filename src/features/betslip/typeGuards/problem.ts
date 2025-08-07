import some from 'lodash/some';

import { ErrorResource } from 'src/common/enums/error';

import type { BaseProblem } from '../api/types/problem';

export const isRelatedSelectionProblem = <T extends BaseProblem>(problem: T): problem is T & { code: 'related' } =>
    problem.resource === ErrorResource.Selection && problem.code === 'related';

export const isSinglesOnlyMarketProblem = <T extends BaseProblem>(
    problem: T,
): problem is T & { code: 'singles-only' } =>
    problem.resource === ErrorResource.Market && problem.code === 'singles-only';

export const hasProblemWith = <T extends BaseProblem>(
    problems: BaseProblem[] | undefined = [],
    predicate: (problem: T) => boolean,
): problems is T[] => some(problems, predicate);
