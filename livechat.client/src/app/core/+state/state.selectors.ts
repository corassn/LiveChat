import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoreState } from "./state.models";
import { CORE_FEATURE_NAME } from "./state.constants";

export const selectCoreState = createFeatureSelector<CoreState>(CORE_FEATURE_NAME);
export const selectUser = createSelector(selectCoreState, (state: CoreState) => state.user);