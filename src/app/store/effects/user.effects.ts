import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as userActions from "../actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UserService } from "../../services/user.service";

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) {}

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(userActions.loadUser),
            mergeMap(
                (action) => this.userService.getUser(action.userId)
                    .pipe(
                        map((user) => userActions.loadUserSuccess({user})),
                        catchError((err) => of(userActions.loadUsersError({payload: err})))
                    )
            )
        )
    );
}