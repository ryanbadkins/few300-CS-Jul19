import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodosState, selectFeatureLoaded } from './reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  loaded$: Observable<boolean>;
  constructor(private store: Store<TodosState>) { }

  ngOnInit() {
    this.loaded$ = this.store.select(selectFeatureLoaded);
  }

}
