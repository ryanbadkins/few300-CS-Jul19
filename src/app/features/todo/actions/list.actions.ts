import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/list.reducer';

let fakeId = 99;
export const addTodoItem = createAction(
  '[todosfeature] add item',
  (description: string) => {
    const newItem: TodoEntity = {
      id: 'F' + fakeId++,
      description
    };
    return { entity: newItem };
  }
);

export const addTodoItemSucceeded = createAction(
  '[todosfeature] add todos item success',
  props<{ oldId: string, entity: TodoEntity }>()
);
export const addTodoItemFailed = createAction(
  '[todosfeature] add todo failed',
  props<{ id: string, message: string }>()
);

export const todoItemCompleted = createAction(
  '[todosfeature] todo item completed',
  props<{ item: TodoEntity }>()
);

export const clearCompleted = createAction(
  '[todosfeature] completed todos clear',
  props<{ items: TodoEntity[] }>()
);
export const loadTodos = createAction(
  '[todosfeature] load todos'
);
export const todosLoadedSuccessfully = createAction(
  '[todosfeature] todos loaded successfully',
  props<{ completedIds: string[], todos: TodoEntity[] }>()
);

export const deleteTodo = createAction(
  '[todosfeature] delete completed',
  props<{ entity: TodoEntity }>()
);

