import { createFeatureFeatureKey, CallState } from '@app/store/utils';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ICallState, SortDirection } from '@app-ngrx-utils/base-model';
import { createFeature, createReducer, on, combineReducers } from '@ngrx/store';
import * as bookPageActions from './actions/book.actions';
import {IBookModel} from "@app/libs/books/features/data-access/models/book.model";
import {IBookEntityState, IBookFeatureState} from "@app/libs/books/features/state/models/book-future.model";
import { DEFAULT_SMALL_TABLE_INITIAL_PAGINATION_DATA} from "@app-ngrx-utils/constants";

export const bookFeatureKey = createFeatureFeatureKey('books');

export const booksEntityAdapter: EntityAdapter<IBookModel> =
  createEntityAdapter<IBookModel>({
    selectId: (entity) => entity.id,
    sortComparer: false
  });

const initialState: IBookEntityState =
  booksEntityAdapter.getInitialState();

const initialCallState: ICallState = { callState: CallState.Init, error: null };

export const entitiesFeature = createFeature({
  name: 'bookEntities',
  reducer: createReducer(
    initialState,
    on(bookPageActions.loadBooksSuccess, (state, { books }) =>
      booksEntityAdapter.setAll(books, {
        ...state
      })
    ),
    on(bookPageActions.createBookSuccess, (state, { book }) =>
      booksEntityAdapter.addOne(book, { ...state })
    )
  )
});

export const bookSingleFeature = createFeature({
  name: 'bookEntity',
  reducer: createReducer(
    {
      book: null
    },
    on(bookPageActions.loadBookSuccess, (state, { book }) => ({
      ...state,
      book
    }))
  )
});

export const bookSingleCallStateFeature = createFeature({
  name: 'bookSingleCallState',
  reducer: createReducer(
    initialCallState,
    on(bookPageActions.loadBook, (state) => ({
      ...state,
      callState: CallState.Loading
    })),
    on(bookPageActions.loadBookSuccess, (state) => ({
      ...state,
      callState: CallState.Loaded
    })),
    on(bookPageActions.loadBookFailure, (state) => ({
      ...state,
      callState: CallState.Error
    }))
  )
});

export const callStateFeature = createFeature({
  name: 'bookCallState',
  reducer: createReducer(
    initialCallState,
    on(bookPageActions.loadBooks, (state) => ({
      ...state,
      callState: CallState.Loading
    })),
    on(bookPageActions.loadBooksSuccess, (state) => ({
      ...state,
      callState: CallState.Loaded
    })),
    on(bookPageActions.loadBooksFailure, (state) => ({
      ...state,
      callState: CallState.Error
    }))
  )
});

export const filtersFeature = createFeature({
  name: 'bookFilter',
  reducer: createReducer(
    {
      title: null,
      author: null,
      language: null,
      genre: null,
      fromPages: null,
      toPages: null
    },
    on(bookPageActions.updateFilter, (state, { payload }) => ({
      ...state,
      ...payload
    }))
  )
});

export const sortFeature = createFeature({
  name: 'bookSort',
  reducer: createReducer(
    {
      sortDirection: SortDirection.ASC,
      sortBy: 'id'
    },
    on(bookPageActions.updateSorting, (state, { payload }) => ({
      ...state,
      ...payload
    }))
  )
});

export const paginatorFeature = createFeature({
  name: 'bookPaginator',
  reducer: createReducer(
    DEFAULT_SMALL_TABLE_INITIAL_PAGINATION_DATA,
    on(bookPageActions.updatePagination, (state, payload) => ({
      ...state,
      ...payload
    }))
  )
});

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer: combineReducers<IBookFeatureState>({
    entities: entitiesFeature.reducer,
    book: bookSingleFeature.reducer,
    paginator: paginatorFeature.reducer,
    sort: sortFeature.reducer,
    filters: filtersFeature.reducer,
    callState: callStateFeature.reducer,
    bookCallState: bookSingleCallStateFeature.reducer
  })
});
