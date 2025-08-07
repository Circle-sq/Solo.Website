import type { State, TimerActionsType } from '../types';
import { ActionType, TimerStatus } from './enums';

const reducer = (state: State, action: TimerActionsType): State => {
    switch (action.type) {
        case ActionType.Start: {
            return {
                ...state,
                status: TimerStatus.Running,
                time: state.status === TimerStatus.Stopped ? action.payload : state.time,
            };
        }

        case ActionType.Pause: {
            return {
                ...state,
                status: TimerStatus.Paused,
            };
        }

        case ActionType.Stop: {
            return {
                ...state,
                status: TimerStatus.Stopped,
            };
        }

        case ActionType.Reset: {
            return {
                ...state,
                status: TimerStatus.Stopped,
                time: action.payload,
            };
        }

        case ActionType.Set: {
            return {
                ...state,
                time: action.payload,
            };
        }

        default:
            return state;
    }
};

export default reducer;
