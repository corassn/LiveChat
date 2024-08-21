import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { stateReducer } from './+state/state.reducer';
import { CORE_FEATURE_NAME } from './+state/state.constants';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(CORE_FEATURE_NAME, stateReducer),
  ]
})
export class CoreModule { }
