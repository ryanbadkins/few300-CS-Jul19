import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../../../actions/app.actions';
import * as listActions from '../actions/list.actions';
import * as filterActions from '../actions/filter.actions';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  startFeature$ = createEffect(() =>
    this.action$.pipe(
      ofType(appActions.applicationStarted),
      mergeMap(() => [
        listActions.loadTodos(),
        filterActions.loadFilter()
      ])
    ));
  constructor(private action$: Actions) { }
}
