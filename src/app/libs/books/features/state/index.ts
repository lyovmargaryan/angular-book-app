import {BookEffects} from "@app/libs/books/features/state/effects/book.effects";
import {AuthorEffects} from "@app/libs/books/features/state/effects/author.effects";

import {
  selectCallState,
  selectAllEntities,
  selectBooksSortState,
  selectBooksPaginatorState,
  selectBooksFiltersState, selectPaginatedBooks, selectBookCallState, selectBook,
} from './selectors/book.selectors';

import {
  selectAuthorCallState,
  selectAuthorAllEntities,
  selectAuthorsSortState,
  selectAuthorsPaginatorState,
  selectPaginatedAuthors,
} from './selectors/author.selectors';

export const bookSelectors = {
  selectCallState,
  selectAllEntities,
  selectBooksSortState,
  selectBooksPaginatorState,
  selectBooksFiltersState,
  selectPaginatedBooks,
  selectBookCallState,
  selectBook
};

export const authorSelectors = {
  selectAuthorCallState,
  selectAuthorAllEntities,
  selectAuthorsSortState,
  selectAuthorsPaginatorState,
  selectPaginatedAuthors
}

export const bookPageEffects = [BookEffects];
export const authorEffects = [AuthorEffects];

export * as bookPageActions from './actions/book.actions';
export * as authorActions from './actions/author.actions';

export { bookFeatureKey, bookFeature } from './book.feature';
export { authorFeatureKey, authorFeature } from './author.feature';
