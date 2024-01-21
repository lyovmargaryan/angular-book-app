import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {MatSnackBar} from "@angular/material/snack-bar";

import * as authorActions from '../actions/author.actions';
import {catchError, delay, map, of, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Toasty} from "@app/libs/shared/toasty/toasty.enum";
import {AuthorService} from "@app/libs/books/features/data-access/services/author.service";


@Injectable()
export class AuthorEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private matSnackBar: MatSnackBar,
    private authorService: AuthorService,
  ) {}

  loadAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorActions.loadAuthors),
      switchMap(() =>
        this.authorService.getAuthors().pipe(
          delay(1000), /* for seeing loader*/
          map((authors) => authorActions.loadAuthorsSuccess({
            authors
          })),
          catchError(({ error }: HttpErrorResponse) => {
            this.matSnackBar.open(error.message, '', {
              panelClass: Toasty.Failure
            });

            return of(authorActions.loadAuthorsFailure({ error }));
          })
        )
      )
    )
  );

  createAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorActions.createAuthor),
      switchMap(({ payload }) =>
        this.authorService.createAuthor(payload).pipe(
          map((author) => {
            this.matSnackBar.open('Author Created', '', {
              panelClass: Toasty.Success
            });

            return authorActions.createAuthorSuccess({
              author
            });
          }),
          catchError(({ error }: HttpErrorResponse) => {
            this.matSnackBar.open(error.message, '', {
              panelClass: Toasty.Failure
            });

            return of(authorActions.createAuthorFailure({ error }));
          })
        )
      )
    )
  );

  updateAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorActions.updateAuthor),
      switchMap(({ author }) =>
        this.authorService.updateAuthor(author).pipe(
          map((author) => {
            this.matSnackBar.open('Author Updated', '', {
              panelClass: Toasty.Success
            });

            return authorActions.updateAuthorSuccess({
              author
            });
          }),
          catchError(({ error }: HttpErrorResponse) => {
            this.matSnackBar.open(error.message, '', {
              panelClass: Toasty.Failure
            });

            return of(authorActions.updateAuthorFailure({ error }));
          })
        )
      )
    )
  );
}
