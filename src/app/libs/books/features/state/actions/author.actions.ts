import { createFeatureActionType } from '@app/store/utils';
import { createAction, props } from '@ngrx/store';

import {ISortingDefaultModel, IUpdatePaginationDefaultModel} from "@app-ngrx-utils/base-model";
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";

const authorActionsNamespace = createFeatureActionType('Authors');

export const loadAuthors = createAction(
  `${authorActionsNamespace} Load Authors`
);

export const loadAuthorsSuccess = createAction(
  `${authorActionsNamespace} Load Authors Success`,
  props<{ authors: IAuthorModel[] }>()
);

export const loadAuthorsFailure = createAction(
  `${authorActionsNamespace} Load Authors Failure`,
  props<{ error: Error }>()
);

export const updateAuthor = createAction(
  `${authorActionsNamespace} Update Author`,
  props<{ author: IAuthorModel }>()
);

export const updateAuthorSuccess = createAction(
  `${authorActionsNamespace} Update Author Success`,
  props<{ author: IAuthorModel }>()
);

export const updateAuthorFailure = createAction(
  `${authorActionsNamespace} Update Author Failure`,
  props<{ error: Error }>()
);

export const createAuthor = createAction(
  `${authorActionsNamespace} Create Author`,
  props<{ payload: string }>()
);
export const createAuthorSuccess = createAction(
  `${authorActionsNamespace} Create Author Success`,
  props<{ author: IAuthorModel }>()
);
export const createAuthorFailure = createAction(
  `${authorActionsNamespace} Create Author Failure`,
  props<{ error: Error }>()
);

export const updateSorting = createAction(
  `${authorActionsNamespace} Update Authors Sorting`,
  props<{ payload: ISortingDefaultModel }>()
);

export const updatePagination = createAction(
  `${authorActionsNamespace} Update Authors Pagination`,
  props<IUpdatePaginationDefaultModel>()
);
