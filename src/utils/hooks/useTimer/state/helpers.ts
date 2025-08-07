import type { ActionType } from './enums';
import type { Action, ActionReturn } from 'src/appState/redux/types';

export function createActionType<T extends ActionType>(type: T): Action<T>;

export function createActionType<T extends ActionType, P>(type: T, payload: P): ActionReturn<T, P>;

export function createActionType(type: ActionType, payload?: unknown): ActionReturn<ActionType, unknown> {
    return { type, payload };
}
