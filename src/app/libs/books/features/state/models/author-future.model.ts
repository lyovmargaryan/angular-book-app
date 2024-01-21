import { EntityState } from '@ngrx/entity';
import {
  ICallState,
  ISortState,
  IPaginatorState
} from '@app-ngrx-utils/base-model';
import {IBookStoreState} from "@app/store/reducers";
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";
import {authorFeatureKey} from "@app/libs/books/features/state/author.feature";

export type IAuthorEntityState = EntityState<IAuthorModel>;

export interface IAuthorFeatureState {
  entities: IAuthorEntityState;
  paginator: IPaginatorState;
  sort: ISortState;
  callState: ICallState;
}

export interface IAuthorState extends IBookStoreState{
  [authorFeatureKey]: IAuthorFeatureState;
}
