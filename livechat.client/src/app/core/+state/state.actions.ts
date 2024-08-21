import { createAction, props } from "@ngrx/store";
import { SET_CURRENT_USER } from "./state.constants";

export const setUser = createAction(SET_CURRENT_USER, props<{ user: string | undefined }>())