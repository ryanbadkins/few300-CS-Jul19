export const featureName = 'todosFeature';
import * as fromList from './list.reducer';
import * as models from '../models';
import * as fromCompleted from './completed.reducer';
import * as fromFilter from './filter.reducer';
import * as fromUiHints from './ui-hints.reducer';
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
export interface TodosState {
  list: fromList.TodoListState;
  completed: fromCompleted.CompletedState;
  filter: fromFilter.FilterState;
  ui: fromUiHints.UiHintsState;
}

export const reducers: ActionReducerMap<TodosState> = {
  list: fromList.reducer,
  completed: fromCompleted.reducer,
  filter: fromFilter.reducer,
  ui: fromUiHints.reducer
};

// Create a feature selector
const selectTodoFeatures = createFeatureSelector<TodosState>(featureName);
// Create a selector for ewach branch of the feature
const selectListBranch = createSelector(selectTodoFeatures, f => f.list);
const selectCompletedBranch = createSelector(selectTodoFeatures, f => f.completed);
const selectFilterBranch = createSelector(selectTodoFeatures, f => f.filter);
const selectInputText = createSelector(selectFilterBranch, f => f.filterString);
const selectUiHints = createSelector(selectTodoFeatures, f => f.ui);
// Any Helpers

export const selectCurrentFilter = createSelector(selectFilterBranch, f => f.listFilter);

const { selectAll: selectAllTodoEntity } = fromList.adapter.getSelectors(selectListBranch);
const selectCompletedIds = createSelector(selectCompletedBranch, b => b.ids);
// Exported Selectors from the components
// We need a selector that returns an array of TodoListItemModel[]
export const selectFeatureLoaded = createSelector(selectUiHints, h => h.listLoaded);

export const selectUnfilteredTodoList = createSelector(
  selectAllTodoEntity,
  selectCompletedIds,
  (todos, completed) => todos.map(todo => {
    return {
      id: todo.id,
      description: todo.description,
      completed: completed.some(id => id === todo.id),
      isTemp: todo.id.startsWith('F')
    } as models.ListItemModel;
  }));

export const selectButtonTodoList = createSelector(
  selectUnfilteredTodoList,
  selectCurrentFilter,
  (todos, filterOption) => {
    if (filterOption === 'all') {
      return todos;
    }
    if (filterOption === 'complete') {
      return todos.filter(t => t.completed === true);
    }
    if (filterOption === 'incomplete') {
      return todos.filter(t => t.completed === false);
    }
  }
);

export const selectTodoList = createSelector(
  selectInputText,
  selectButtonTodoList,
  (filterString, todos) => {
    return todos.filter(t => t.description.match(filterString));
  }
);
