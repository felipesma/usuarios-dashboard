import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { loadUser, loadUserSuccess, loadUsers, loadUsersError, loadUsersSuccess } from '../actions';

export interface UserState {
  id: string;
  user: User | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const userInitialState: UserState = {
  id: '',
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _userReducer = createReducer(
  userInitialState,
  on(loadUser, (state, {userId}) => ({ ...state, loading: true, id: userId, loaded: false, error: null })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user: {...user},
    loaded: true,
    loading: false,
  })),
  on(loadUsersError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function userReducer(state: UserState = userInitialState, action: Action) {
  return _userReducer(state, action);
}
