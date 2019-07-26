import { todoItemCompleted } from '../actions/list.actions';
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/list.actions';
import { adapter } from './list.reducer';

export interface CompletedState {
  ids: string[];
}

export const initialState: CompletedState = {
  ids: ['2']
};

export const reducer = createReducer(
  initialState,
  on(actions.todoItemCompleted, (state, action) => {
    return {
      ids: [action.item.id, ...state.ids]
    };
  }),
  on(actions.clearCompleted, () => ({ ids: [] })),
  on(actions.todosLoadedSuccessfully, (state, action) => ({ ids: action.completedIds }))
);
