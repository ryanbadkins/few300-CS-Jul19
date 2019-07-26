import { createAction, props } from '@ngrx/store';
import { FilterOptions } from '../reducers/filter.reducer';

export const setFilter = createAction(
  '[todosfeature] filter set',
  props<{ filter: FilterOptions }>()
);

export const updateFilter = createAction(
  '[todosfeature] update filter',
  props<{ filterString: string }>()
);


export const loadFilter = createAction(
  '[todosfeature] load filter'
);
