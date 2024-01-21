import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {IBookModel} from "@app/libs/books/features/data-access/models/book.model";
import {bookPageActions, bookSelectors} from "@app/libs/books/features/state";
import {Store} from "@ngrx/store";
import {IBooksState} from "@app/libs/books/features/state/models/book-future.model";
import {Subscription, switchMap, tap} from "rxjs";
import {BookService} from "@app/libs/books/features/data-access/services/book.service";
import {CallState} from "@app/store/utils";
import {selectBook} from "@app/libs/books/features/state/selectors/book.selectors";
import {ICallState} from "@app-ngrx-utils/base-model";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit, OnDestroy {

  private sub = new Subscription();

  callState = CallState;

  selectCallState$ = this.store.select<CallState>(
    bookSelectors.selectBookCallState
  );

  book$ = this.store.select<{ book: IBookModel}>(
    bookSelectors.selectBook
  );

  constructor(
    private store: Store<IBooksState>,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.sub.add(
      this.route.params.pipe(
        tap((params) => {
          this.store.dispatch(bookPageActions.loadBook({
            id: params['id']
          }));
        })
      ).subscribe()
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
