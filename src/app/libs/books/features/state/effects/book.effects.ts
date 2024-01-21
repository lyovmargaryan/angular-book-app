import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {MatSnackBar} from "@angular/material/snack-bar";

import * as bookPageActions from '../actions/book.actions';
import {catchError, delay, map, of, switchMap} from "rxjs";
import {BookService} from "@app/libs/books/features/data-access/services/book.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Toasty} from "@app/libs/shared/toasty/toasty.enum";


@Injectable()
export class BookEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private matSnackBar: MatSnackBar,
    private bookService: BookService,
  ) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookPageActions.loadBooks),
      switchMap(() =>
        this.bookService.getBooks().pipe(
          delay(1000), /* for seeing loader*/
          map((books) => bookPageActions.loadBooksSuccess({
            books
          })),
          catchError(({ error }: HttpErrorResponse) => {
            this.matSnackBar.open(error.message, '', {
              panelClass: Toasty.Failure
            });

            return of(bookPageActions.loadBooksFailure({ error }));
          })
        )
      )
    )
  );

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookPageActions.loadBook),
      switchMap(({ id }) =>
        this.bookService.getBookById(id).pipe(
          delay(1000), /* for seeing loader*/
          map((book) => bookPageActions.loadBookSuccess({
            book
          })),
          catchError(({ error }: HttpErrorResponse) => {
            this.matSnackBar.open(error.message, '', {
              panelClass: Toasty.Failure
            });

            return of(bookPageActions.loadBookFailure({ error }));
          })
        )
      )
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookPageActions.createBook),
      switchMap(({ payload }) =>
        this.bookService.createBook(payload).pipe(
          map((book) => {
            this.matSnackBar.open('Book Created', '', {
              panelClass: Toasty.Success
            });

            return bookPageActions.createBookSuccess({
              book
            });
          }),
          catchError(({ error }: HttpErrorResponse) => {
            this.matSnackBar.open(error.message, '', {
              panelClass: Toasty.Failure
            });

            return of(bookPageActions.createBookFailure({ error }));
          })
        )
      )
    )
  );
}
