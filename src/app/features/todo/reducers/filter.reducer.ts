import { createAction, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/filter.actions';
import { tassign } from 'tassign';

export type FilterOptions = `all` | `incomplete` | `complete`;

export interface FilterState {
  listFilter: FilterOptions;
  filterString: string;
}

export const initialState: FilterState = {
  listFilter: 'all',
  filterString: ''
};

export const reducer = createReducer(
  initialState,
  on(actions.setFilter, (state, action) => tassign(state, { listFilter: action.filter })),
  on(actions.updateFilter, (state, action) => tassign(state, { filterString: action.filterString }))
);
