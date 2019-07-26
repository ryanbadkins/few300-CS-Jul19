import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodosState, selectCurrentFilter } from '../../reducers';
import { FilterOptions } from '../../reducers/filter.reducer';
import { setFilter, updateFilter } from '../../actions/filter.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  filter$: Observable<FilterOptions>;
  textFilter$: Observable<string>;
  constructor(private store: Store<TodosState>) { }

  ngOnInit() {
    this.filter$ = this.store.select(selectCurrentFilter);
  }
  setFilter(filter: FilterOptions) {
    this.store.dispatch(setFilter({ filter }));
  }
  updateFilter(filterString: string) {
    this.store.dispatch(updateFilter({ filterString }));
  }
}
