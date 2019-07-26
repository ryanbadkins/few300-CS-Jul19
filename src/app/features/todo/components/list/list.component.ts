import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListItemModel } from '../../models';
import { Observable, Subscription } from 'rxjs';
import { TodosState, selectButtonTodoList, selectCurrentFilter, selectTodoList } from '../../reducers';
import { Store } from '@ngrx/store';
import { TodoEntity } from '../../reducers/list.reducer';
import { todoItemCompleted, clearCompleted } from '../../actions/list.actions';
import { FilterOptions } from '../../reducers/filter.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  model$: Observable<ListItemModel[]>;
  filter$: Observable<FilterOptions>;
  subscription: Subscription;
  completedItems: ListItemModel[];
  constructor(private store: Store<TodosState>) { }

  ngOnInit() {
    this.model$ = this.store.select(selectTodoList);
    this.filter$ = this.store.select(selectCurrentFilter);
    this.subscription = this.model$.subscribe(items => this.completedItems = items.filter(item => item.completed));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  markComplete(item: TodoEntity) {
    this.store.dispatch(todoItemCompleted({ item }));
  }

  removeCompleted() {
    this.store.dispatch(clearCompleted({ items: this.completedItems }));
  }
}
