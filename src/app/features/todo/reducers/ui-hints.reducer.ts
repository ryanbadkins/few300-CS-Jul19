import { createReducer, on } from '@ngrx/store';
import * as listActions from '../actions/list.actions';

export interface UiHintsState {
  listLoaded: boolean;
}

const initialState: UiHintsState = {
  listLoaded: false
};

export const reducer = createReducer(
  initialState,
  on(listActions.loadTodos, (state) => ({ listLoaded: false })),
  on(listActions.todosLoadedSuccessfully, (state) => ({ listLoaded: true }))
);
