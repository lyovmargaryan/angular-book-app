import { InjectionToken } from '@angular/core';

import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export interface IBookStoreState {
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<IBookStoreState>
>('ROOT_REDUCERS_TOKEN', {
  factory: () => ({
    router: fromRouter.routerReducer,
  })
});
