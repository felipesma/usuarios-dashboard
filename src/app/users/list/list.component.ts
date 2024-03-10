import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../store/actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  users: User[] = [];
  users$!: Subscription;
  loading: boolean = false;
  loaded: boolean = false;
  error: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.users$ = this.store.select('users').subscribe(
      ({users, loading, loaded, error}) => {
        this.users = users;
        this.loading = loading;
        this.loaded = loaded;
        this.error = error;
      }
    )
    this.store.dispatch(loadUsers());
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
  }
}
