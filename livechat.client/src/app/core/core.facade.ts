import { Injectable } from "@angular/core";
import { selectUser } from "./+state/state.selectors";
import { Store } from "@ngrx/store";
import * as StateActions from './+state/state.actions';

@Injectable({ providedIn: 'root' })
export class CoreFacade {
currentUser$ = this.store.select(selectUser);

constructor(private readonly store: Store) {}

setCurrentUser(user: string | undefined): void {
    this.store.dispatch(StateActions.setUser({ user }));
  }
}