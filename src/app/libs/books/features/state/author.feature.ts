import { createFeatureFeatureKey, CallState } from '@app/store/utils';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ICallState, SortDirection } from '@app-ngrx-utils/base-model';
import { createFeature, createReducer, on, combineReducers } from '@ngrx/store';
import * as authorActions from './actions/author.actions';
import { DEFAULT_SMALL_TABLE_INITIAL_PAGINATION_DATA} from "@app-ngrx-utils/constants";
import {IAuthorEntityState, IAuthorFeatureState} from "@app/libs/books/features/state/models/author-future.model";
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";

export const authorFeatureKey = createFeatureFeatureKey('authors');

export const authorsEntityAdapter: EntityAdapter<IAuthorModel> =
  createEntityAdapter<IAuthorModel>({
    selectId: (entity) => entity.id,
    sortComparer: false
  });

const initialState: IAuthorEntityState =
  authorsEntityAdapter.getInitialState();

const initialCallState: ICallState = { callState: CallState.Init, error: null };

export const entitiesFeature = createFeature({
  name: 'authorEntities',
  reducer: createReducer(
    initialState,
    on(authorActions.loadAuthorsSuccess, (state, { authors }) =>
      authorsEntityAdapter.setAll(authors, {
        ...state
      })
    ),
    on(authorActions.createAuthorSuccess, (state, { author }) =>
      authorsEntityAdapter.addOne(author, { ...state })
    ),
    on(authorActions.updateAuthorSuccess, (state, { author }) =>
      authorsEntityAdapter.updateOne(
        {
          id: author.id,
          changes: author
        },
        { ...state }
      )
    )
  )
});

export const callStateFeature = createFeature({
  name: 'authorCallState',
  reducer: createReducer(
    initialCallState,
    on(authorActions.loadAuthors, (state) => ({
      ...state,
      callState: CallState.Loading
    })),
    on(authorActions.loadAuthorsSuccess, (state) => ({
      ...state,
      callState: CallState.Loaded
    })),
    on(authorActions.loadAuthorsFailure, (state) => ({
      ...state,
      callState: CallState.Error
    }))
  )
});

export const sortFeature = createFeature({
  name: 'authorSort',
  reducer: createReducer(
    {
      sortDirection: SortDirection.DESC,
      sortBy: 'name'
    },
    on(authorActions.updateSorting, (state, { payload }) => ({
      ...state,
      ...payload
    }))
  )
});

export const paginatorFeature = createFeature({
  name: 'authorPaginator',
  reducer: createReducer(
    DEFAULT_SMALL_TABLE_INITIAL_PAGINATION_DATA,
    on(authorActions.updatePagination, (state, payload) => ({
      ...state,
      ...payload
    }))
  )
});

export const authorFeature = createFeature({
  name: authorFeatureKey,
  reducer: combineReducers<IAuthorFeatureState>({
    entities: entitiesFeature.reducer,
    paginator: paginatorFeature.reducer,
    sort: sortFeature.reducer,
    callState: callStateFeature.reducer,
  })
});
