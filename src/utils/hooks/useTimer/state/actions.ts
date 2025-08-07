import { createActionType } from './helpers';
import { ActionType } from './enums';
import type { Action, ActionReturn } from 'src/appState/redux/types';
import type { Settings } from '../types';

export const resetTimer = (payload: Settings['initialTime']): ActionReturn<ActionType.Reset, number> =>
    createActionType(ActionType.Reset, payload);

export const setTimer = (payload: number): ActionReturn<ActionType.Set, number> =>
    createActionType(ActionType.Set, payload);

export const startTimer = (payload: Settings['initialTime']): ActionReturn<ActionType.Start, number> =>
    createActionType(ActionType.Start, payload);

export const pauseTimer = (): Action<ActionType.Pause> => createActionType(ActionType.Pause);

export const stopTimer = (): Action<ActionType.Stop> => createActionType(ActionType.Stop);
