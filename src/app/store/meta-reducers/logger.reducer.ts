import { ActionReducer } from '@ngrx/store';
import { IBookStoreState } from '../reducers';

export function logger(
  reducer: ActionReducer<IBookStoreState>
): ActionReducer<IBookStoreState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}
