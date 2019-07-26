import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as filterActions from '../actions/filter.actions';
import { tap, map, filter, switchMap, catchError, concatMap, mergeMap } from 'rxjs/operators';
import * as appActions from '../../../actions/app.actions';
import { FilterOptions } from '../reducers/filter.reducer';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TodoEntity } from '../reducers/list.reducer';
import { todosLoadedSuccessfully } from '../actions/list.actions';
import * as listActions from '../actions/list.actions';
import { Observable, of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()
export class FilterEffects {
  saveTodo = createEffect(() => {
    return this.actions$.pipe(
      ofType(listActions.addTodoItem),
      concatMap(
        (originalAction) => this.client.post<TodoEntity>(environment.todosUrl, { description: originalAction.entity.description })
          .pipe(
            map(response => listActions.addTodoItemSucceeded({ oldId: originalAction.entity.id, entity: response })),
            catchError((err) => of(listActions.addTodoItemFailed({ id: originalAction.entity.id, message: err.error })))
          )
      )
    );
  });

  deleteTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.deleteTodo),
      concatMap(action => this.client.delete(`${environment.todosUrl}/${action.entity.id}`))
    ), { dispatch: false }
  );


  clearAll = createEffect(() => {
    return this.actions$.pipe(
      ofType(listActions.clearCompleted),
      // map(action => action.items.map(a => a.id)),
      mergeMap(actions => actions.items.map(entity => listActions.deleteTodo({ entity })))
    );
  }, { dispatch: true });
  markCompleted = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.todoItemCompleted),
      switchMap(
        action => this.client.put(environment.todosUrl + '/completed/' + action.item.id, action.item))
    ),
    { dispatch: false });

  loadTodos = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.loadTodos),
      switchMap(
        () => this.client.get<TodosResponse>(environment.todosUrl).pipe(
          map(r => r.data),
          map(todos => {
            const completedIds = todos.filter(t => t.completed).map(t => t.id);
            const todoEntities = todos.map(todo => ({
              id: todo.id,
              description: todo.description
            } as TodoEntity));
            return listActions.todosLoadedSuccessfully({ completedIds, todos: todoEntities });
          })
        )
      )), { dispatch: true });

  loadFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(filterActions.loadFilter),
      map(() => localStorage.getItem('filter')),
      filter(f => f !== null),
      map(f => f as FilterOptions),
      map((f) => filterActions.setFilter({ filter: f }))
    );
  }
  );

  saveFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(filterActions.setFilter),
      tap(action => localStorage.setItem('filter', action.filter))
    );
  }, { dispatch: false });

  constructor(private actions$: Actions, private client: HttpClient) { }
}

interface TodosResponse {
  data: { id: string, description: string, completed: boolean }[];
}
