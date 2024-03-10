import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { loadUser } from '../../store/actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  router$!: Subscription;
  store$!: Subscription;
  user!: User | null;
  loading: boolean = false;
  loaded: boolean = false;
  error: any = null;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.store$ = this.store.select('user').subscribe(
      ({user, loading, loaded, error}) => {
        this.user = user;
        this.loaded = loaded;
        this.loading = loading;
        this.error = error;
      }
    )
    this.router$ = this.router.params.subscribe(
      ({id}) => {
        this.store.dispatch(loadUser({userId: id}));
      }
    )
  }
}
