import { createSelector } from '@ngrx/store';
import { compare } from '@app/store/utils/compare';
import { paginateData } from '@app/store/utils/paginate';
import {authorFeature, authorFeatureKey, authorsEntityAdapter} from "@app/libs/books/features/state/author.feature";
import {IAuthorState} from "@app/libs/books/features/state/models/author-future.model";

export const { selectAll } = authorsEntityAdapter.getSelectors();

const selectAuthorFeatureState = (state: IAuthorState) =>
  state[authorFeatureKey];

export const selectAuthorCallState = createSelector(
  authorFeature.selectCallState,
  (state) => state.callState
);

export const selectAuthorsSortState = createSelector(
  selectAuthorFeatureState,
  (state) => state.sort
);

export const selectAuthorsPaginatorState = createSelector(
  selectAuthorFeatureState,
  (state) => state.paginator
);

export const selectAuthorAllEntities = createSelector(
  selectAuthorFeatureState,
  (state) => selectAll(state.entities)
);


export const selectSortedAuthors = createSelector(
  selectAuthorAllEntities,
  selectAuthorsSortState,
  (discounts, sort) => {
    if (sort.sortBy) {
      return discounts.sort((a, b) => {
        const sortA = a[sort.sortBy];
        const sortB = b[sort.sortBy];
        return compare(sortA, sortB, sort.sortDirection);
      });
    }
    return discounts;
  }
);

const selectPageIndex = createSelector(
  selectAuthorsPaginatorState,
  (paginator) => paginator.pageIndex
);

const selectPageSize = createSelector(
  selectAuthorsPaginatorState,
  (paginator) => paginator.pageSize
);

export const selectPaginatedAuthors = createSelector(
  selectAuthorsSortState,
  selectSortedAuthors,
  selectPageIndex,
  selectPageSize,
  (_, authors, pageIndex, pageSize) =>
    paginateData(authors, pageIndex, pageSize)
);
