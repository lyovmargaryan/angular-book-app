import { MetaReducer } from '@ngrx/store';

import { IBookStoreState } from '../reducers';

import { logger } from './logger.reducer';

export const rootMetaReducers: MetaReducer<IBookStoreState>[] = [logger];
