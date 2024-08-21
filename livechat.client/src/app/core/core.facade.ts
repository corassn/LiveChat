import { Injectable } from "@angular/core";
import { selectUser } from "./+state/state.selectors";
import { Store } from "@ngrx/store";
import * as StateActions from './+state/state.actions';
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CoreFacade {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  currentUser$ = this.store.select(selectUser);

  constructor(private readonly store: Store) { }

  setCurrentUser(user: string | undefined): void {
    this.store.dispatch(StateActions.setUser({ user }));
  }

  setLoading(isLoading: boolean): void {
    this.isLoadingSubject.next(isLoading);
  }
}