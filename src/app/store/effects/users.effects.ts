import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usersActions from "../actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UserService } from "../../services/user.service";

@Injectable()
export class UsersEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) {}

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(usersActions.loadUsers),
            mergeMap(
                () => this.userService.getUsers()
                    .pipe(
                        map((users) => usersActions.loadUsersSuccess({users})),
                        catchError((err) => of(usersActions.loadUsersError({payload: err})))
                    )
            )
        )
    );
}