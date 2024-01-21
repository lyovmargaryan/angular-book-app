import { createSelector } from '@ngrx/store';
import { compare } from '@app/store/utils/compare';
import { paginateData } from '@app/store/utils/paginate';
import {bookFeature, bookFeatureKey, booksEntityAdapter} from "@app/libs/books/features/state/book.feature";
import {IBooksState} from "@app/libs/books/features/state/models/book-future.model";
import {filterBooks} from "@app/libs/books/features/state/utils/internal";

export const { selectAll } = booksEntityAdapter.getSelectors();

const selectBookFeatureState = (state: IBooksState) =>
  state[bookFeatureKey];

export const selectCallState = createSelector(
  bookFeature.selectCallState,
  (state) => state.callState
);

export const selectBookCallState = createSelector(
  bookFeature.selectBookCallState,
  (state) => state.callState
);

export const selectBook = createSelector(
  selectBookFeatureState,
  (state) => state.book
);

export const selectBooksSortState = createSelector(
  selectBookFeatureState,
  (state) => state.sort
);

export const selectBooksPaginatorState = createSelector(
  selectBookFeatureState,
  (state) => state.paginator
);

export const selectBooksFiltersState = createSelector(
  selectBookFeatureState,
  (state) => state?.filters
);

export const selectAllEntities = createSelector(
  selectBookFeatureState,
  selectBooksFiltersState,
  (state, filters) => filterBooks(selectAll(state.entities), filters)
);



export const selectSortedBooks = createSelector(
  selectAllEntities,
  selectBooksSortState,
  (books, sort) => {
    if (sort.sortBy) {
      return books.sort((a, b) => {
        const sortA = a[sort.sortBy];
        const sortB = b[sort.sortBy];
        return compare(sortA, sortB, sort.sortDirection);
      });
    }
    return books;
  }
);

const selectPageIndex = createSelector(
  selectBooksPaginatorState,
  (paginator) => paginator.pageIndex
);

const selectPageSize = createSelector(
  selectBooksPaginatorState,
  (paginator) => paginator.pageSize
);

export const selectPaginatedBooks = createSelector(
  selectBooksSortState,
  selectSortedBooks,
  selectPageIndex,
  selectPageSize,
  (_, books, pageIndex, pageSize) =>
    paginateData(books, pageIndex, pageSize)
);
