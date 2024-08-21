import { createReducer, on } from "@ngrx/store";
import { CoreState } from "./state.models";
import * as StateActions from './state.actions';

export const initialState: CoreState =
{
    user: undefined
};

export const stateReducer = createReducer(
    initialState,
    on(StateActions.setUser, (_state, { user }) => {
        return {
            ..._state,
            user,
        }
    })
)