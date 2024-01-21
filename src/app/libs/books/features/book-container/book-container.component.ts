import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CallState} from "@app/store/utils";

import {authorSelectors, bookPageActions, bookSelectors} from '../state';
import {Store} from "@ngrx/store";
import {IBookFeatureFiltersState, IBooksState} from "@app/libs/books/features/state/models/book-future.model";
import {MatDialog} from "@angular/material/dialog";
import {IBookModel} from "@app/libs/books/features/data-access/models/book.model";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RouterLink} from "@angular/router";
import {BookDetailsComponent} from "@app/libs/books/features/book-container/book-details/book-details.component";
import {IPaginatorState, ISortState} from "@app-ngrx-utils/base-model";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import { DEFAULT_SMALL_TABLE_INITIAL_PAGINATION_DATA} from "@app-ngrx-utils/constants";
import {BookFiltersComponent} from "@app/libs/books/features/book-container/book-filters/book-filters.component";
import {CreateBookComponent} from "@app/libs/books/features/book-container/create-book/create-book.component";
import {AuthorsContainerComponent} from "@app/libs/books/features/authors-container/authors-container.component";
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";
import {IAuthorState} from "@app/libs/books/features/state/models/author-future.model";


@Component({
  selector: 'app-book-container',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RouterLink, BookDetailsComponent, MatPaginatorModule, BookFiltersComponent, CreateBookComponent, AuthorsContainerComponent],
  templateUrl: './book-container.component.html',
  styleUrls: ['./book-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookContainerComponent implements OnInit{
  callState = CallState;

  selectCallState$ = this.store.select<CallState>(
    bookSelectors.selectCallState
  );

  books$ = this.store.select<IBookModel[]>(
    bookSelectors.selectAllEntities
  );

  authors$ = this.authorStore.select<IAuthorModel[]>(
    authorSelectors.selectAuthorAllEntities
  );

  selectAuthorsCallState$ = this.authorStore.select<CallState>(
    authorSelectors.selectAuthorCallState
  );

  paginatedBooks$ = this.store.select<IBookModel[]>(
    bookSelectors.selectPaginatedBooks
  );

  sort$ = this.store.select<ISortState>(
    bookSelectors.selectBooksSortState
  );

  filters$ = this.store.select<IBookFeatureFiltersState>(
    bookSelectors.selectBooksFiltersState
  );

  paginator$ = this.store.select<IPaginatorState>(
    bookSelectors.selectBooksPaginatorState
  );

  constructor(
    private store: Store<IBooksState>,
    private authorStore: Store<IAuthorState>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(bookPageActions.loadBooks());
  }

  onFiltersChanged(filters: IBookFeatureFiltersState): void {
    this.store.dispatch(
      bookPageActions.updateFilter({ payload: filters })
    );
    this.store.dispatch(
      bookPageActions.updatePagination(DEFAULT_SMALL_TABLE_INITIAL_PAGINATION_DATA)
    );
  }

  onSortChange(event: ISortState): void {
    this.store.dispatch(
      bookPageActions.updateSorting({
        payload: {
          sortDirection: event.sortDirection,
          sortBy: event.sortBy
        }
      })
    );
  }

  onPaginate(paginatorOptions: PageEvent): void {
    this.store.dispatch(
      bookPageActions.updatePagination({
        pageIndex: paginatorOptions.pageIndex,
        pageSize: paginatorOptions.pageSize,
        previousPageIndex: paginatorOptions.previousPageIndex
      })
    );
  }

  onCreateBook(book: IBookModel): void {
    this.store.dispatch(
      bookPageActions.createBook({ payload: book })
    );
  }
}
