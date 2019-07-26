import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/list.actions';

export interface TodoEntity {
  id: string;
  description: string;
}
export interface TodoListState extends EntityState<TodoEntity> {

}

export const adapter = createEntityAdapter<TodoEntity>();
const initialState: TodoListState = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(actions.addTodoItem, (state, action) => adapter.addOne(action.entity, state)),
  on(actions.clearCompleted, (state, action) => adapter.removeMany(action.items.map(item => item.id), state)),
  on(actions.todosLoadedSuccessfully, (state, action) => adapter.addAll(action.todos, state)),
  on(actions.addTodoItemSucceeded, (state, action) => {
    const tempState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.entity, tempState);
  }),
  on(actions.addTodoItemFailed, (state, action) => adapter.removeOne(action.id, state))
);
// export function reducer(state: TodoListState = initialState, action): TodoListState {
//   return state;
// }
