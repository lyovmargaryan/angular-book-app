import { createFeatureActionType } from '@app/store/utils';
import { createAction, props } from '@ngrx/store';

import { IBookModel } from "@app/libs/books/features/data-access/models/book.model";
import {IBookFeatureFiltersState} from "@app/libs/books/features/state/models/book-future.model";
import {ISortingDefaultModel, IUpdatePaginationDefaultModel} from "@app-ngrx-utils/base-model";

const bookPageActionsNamespace = createFeatureActionType('Books Page');

export const loadBooks = createAction(
  `${bookPageActionsNamespace} Load Books`
);

export const loadBooksSuccess = createAction(
  `${bookPageActionsNamespace} Load Books Success`,
  props<{ books: IBookModel[] }>()
);

export const loadBooksFailure = createAction(
  `${bookPageActionsNamespace} Load Books Failure`,
  props<{ error: Error }>()
);

export const loadBook = createAction(
  `${bookPageActionsNamespace} Load Book`,
  props<{ id: number }>()
);

export const loadBookSuccess = createAction(
  `${bookPageActionsNamespace} Load Book Success`,
  props<{ book: IBookModel }>()
);

export const loadBookFailure = createAction(
  `${bookPageActionsNamespace} Load Book Failure`,
  props<{ error: Error }>()
);

export const createBook = createAction(
  `${bookPageActionsNamespace} Create Book`,
  props<{ payload: IBookModel }>()
);
export const createBookSuccess = createAction(
  `${bookPageActionsNamespace} Create Book Success`,
  props<{ book: IBookModel }>()
);
export const createBookFailure = createAction(
  `${bookPageActionsNamespace} Create Book Failure`,
  props<{ error: Error }>()
);

export const updateFilter = createAction(
  `${bookPageActionsNamespace} Update Books Filter`,
  props<{ payload: IBookFeatureFiltersState }>()
);

export const updateSorting = createAction(
  `${bookPageActionsNamespace} Update Books Sorting`,
  props<{ payload: ISortingDefaultModel }>()
);

export const updatePagination = createAction(
  `${bookPageActionsNamespace} Update Books Pagination`,
  props<IUpdatePaginationDefaultModel>()
);
